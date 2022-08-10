import fs from 'fs/promises';
import 'dotenv/config';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkTranslate from './index.mjs';

async function main() {
  try {
    const data = await fs.readFile(`./tests/test-source.md`, { encoding: 'utf8' });
    const authKey = process.env.DEEPL_KEY;
    const options = { sourceLang: 'en', destLang: 'es', apiKey: authKey };

    const file = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkTranslate, options)
      .process(data);

    await fs.writeFile('./tests/test-dest.md', String(file));
  } catch (err) {
    console.log(err);
  }
}

main();
