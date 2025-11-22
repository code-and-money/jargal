import type { BaseIssue, BaseAction, ErrorMessage, Context, OutputContext, BaseContext } from "../../types/index.ts";
// import { _addIssue, _getStandardProps } from "../../utils/index.ts";

/**
 * Write issue interface.
 */
export interface WriteIssue extends BaseIssue<unknown> {
  /**
   * The issue kind.
   */
  readonly kind: "action";
  /**
   * The issue type.
   */
  readonly type: "string";
}

/**
 * Write schema interface.
 */
export interface WriteAction<Config extends Record<string, any> | undefined, Output extends Record<string, any>> extends BaseAction<Config, Output> {
  readonly config: Config;

  /**
   * The expected property.
   */
  readonly expects: "string";
}

export type WriteActionConfig = {
  destination?: string;
  templateContent?: string;
  mode?: "force" | "skip-if-exists";
};

// /**
//  * Creates a string schema.
//  *
//  * @param config The error config.
//  *
//  * @returns A string schema.
//  */

export function write<Ctx extends Record<string, any>>(config?: WriteActionConfig): WriteAction<WriteActionConfig, Ctx>;
export function write<Ctx extends undefined = undefined>(config: WriteActionConfig): WriteAction<WriteActionConfig, {}>;
export function write<Ctx extends undefined | Record<string, any> = undefined>(
  config?: WriteActionConfig,
): WriteAction<WriteActionConfig, Ctx extends undefined ? {} : Ctx> {
  return {
    kind: "action",
    expects: "string",

    config: config ?? {},
    "~run"(context, config) {
      context.renderer;

      if (typeof context.value === "string") {
        // @ts-expect-error
        context.typed = true;
      } else {
        // _addIssue(this, "type", context, config);
      }
      // @ts-expect-error
      return context as OutputContext<string, WriteIssue>;
    },
  };
}

//  hooks?: ActionHooks;
