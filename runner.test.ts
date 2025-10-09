import test from "node:test"
import assert from "node:assert"
import { join } from "node:path"

import { run } from "./runner.ts"
import { blank1, blank2 } from "./actions/blank.ts"

import type { Config, GeneratorConfig } from "./types.ts"

import { context } from "./actions/context.ts"
import { loadTemplates } from "./actions/load-templates.ts"

test("simple", async () => {
  const simple: GeneratorConfig = {
    name: "simple",
    description: "description",
    actions: [
      blank1,
      blank2,
      context( () => ( { kek: Math.random() } ) ),
      console.log,
      loadTemplates( join( process.cwd(), "actions" ) ),
    ],
  }

  const config: Config = { generators: [ simple ] }
  const result = await run( config )

  assert( typeof result === "undefined" )
})
