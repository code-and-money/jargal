import type { BaseIssue, BaseAction, Config, InferIssue, InferOutput } from "../../types/index.ts";

/**
 * Parses an unknown input based on a schema.
 *
 * @param action The action to be used.
 * @param input The input to be parsed.
 * @param config The run configuration.
 *
 * @returns The parsed input.
 */
export function run<const Action extends BaseAction<unknown, unknown>>(action: Action, input: unknown): InferOutput<Action> {
  const context = action["~run"]({ value: input }, {});

  if (context.issues) {
    throw new Error("msg");
  }

  return context.value;
}
