import type { BaseIssue, BaseAction, ErrorMessage, Context, OutputContext, BaseContext } from "../../types/index.ts";

/**
 * Context issue interface.
 */
export interface ContextIssue extends BaseIssue<unknown> {
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
 * Context schema interface.
 */
export interface ContextAction<Config extends Record<string, any> | undefined, Output extends Record<string, any>> extends BaseAction<Config, Output> {
  readonly config: Config;

  /**
   * The expected property.
   */
  readonly expects: "string";
}

export type ContextActionConfig = {
  callback: any;
};

// export function context<Ctx extends Record<string, any>>(config?: ContextActionConfig): ContextAction<ContextActionConfig, Ctx>;
// export function context<Ctx extends undefined = undefined>(config: ContextActionConfig): ContextAction<ContextActionConfig, {}>;
export function context<Ctx extends BaseContext, R extends BaseContext>(fn: (ctx: Ctx) => OutputContext<R>): BaseAction<Ctx & R> {
  // ContextAction<ContextActionConfig, Ctx>
  return {
    kind: "action",
    "~run"(context) {
      const updated = fn(context);
      return updated as any;
    },
  };
}
