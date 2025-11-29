import { merge, toMerged } from "es-toolkit";
import { Renderer } from "./renderer";
import { write } from "./actions/jargal-write";
import { resolve, dirname, join } from "path";
import { mkdir } from "fs/promises";
import { writeFile } from "fs/promises";

import { templates, type TemplatesMap } from "./actions/jargal-templates";
import { context } from "./actions/jargal-context";

export { templates, context };

export type RenderEntry = { control: "user"; data: any; pathTemplate: string; contentTemplate: string } | { control?: "auto"; data: any; destination: string };

export class Jargal<const in out Context> {
  #context = {
    templates: { default: {} },
    renderData: [] as { baseSavePath: string; data: any }[],
    renderedContent: [] as { savePath: string; content: string }[],
  } as Context;

  #renderer: Renderer;

  get context() {
    return this.#context;
  }

  constructor() {
    this.#renderer = new Renderer();
  }

  setContext<Setter extends (...args: any) => any>(setter: Setter): Jargal<ReturnType<Setter> & Context>;
  setContext<const Setter extends Record<string, any>>(setter: Setter): Jargal<Setter & Context>;
  setContext(setter: any) {
    if (typeof setter === "function") {
      const context = setter(this.#context);
      this.#context = toMerged(this.#context as any, context);
      return this as any;
    }

    this.#context = toMerged(this.#context as any, setter);
    return this as any;
  }

  async render(params?: {
    composeRenderData?: (ctx: Context) => RenderEntry[] | Promise<RenderEntry[]>;
    scope?: Context extends { templates: { [key: string]: any } } ? keyof Context["templates"] : "default";
  }): Promise<Jargal<Context & { renderedContent: { savePath: string; content: string }[] }>> {
    const composeData: (ctx: Context) => RenderEntry[] | Promise<RenderEntry[]> =
      params?.composeRenderData ??
      // @ts-expect-error
      ((ctx: Context) => ctx.renderData);

    // @ts-expect-error
    const templatesToRender = this.#context.templates[params?.scope ?? "default"] as TemplatesMap;

    const composedData = await composeData(this.#context);

    for (const renderEntry of composedData) {
      if (!renderEntry.control || renderEntry.control === "auto") {
        for (const [filename, template] of Object.entries(templatesToRender)) {
          // @ts-expect-error
          this.#context.renderedContent.push({
            savePath: this.#renderer.renderString({ template: join(renderEntry.destination, template.savePath), data: renderEntry.data }),
            content: this.#renderer.renderString({ template: template.templateContent, data: renderEntry.data }),
          });
        }

        continue;
      }

      if (renderEntry.control === "user") {
        // @ts-expect-error
        this.#context.renderedContent.push({
          savePath: this.#renderer.renderString({ template: renderEntry.pathTemplate, data: renderEntry.data }),
          content: this.#renderer.renderString({ template: renderEntry.contentTemplate, data: renderEntry.data }),
        });

        continue;
      }
    }

    //     const entryContentTemplate = renderEntry.contentTemplate;

    // let renderedContent: string | undefined = undefined;
    // let renderedPath: string | undefined = undefined;

    // if (renderEntry.contentTemplate) {
    //   const templateToRender =
    //     // @ts-expect-error
    //     (this.#context.templates[params?.scope ?? "default"] as TemplatesMap)[renderEntry.contentTemplate]?.templateContent || renderEntry.contentTemplate;

    //   renderedContent = this.#renderer.renderString({ template: templateToRender, data: renderEntry.data });
    //   continue;
    // }

    // if (renderEntry.pathTemplate) {
    //   renderedPath = this.#renderer.renderString({ template: renderEntry.pathTemplate, data: renderEntry.data });
    //   continue;
    // }

    // for (const [filename, template] of Object.entries(templatesToRender)) {
    //   // console.log({ renderEntry, template });

    //   // @ts-expect-error
    //   this.#context.renderedContent.push({
    //     savePath:
    //       renderedPath ||
    //       this.#renderer.renderString({
    //         template: renderEntry.baseSavePath ?? (renderEntry?.fullSavePath ? renderEntry?.fullSavePath : join(renderEntry.baseSavePath, template.savePath)),
    //         data: renderEntry.data,
    //       }),
    //     content:
    //       renderedContent || this.#renderer.renderString({ template: renderEntry?.contentTemplate ?? template.templateContent, data: renderEntry.data }),
    //   });
    // }

    return this as any;
  }

  async write(
    write?: (params: {
      savePath: string;
      content: string;
      defultWrite: (params: { savePath: string; content: string }) => Promise<void>;
    }) => void | Promise<void>,
  ): Promise<void> {
    if (typeof write === "function") {
      // @ts-expect-error
      for (const renderConfig of this.#context.renderedContent as { savePath: string; content: string }[]) {
        await write({ ...renderConfig, defultWrite });
      }

      return;
    }

    // console.log({ renderedContent: this.#context.renderedContent})
    // @ts-expect-error
    for (const renderConfig of this.#context.renderedContent as { savePath: string; content: string }[]) {
      defultWrite(renderConfig);
    }
  }
}

async function defultWrite(params: { savePath: string; content: string }): Promise<void> {
  await mkdir(dirname(params.savePath), { recursive: true });
  await writeFile(params.savePath, new TextEncoder().encode(params.content), {});
}
