import { access, mkdir, rm, writeFile } from "node:fs/promises";

import type { Action } from "../types.ts";
import assert from "node:assert";
import { dirname } from "node:path";

export type WriteActionConfig = {
  destination?: string;
  templateContent?: string;
  mode?: "force" | "skip-if-exists";
};

export function write({
  destination: writeDestination,
  templateContent: writeContent,
  mode,
}: WriteActionConfig): Action<{ templateContent?: string; destination?: string }> {
  return async function execute({ context: { templateContent: executeContent, destination: executeDestination } }) {
    const destination = executeDestination || writeDestination;
    const templateContent = executeContent || writeContent;

    assert(destination, "must provide `destination`");
    assert(templateContent, "must provide `templateContent`");

    await mkdir(dirname(destination), { recursive: true });

    let doesExist = await fileExists(destination);

    if (doesExist && mode === "force") {
      await rm(destination, { recursive: true, force: true });
      doesExist = false;
    }

    if (doesExist && mode !== "skip-if-exists") {
      throw `File already exists\n -> ${destination}`;
    }

    if (doesExist && mode === "skip-if-exists") {
      console.info(`[SKIPPED] ${destination} (exists)`);
      return;
    }

    await writeFile(destination, new TextEncoder().encode(templateContent));
  } satisfies Action<{ templateContent?: string; destination?: string }>;
}

function fileExists(destination: string) {
  return access(destination).then(
    () => true,
    () => false,
  );
}
