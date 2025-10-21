import type { Action, ActionParams } from "../types.ts";

export function echo(arg?: string | ((params: ActionParams) => void)): Action {
  return function execute(params) {
    switch (typeof arg) {
      case "function":
        arg(params);
        break;

      case "string":
        console.log(arg);
        break;

      default:
        console.log("Hello, World!");
        break;
    }
  };
}
