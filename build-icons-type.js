const fs = require("fs");
const fontelloConfig = require("./src/assets/fontello/config.json");

const iconNames = fontelloConfig.glyphs.map((glyph) => `"${glyph.css}"`);
const tsType = `export type IconNames = ${iconNames.join(" | ")};`;

try {
  fs.writeFileSync("./src/types/IconNames.ts", tsType);
} catch (err) {
  console.error("Cannot create IconNames.ts:", err.message);
}
