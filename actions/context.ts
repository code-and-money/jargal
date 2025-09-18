import { merge } from "es-toolkit"
import { readonly } from "../lib.ts"
import type { Action, Context, DeepReadonly } from "../types.ts"

type Callback = ( context: DeepReadonly<Context> ) => Partial<Context> | Promise<Partial<Context>>

export function context( callback: Callback ): Action {
  return async function execute( params ) {
    const newContext = await callback( readonly( params.context ) )
    merge( params.context, newContext )
  }
}
