import type { ContextAction } from "../types.ts";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

type TemplateData = { fullPath: string; realativePath: string; content: string };

export function loadTemplates(
  templatesPath: string,
  options: {
    scope?: string;
    hooks?: { onDataReady?: ((path: string, data: TemplateData) => [path: string, data: TemplateData])[] };
  },
): ContextAction {
  return async function execute(params) {
    const record = { ...params.context.templates } as Record<string, Map<string, TemplateData>>;

    if (options.scope) {
      Object.assign(record, { [options.scope]: new Map() });
    }

    for await (const fullPath of walkDir(templatesPath)) {
      const realativePath = path.relative(templatesPath, fullPath);

      const contentRaw = await readFile(path.resolve(templatesPath, fullPath));
      const data: TemplateData = { content: new TextDecoder().decode(contentRaw), fullPath, realativePath };

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

async function* walkDir(dir: string): AsyncGenerator<string, void, void> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}
