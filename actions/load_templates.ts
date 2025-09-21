import type { ContextAction } from "../types.ts"
import { join, relative, resolve } from "@std/path"

export function loadTemplates( templatesPath: string ): ContextAction {
  return async function execute() {
    const templates: Map<string, { fullPath: string; realativePath: string; content: string }> = new Map()

    for await ( const fullPath of walkDir( templatesPath ) ) {
      const realativePath = relative( templatesPath, fullPath )

      const contentRaw = await Deno.readFile( resolve( templatesPath, fullPath ) )

      templates.set( realativePath, { content: new TextDecoder().decode( contentRaw ), fullPath, realativePath } )
    }

    return { templates }
  }
}

async function* walkDir( path: string ): AsyncGenerator<string, void, void> {
  for await ( const entry of Deno.readDir( path ) ) {
    const fullpath = join( path, entry.name )

    if ( entry.isDirectory ) {
      yield* walkDir( fullpath )
    }

    if ( entry.isFile ) {
      yield fullpath
    }
  }
}
