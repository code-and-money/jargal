import assert from "node:assert";
import { readdir, readFile } from "node:fs/promises";
import path, { resolve } from "node:path";

export type TemplateData = {
  templatePath: string;
  savePath: string;
  templateContent: string;
  metadata?: Record<string, any>;
};

export type TemplatesMap = Record<string, TemplateData>;

type Templates<Key extends string> = { templates: Record<Key, TemplatesMap> };

export async function templates<Scope extends string | undefined = undefined>(params: {
  path: string;
  scope?: Scope;
  engine?: "handlebars";
  hooks?: {
    onDataReady?: ((path: string, data: TemplateData) => [path: string, data: TemplateData])[];
  };
}): Promise<(ctx: Record<string, any>) => Templates<Scope extends undefined ? "default" : Scope>> {
  const engine = params?.engine ?? "handlebars";
  const removeExtension = engine === "handlebars" ? ".hbs" : "";
  const scopeKey = params.scope ? params.scope : "default";

  const record = { [scopeKey]: {} } as Record<string, TemplatesMap>;

  const resolvedPath = resolve(params.path);

  for await (const templatePath of walkDir(resolvedPath)) {
    if (path.basename(templatePath).startsWith("_")) {
      continue;
    }

    const savePath = path.relative(resolvedPath, templatePath).replace(removeExtension, "");

    const contentRaw = await readFile(path.resolve(resolvedPath, templatePath));
    const data: TemplateData = {
      templateContent: new TextDecoder().decode(contentRaw),
      templatePath,
      savePath,
    };

    if (!params.hooks) {
      assert(record[scopeKey]);
      Object.assign(record[scopeKey], { [savePath]: data });
      continue;
    }

    if (params.hooks?.onDataReady?.length) {
      let path_ = savePath;
      let data_ = data;

      for (const hook of params.hooks.onDataReady) {
        [path_, data_] = hook(path_, data_);
      }

      assert(record[scopeKey]);
      Object.assign(record[scopeKey], { [path_]: data_ });
    }
  }

  return function setter(_ctx: Record<string, any>) {
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
