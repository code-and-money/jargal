import type { Action, Context } from "../types.ts"
import type { WriteActionConfig } from "./write.ts"

export function renderTemplate( { fullpath, template, getData, saveFn }: {
  template: string
  fullpath: string
  getData?: ( ctx: Context ) => Record<string, unknown>
  saveFn?: ( config: WriteActionConfig ) => Action
} ): Action {
  return function execute( params ) {
    const data = getData?.( params.context ) ?? params.context

    const renderedTemplate = params.renderer.renderString( { template, data } )

    const renderedPath = params.renderer.renderString( { template: fullpath, data } )

    if ( saveFn ) {
      return saveFn( { content: renderedTemplate, destination: renderedPath } )
    }
  }
}
