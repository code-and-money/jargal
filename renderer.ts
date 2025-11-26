import { get, set } from "es-toolkit/compat";
import handlebars from "handlebars";

import type { GetReturnType, HelperFn, Helpers, MappingScope, Partials, SetOptions, Setter, SetterScope } from "./types.ts";
import { readonly, textHelpers, utilHelpers } from "./lib.ts";

export class Renderer {
  #partials: Partials = {};
  #helpers: Helpers = { ...textHelpers, ...utilHelpers };

  #mapping: { partial: Partials; helper: Helpers } = {
    partial: this.#partials,
    helper: this.#helpers,
  };

  #set<T extends SetterScope>(scope: T, config: Setter<T>, options?: SetOptions): Renderer {
    if (!config.name) {
      throw new Error("Name must be non-empty string");
    }

    const target = get(this.#mapping, scope);

    if (!target) throw new Error("No mapping");

    if (config.name in target && !options?.override) {
      throw new Error("Can't override");
    }

    set(target, config.name, config.target);

    return this;
  }

  private readonly partials: Partials = readonly(this.#partials);
  private readonly helpers: Helpers = readonly(this.#helpers);

  private get<T extends SetterScope>(scope: T, name: string): GetReturnType<T> {
    const target = get(this.#mapping, scope);

    if (!target) {
      throw new Error("!");
    }

    return get(target, name);
  }

  private list<T extends `${SetterScope}s`, O extends boolean = false>(
    scope: T,
    options?: { full?: O },
  ): O extends true ? MappingScope[T extends `${infer S}s` ? S : T][] : string[] {
    const target = get(this.#mapping, scope.slice(0, scope.length - 1));

    if (!target) {
      throw new Error("No mapping");
    }

    if (!options?.full) {
      return Object.keys(target) as any;
    }

    switch (scope) {
      case "helpers":
        return Object.entries(target).map(([name, helper]) => ({
          name,
          helper,
        })) as any;

      case "partials":
        return Object.entries(target).map(([name, partial]) => ({
          name,
          partial,
        })) as any;

      default:
        throw new Error("can't find the scope");
    }
  }

  public setPartial(name: string, partial: string, options?: SetOptions): Renderer {
    return this.#set("partial", { target: partial, name }, options);
  }

  public setHelper(name: string, helper: HelperFn, options?: SetOptions): Renderer {
    return this.#set("helper", { target: helper, name }, options);
  }

  public renderString(params: { template: string; data: Record<string, unknown> }): string {
    for (const [name, helper] of Object.entries(this.#helpers)) {
      handlebars.registerHelper(name, helper);
    }

    for (const [name, partial] of Object.entries(this.#partials)) {
      handlebars.registerPartial(name, partial);
    }

    const compiled = handlebars.compile(params.template);

    return compiled(params.data);
  }
}
