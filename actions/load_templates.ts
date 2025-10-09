import type { ContextAction } from "../types.ts"
import { promises as fs } from "node:fs"
import path from "path"

export function loadTemplates( templatesPath: string ): ContextAction {
  return async function execute() {
    const templates: Map<string, { fullPath: string; realativePath: string; content: string }> = new Map()

    for await ( const fullPath of walkDir( templatesPath ) ) {
      const realativePath = path.relative( templatesPath, fullPath )

      const contentRaw = await fs.readFile( path.resolve( templatesPath, fullPath ) )

      templates.set( realativePath, { content: new TextDecoder().decode( contentRaw ), fullPath, realativePath } )
    }

    return { templates }
  }
}

async function* walkDir( dir: string ): AsyncGenerator<string, void, void> {
  const entries = await fs.readdir( dir, { withFileTypes: true } )

  for ( const entry of entries ) {
    const fullPath = path.join( dir, entry.name )

    if ( entry.isDirectory() ) {
      yield* walkDir( fullPath )
    } else if ( entry.isFile() ) {
      yield fullPath
    }
  }
}
