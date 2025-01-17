import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { sync as globSync } from "glob";
import { JSDOM } from "jsdom";
import path from "path";
import pc from "picocolors";
import prettyBytes from "pretty-bytes";
import prettyMs from "pretty-ms";
import puppeteer from "puppeteer";
import { renderToString } from "react-dom/server";
import { build as viteBuild } from "vite";

import { config } from "./config";
import { version } from "./package.json";
import { CVTemplate } from "./src/components/CVTemplate";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ROOT_SELECTOR = "#app";
const DIST_CSS_DIR = path.join(__dirname, "dist", "assets");
const OUT_DIR = path.join(__dirname, "dist");

function createRoot() {
  const baseHtml = readFileSync(path.join(__dirname, "index.html"), "utf-8");

  const {
    window: { document },
  } = new JSDOM(baseHtml);

  // Remove the script tags for Vite
  document.querySelectorAll("script").forEach((script) => script.remove());

  // Get all the CSS files Vite built and inject them into the HTML
  const styles = globSync(path.join(DIST_CSS_DIR, "*.css")).map((file) =>
    readFileSync(file, "utf-8"),
  );

  styles.forEach((style) => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  });

  return document;
}

async function renderHtml() {
  const rootDoc = createRoot();
  const output = renderToString(<CVTemplate config={config} />);

  const root = rootDoc.querySelector(ROOT_SELECTOR);

  if (!root) {
    throw new Error(
      `Could not find the root html element ${ROOT_SELECTOR} in index.html`,
    );
  }

  root.innerHTML = output;
  return rootDoc.documentElement.outerHTML;
}

async function createPdf(htmlPath: string, pdfPath: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "10mm", right: "10mm" },
    scale: 0.9,
  });
  await browser.close();
}

const start = Date.now();

viteBuild({ logLevel: "silent" })
  .then(renderHtml)
  .then(async (html) => {
    if (!existsSync(OUT_DIR)) {
      mkdirSync(OUT_DIR, { recursive: true });
    }

    const htmlPath = path.join(OUT_DIR, "index.html");
    const pdfPath = path.join(OUT_DIR, "cv.pdf");

    writeFileSync(htmlPath, html);
    await createPdf(htmlPath, pdfPath);

    return [htmlPath, pdfPath];
  })
  .then((paths) => {
    const distRelative = pc.dim(path.relative(__dirname, OUT_DIR) + "/");

    console.log("\n" + pc.cyan(`cv v${version}`));

    const styledPaths = paths.map((pth) => {
      const baseName = path.basename(pth);
      const size = prettyBytes(statSync(pth).size);

      const basePath = pth.startsWith(OUT_DIR)
        ? distRelative
        : pth.replace(baseName, "");
      const finalPath = basePath + baseName;
      const finalPathStyled = pc.dim(basePath) + pc.green(baseName);

      return {
        pth,
        finalPath,
        finalPathStyled,
        size,
      };
    });

    const pathPad = styledPaths.reduce(
      (prev, { finalPathStyled }) =>
        finalPathStyled.length > prev ? finalPathStyled.length : prev,
      0,
    );
    const sizePad = styledPaths.reduce(
      (prev, { size }) => (size.length > prev ? size.length : prev),
      0,
    );

    styledPaths
      .map(
        (pth) =>
          pth.finalPathStyled.padEnd(pathPad + 2) +
          pc.dim(`${pc.bold(pth.size).padEnd(sizePad + 1)}`),
      )
      .forEach((pth) => console.log(pth));

    const diff = Date.now() - start;
    console.log(pc.green(`✓ finished in ${prettyMs(diff)}`));
  });
