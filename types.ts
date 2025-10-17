import type { Renderer } from "./renderer.ts";

export interface Config {
  generators: GeneratorConfig[];
}

export interface Context extends Record<string, unknown> {
  answers: Record<string, string | boolean | (string | boolean)[]>;
  errors: Error[];
  context: Record<string, any>;
}

export type DeepReadonly<T> = {
  readonly [Key in keyof T]: T[Key] extends any[] ? T[Key] : T[Key] extends object ? DeepReadonly<T[Key]> : T[Key];
};

export interface GeneratorParams {
  context: Context;
  renderer: Renderer;
  generator: GeneratorConfig;
  hooks?: ActionHooks;
}

export interface ActionParams {
  context: Context;
  renderer: Renderer;
  hooks?: ActionHooks;
}

export interface ExecuteActionParams {
  context: Context;
  renderer: Renderer;
  action: Action;
}

export interface GeneratorConfig {
  name: string;
  // TODO: implement commented out interface
  description?: string; // | (( params: unknown ) => string)
  // TODO: implement commented out interface
  actions: Action[]; // | Promise<Action[]>  | (( params: unknown ) => Action[] | Promise<Action[]>)
}

export type HelperFn = (str: string) => string;

export interface TextHelpers extends Record<string, HelperFn> {}

export type Action<T extends object = {}> = (params: ActionParams & T) => void | Action | Action[] | Promise<void | Action | Action[]>;

export interface ActionHooksFailures {
  path: string;
  error: string;
  message?: string;
}

export interface ActionHooksChanges {
  path: string;
}

export interface ActionHooks {
  onComment?: (msg: string) => void;
  onSuccess?: (change: ActionHooksChanges) => void;
  onFailure?: (failure: ActionHooksFailures) => void;
}

export type SetterScope = "helper" | "partial";

export interface SetOptions {
  override?: boolean;
}

export interface MappingScope {
  helper: { name: string; target: HelperFn };
  partial: { name: string; target: string };
}

interface Mapping {
  helper: HelperFn;
  partial: string;
}

type GetSetterType<Key extends SetterScope> = Mapping[Key];

export interface Setter<T extends SetterScope> {
  target: GetSetterType<T>;
  name: string;
}

export type GetReturnType<T extends SetterScope> = Mapping[T];

export interface Partials extends Record<string, string> {}
export interface Helpers extends Record<string, any> {}

export type ContextAction = (context: DeepReadonly<Context>) => Partial<Context> | Promise<Partial<Context>>;
