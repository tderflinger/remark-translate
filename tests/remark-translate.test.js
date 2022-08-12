import fs from "fs/promises";
import "dotenv/config";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkTranslate from "../index.js";

describe("Test the translation functionality", () => {
  it("Translate English markdown to Spanish markdown", async () => {
    const data = await fs.readFile(`./tests/test-en-source.md`, {
      encoding: "utf8",
    });
    const authKey = process.env.DEEPL_KEY;
    const options = {
      sourceLang: "en",
      destLang: "es",
      apiKey: authKey,
      yamlTranslate: ["title", "description"],
    };

    const file = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter, ["yaml"])
      .use(remarkTranslate, options)
      .process(data);

    const dataDest = await fs.readFile(`./tests/test-es-dest.md`, {
      encoding: "utf8",
    });
    expect(String(file)).toEqual(dataDest);
  });
});
