import type { Action, Context } from "../types.ts";

export function renderTemplate({
  templatePath,
  template,
  getData,
  save,
}: {
  template: string;
  templatePath: string;
  getData?: (ctx: Context) => Record<string, unknown>;
  save?: Action<{ templateContent?: string; destination?: string }>;
}): Action {
  if (!template) {
    return () => undefined;
  }

  return function execute(params) {
    const data = getData?.(params.context) ?? params.context;

    const renderedTemplate = params.renderer.renderString({ template, data });

    const renderedPath = params.renderer.renderString({ template: templatePath, data });

    if (save) {
      return save({ ...params, context: { ...params.context, templateContent: renderedTemplate, destination: renderedPath } });
    }
  };
}
