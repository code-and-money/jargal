import type { ContextAction } from "../types.ts";
import { readdir, readFile } from "node:fs/promises";
import path, { resolve } from "node:path";

type TemplateData = { templatePath: string; realativePath: string; templateContent: string };

export function loadTemplates(
  templatesPath: string,
  options: {
    scope?: string;
    hooks?: { onDataReady?: ((path: string, data: TemplateData) => [path: string, data: TemplateData])[] };
  },
): ContextAction<{ templates: Record<string, Map<string, TemplateData>> }> {
  return async function execute(params) {
    const record = { ...params.context.templates } as any as Record<string, Map<string, TemplateData>>;

    if (options.scope) {
      Object.assign(record, { [options.scope]: new Map() });
    }

    for await (const templatePath of walkDir(templatesPath)) {
      const realativePath = path.relative(templatesPath, templatePath);

      const contentRaw = await readFile(path.resolve(templatesPath, templatePath));
      const data: TemplateData = { templateContent: new TextDecoder().decode(contentRaw), templatePath, realativePath };

      if (!options.hooks) {
        record[options.scope ? options.scope : "templates"]?.set(realativePath, data);
        continue;
      }

      if (options.hooks?.onDataReady?.length) {
        let path_ = realativePath;
        let data_ = data;

        for (const hook of options.hooks.onDataReady) {
          [path_, data_] = hook(path_, data_);
        }

        record[options.scope ? options.scope : "templates"]?.set(path_, data_);
      }
    }

    return { templates: record };
  };
}

export async function templates<Scope extends string | undefined = undefined>(params: {
  path: string;
  scope?: Scope;
  hooks?: { onDataReady?: ((path: string, data: TemplateData) => [path: string, data: TemplateData])[] };
}): Promise<
  (ctx: Record<string, any>) => {
    templates: Record<Scope extends undefined ? "default" : Scope, Map<string, TemplateData>>;
  }
> {
  let record: undefined | Record<string, Map<string, TemplateData>> = undefined;

  if (params.scope) {
    record = { [params.scope]: new Map() };
  } else {
    record = { default: new Map() };
  }

  const resolvedPath = resolve(params.path);

  for await (const templatePath of walkDir(resolvedPath)) {
    const realativePath = path.relative(resolvedPath, templatePath);

    const contentRaw = await readFile(path.resolve(resolvedPath, templatePath));
    const data: TemplateData = { templateContent: new TextDecoder().decode(contentRaw), templatePath, realativePath };

    if (!params.hooks) {
      record[params.scope ? params.scope : "default"]?.set(realativePath, data);
      continue;
    }

    if (params.hooks?.onDataReady?.length) {
      let path_ = realativePath;
      let data_ = data;

      for (const hook of params.hooks.onDataReady) {
        [path_, data_] = hook(path_, data_);
      }

      record[params.scope ? params.scope : "default"]?.set(path_, data_);
    }
  }

  return function setter(_ctx: Record<string, any>): { templates: Record<string, Map<string, TemplateData>> } {
    return { templates: record };
  };
}

async function* walkDir(dir: string): AsyncGenerator<string, void, void> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const templatePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkDir(templatePath);
    } else if (entry.isFile()) {
      yield templatePath;
    }
  }
}
