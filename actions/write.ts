// TODO: get rid of `node:` imports and "del", "mkdirp" libraries
import { access, mkdir, rm, writeFile } from "node:fs/promises"

import type { Action } from "../types.ts"
import assert from "node:assert"
import { dirname } from "node:path"

// type WriteActionConfig = {
//   data?: Record<string, unknown>
//   destination: string
//   writeMode?: "skip-if-exists" | "force"
// } & (
//   // |{templatePath: string}
//   | { template: string }
//   |
// )

export type WriteActionConfig = { destination?: string; content?: string; mode?: "force" | "skip-if-exists" }

export function write(
  { destination, content, mode }: WriteActionConfig,
): Action<{ content?: string; destination?: string }> {
  return async function execute( { content: content_, destination: destination_ } ) {
    const dest = destination || destination_
    const cntn = content || content_

    assert( dest, "must provide `dest`" )
    assert( cntn, "must provide `cntn`" )

    await mkdir( dirname( dest ), { recursive: true } )

    let doesExist = await fileExists( dest )

    if ( doesExist && mode === "force" ) {
      await rm( dest, { recursive: true } )
      doesExist = false
    }

    if ( doesExist && mode !== "skip-if-exists" ) {
      throw `File already exists\n -> ${dest}`
    }

    if ( doesExist && mode === "skip-if-exists" ) {
      console.info( `[SKIPPED] ${dest} (exists)` )
      return
    }

    await writeFile( dest, new TextEncoder().encode( cntn ) )
  } satisfies Action<{ content?: string; destination?: string }>

  // if(eager) {
  //   return execute()
  // } else {
  //   return execute
  // }
  // return async ( params ) => {
  //   await mkdir( dirname( config.destination ), { recursive: true } )

  //   // const template = ( await readFile( config.template ) ).toString()

  //   const rendered = params.renderer.renderString( { data: config.data ?? {}, template: template } )

  //   const doesExist = await fileExists( config.destination )

  //   if ( doesExist && config.writeMode === "force" ) {
  //     await remove( config.destination, { recursive: true } )
  //   }

  //   if ( doesExist ) {
  //     if ( config.writeMode === "skip-if-exists" ) {
  //       console.info( `[SKIPPED] ${config.destination} (exists)` )
  //       return
  //     }

  //     throw `File already exists\n -> ${config.destination}`
  //   }

  //   await writeFile( config.destination, new TextEncoder().encode( rendered ) )
  // }
}

function fileExists( destination: string ) {
  return access( destination ).then(
    () => true,
    () => false,
  )
}
