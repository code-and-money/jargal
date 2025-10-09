import type { Action, Context } from "../types.ts"

export function renderTemplate( { fullpath, template, getData, write }: {
  template: string
  fullpath: string
  getData?: ( ctx: Context ) => Record<string, unknown>
  write?: Action<{ content?: string; destination?: string }>
} ): Action {
  if ( !template ) {
    return () => undefined
  }

  return function execute( params ) {
    const data = getData?.( params.context ) ?? params.context

    const renderedTemplate = params.renderer.renderString( { template, data } )

    const renderedPath = params.renderer.renderString( { template: fullpath, data } )

    if ( write ) {
      return write( { ...params, content: renderedTemplate, destination: renderedPath } )
    }
  }
}
