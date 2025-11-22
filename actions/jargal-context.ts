import { merge } from "es-toolkit";
import { readonly } from "../lib.ts";
import type { Action, ContextAction } from "../types.ts";

export async function contextAsync<Callback extends (...arg: any[]) => any>(callback: Callback): Promise<(ctx: Record<string, any>) => ReturnType<Callback>> {
  const newContext = callback();

  return function execute(ctx) {
    // merge(params.context, newContext);
    return newContext;
  };
}

export function context<Callback extends (...arg: any[]) => any>(callback: Callback): (ctx: Record<string, any>) => ReturnType<Callback> {
  const newContext = callback();

  return function execute(ctx) {
    // merge(params.context, newContext);
    return newContext;
  };
}
