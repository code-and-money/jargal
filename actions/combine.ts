import { executeAction } from "../runner.ts";
import type { Action } from "../types.ts";

export function combine(...actions: Action[]): Action {
  return async function execute(params) {
    for (const action of actions) {
      await executeAction({ action, context: params.context, renderer: params.renderer });
    }
  };
}
