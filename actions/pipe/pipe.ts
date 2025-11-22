import type {
  BaseIssue,
  BaseAction,
  Config,
  FirstTupleItem,
  InferInput,
  InferOutput,
  LastTupleItem,
  OutputContext,
  PipeAction,
  PipeItem,
  BaseContext,
  InferOutputContext,
} from "../../types/index.ts";

type AnyRecord = Record<string, any>;

/**
 * Schema with pipe type.
 */
export type SchemaWithPipe<
  Pipe extends readonly [any, ...any],
  // extends readonly [BaseAction<BaseContext, unknown, AnyRecord>, ...PipeItem<BaseContext, any, AnyRecord>[]],
> =
  // Omit<FirstTupleItem<Pipe>, "pipe" | "~standard" | "~run" | "~types"> &
  {
    /**
     * The pipe items.
     */
    readonly pipe: Pipe;

    /**
     * Parses unknown input values.
     *
     * @param context The input context.
     * @param config The configuration.
     *
     * @returns The output context.
     *
     * @internal
     */
    readonly "~run": any;
    // readonly "~run": (context: BaseContext, config: Config<BaseIssue<unknown>>) => OutputContext<InferOutput<LastTupleItem<Pipe>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    // readonly "~types"?: { readonly config: never; readonly output: InferOutput<LastTupleItem<Pipe>> } | undefined;
  };

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<const Schema extends BaseAction<BaseContext>, const Item1 extends BaseAction<InferOutput<Schema>>>(
  schema: Schema,
  item1: Item1,
): SchemaWithPipe<readonly [Schema, Item1]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<BaseContext>,
  const Item1 extends BaseAction<InferOutput<Schema>>,
  const Item2 extends BaseAction<InferOutput<Item1>>,
>(schema: Schema, item1: Item1, item2: Item2): SchemaWithPipe<readonly [Schema, Item1, Item2]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<Context, InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<Context, InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13, Item14]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
  const Item15 extends PipeItem<InferOutput<Item14>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
  item15: Item15 | PipeAction<InferOutput<Item14>, InferOutput<Item15>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13, Item14, Item15]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
  const Item15 extends PipeItem<InferOutput<Item14>, AnyRecord>,
  const Item16 extends PipeItem<InferOutput<Item15>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
  item15: Item15 | PipeAction<InferOutput<Item14>, InferOutput<Item15>>,
  item16: Item16 | PipeAction<InferOutput<Item15>, InferOutput<Item16>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13, Item14, Item15, Item16]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
  const Item15 extends PipeItem<InferOutput<Item14>, AnyRecord>,
  const Item16 extends PipeItem<InferOutput<Item15>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
  item15: Item15 | PipeAction<InferOutput<Item14>, InferOutput<Item15>>,
  item16: Item16 | PipeAction<InferOutput<Item15>, InferOutput<Item16>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13, Item14, Item15, Item16]>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
  const Item15 extends PipeItem<InferOutput<Item14>, AnyRecord>,
  const Item16 extends PipeItem<InferOutput<Item15>, AnyRecord>,
  const Item17 extends PipeItem<InferOutput<Item16>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
  item15: Item15 | PipeAction<InferOutput<Item14>, InferOutput<Item15>>,
  item16: Item16 | PipeAction<InferOutput<Item15>, InferOutput<Item16>>,
  item17: Item17 | PipeAction<InferOutput<Item16>, InferOutput<Item17>>,
): SchemaWithPipe<
  readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13, Item14, Item15, Item16, Item17]
>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 * @param item18 The eighteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
  const Item15 extends PipeItem<InferOutput<Item14>, AnyRecord>,
  const Item16 extends PipeItem<InferOutput<Item15>, AnyRecord>,
  const Item17 extends PipeItem<InferOutput<Item16>, AnyRecord>,
  const Item18 extends PipeItem<InferOutput<Item17>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
  item15: Item15 | PipeAction<InferOutput<Item14>, InferOutput<Item15>>,
  item16: Item16 | PipeAction<InferOutput<Item15>, InferOutput<Item16>>,
  item17: Item17 | PipeAction<InferOutput<Item16>, InferOutput<Item17>>,
  item18: Item18 | PipeAction<InferOutput<Item17>, InferOutput<Item18>>,
): SchemaWithPipe<
  readonly [Schema, Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10, Item11, Item12, Item13, Item14, Item15, Item16, Item17, Item18]
>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 * @param item18 The eighteenth pipe item.
 * @param item19 The nineteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<
  const Schema extends BaseAction<unknown, AnyRecord>,
  const Item1 extends PipeItem<InferOutput<Schema>, AnyRecord>,
  const Item2 extends PipeItem<InferOutput<Item1>, AnyRecord>,
  const Item3 extends PipeItem<InferOutput<Item2>, AnyRecord>,
  const Item4 extends PipeItem<InferOutput<Item3>, AnyRecord>,
  const Item5 extends PipeItem<InferOutput<Item4>, AnyRecord>,
  const Item6 extends PipeItem<InferOutput<Item5>, AnyRecord>,
  const Item7 extends PipeItem<InferOutput<Item6>, AnyRecord>,
  const Item8 extends PipeItem<InferOutput<Item7>, AnyRecord>,
  const Item9 extends PipeItem<InferOutput<Item8>, AnyRecord>,
  const Item10 extends PipeItem<InferOutput<Item9>, AnyRecord>,
  const Item11 extends PipeItem<InferOutput<Item10>, AnyRecord>,
  const Item12 extends PipeItem<InferOutput<Item11>, AnyRecord>,
  const Item13 extends PipeItem<InferOutput<Item12>, AnyRecord>,
  const Item14 extends PipeItem<InferOutput<Item13>, AnyRecord>,
  const Item15 extends PipeItem<InferOutput<Item14>, AnyRecord>,
  const Item16 extends PipeItem<InferOutput<Item15>, AnyRecord>,
  const Item17 extends PipeItem<InferOutput<Item16>, AnyRecord>,
  const Item18 extends PipeItem<InferOutput<Item17>, AnyRecord>,
  const Item19 extends PipeItem<InferOutput<Item18>, AnyRecord>,
>(
  schema: Schema,
  item1: Item1 | PipeAction<InferOutput<Schema>, InferOutput<Item1>>,
  item2: Item2 | PipeAction<InferOutput<Item1>, InferOutput<Item2>>,
  item3: Item3 | PipeAction<InferOutput<Item2>, InferOutput<Item3>>,
  item4: Item4 | PipeAction<InferOutput<Item3>, InferOutput<Item4>>,
  item5: Item5 | PipeAction<InferOutput<Item4>, InferOutput<Item5>>,
  item6: Item6 | PipeAction<InferOutput<Item5>, InferOutput<Item6>>,
  item7: Item7 | PipeAction<InferOutput<Item6>, InferOutput<Item7>>,
  item8: Item8 | PipeAction<InferOutput<Item7>, InferOutput<Item8>>,
  item9: Item9 | PipeAction<InferOutput<Item8>, InferOutput<Item9>>,
  item10: Item10 | PipeAction<InferOutput<Item9>, InferOutput<Item10>>,
  item11: Item11 | PipeAction<InferOutput<Item10>, InferOutput<Item11>>,
  item12: Item12 | PipeAction<InferOutput<Item11>, InferOutput<Item12>>,
  item13: Item13 | PipeAction<InferOutput<Item12>, InferOutput<Item13>>,
  item14: Item14 | PipeAction<InferOutput<Item13>, InferOutput<Item14>>,
  item15: Item15 | PipeAction<InferOutput<Item14>, InferOutput<Item15>>,
  item16: Item16 | PipeAction<InferOutput<Item15>, InferOutput<Item16>>,
  item17: Item17 | PipeAction<InferOutput<Item16>, InferOutput<Item17>>,
  item18: Item18 | PipeAction<InferOutput<Item17>, InferOutput<Item18>>,
  item19: Item19 | PipeAction<InferOutput<Item18>, InferOutput<Item19>>,
): SchemaWithPipe<
  readonly [
    Schema,
    Item1,
    Item2,
    Item3,
    Item4,
    Item5,
    Item6,
    Item7,
    Item8,
    Item9,
    Item10,
    Item11,
    Item12,
    Item13,
    Item14,
    Item15,
    Item16,
    Item17,
    Item18,
    Item19,
  ]
>;

/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param items The pipe items.
 *
 * @returns A schema with a pipeline.
 */
export function pipe<const Schema extends BaseAction<unknown, AnyRecord>, const Items extends readonly PipeItem<InferOutput<Schema>, InferOutput<Schema>>[]>(
  schema: Schema,
  ...items: Items
): SchemaWithPipe<readonly [Schema, ...Items]>;

export function pipe<const Schema extends BaseAction<unknown, AnyRecord>, const Items extends readonly PipeItem<unknown, AnyRecord>[]>(
  ...pipe: [Schema, ...Items]
): SchemaWithPipe<readonly [Schema, ...Items]> {
  return {
    ...pipe[0],
    pipe,
    "~run"(context, config) {
      // Execute pipeline items in sequence
      for (const item of pipe) {
        // Exclude metadata items from execution
        if (item.kind !== "metadata") {
          // Mark context as untyped and break pipe if there are issues and pipe
          // item is schema or transformation
          if (context.issues && (item.kind === "action" || item.kind === "transformation")) {
            context.typed = false;
            break;
          }

          // Continue pipe execution if there is no reason to abort early
          if (!context.issues || (!config.abortEarly && !config.abortPipeEarly)) {
            // @ts-expect-error
            context = item["~run"](context, config);
          }
        }
      }

      // Return output context
      return context as unknown as OutputContext<unknown>;
    },
  };
}
