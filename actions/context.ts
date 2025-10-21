import { merge } from "es-toolkit";
import { readonly } from "../lib.ts";
import type { Action, ContextAction } from "../types.ts";

export function context(callback: ContextAction): Action {
  return async function execute(params) {
    const newContext = await callback(readonly(params.context));
    merge(params.context, newContext);
  };
}
