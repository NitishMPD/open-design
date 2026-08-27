import { join } from "node:path";

import type { ToolPackConfig } from "./config/index.js";

export function webToFigmaBundleResource(config: Pick<ToolPackConfig, "workspaceRoot">): { from: string; to: string } {
  return {
    from: join(config.workspaceRoot, "apps", "desktop", "vendor", "web-to-figma", "web-to-figma.bundle.js.gz"),
    to: "web-to-figma.bundle.js.gz",
  };
}
