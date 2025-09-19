import type { Action, Context } from "../types.ts"
import type { WriteActionConfig } from "./write.ts"

export function renderTemplate( { fullpath, template, getData, write }: {
  template: string
  fullpath: string
  getData?: ( ctx: Context ) => Record<string, unknown>
  write?: ( config: WriteActionConfig ) => Action
} ): Action {
  return function execute( params ) {
    const data = getData?.( params.context ) ?? params.context

    const renderedTemplate = params.renderer.renderString( { template, data } )

    const renderedPath = params.renderer.renderString( { template: fullpath, data } )

    if ( write ) {
      return write( { content: renderedTemplate, destination: renderedPath } )
    }
  }
}
