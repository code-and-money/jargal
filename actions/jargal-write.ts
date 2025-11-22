import { access, mkdir, rm, writeFile } from "node:fs/promises";

import assert from "node:assert";
import { dirname } from "node:path";
import type { TemplateData } from "./jargal-templates";

export type WriteActionConfig = {
  destination: string;
  mode?: "force" | "skip-if-exists";
} & TemplateData;

export async function write({ destination, templateContent, mode }: WriteActionConfig): Promise<void> {
  if (!templateContent) {
    return;
  }

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
}

function fileExists(destination: string) {
  return access(destination).then(
    () => true,
    () => false,
  );
}
