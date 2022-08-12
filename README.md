# remark-translate

A simple plugin for remark to translate markdown text to other languages. It uses the
translation API of [DeepL](https://www.deepl.com/).

In order to use this plugin, you need to create an API key and register with DeepL.

Note: This is the first version of `remark-translate`, so please give feedback if you find any bugs.

## Installation

```bash
npm install remark-translate
```

## Usage

You need to pass an `options` object to the plugin in order to use it.

These are the options:

- sourceLang: the language of the source markdown text
- destLang: the language of the translated text
- apiKey: the DeepL API token
- yamlTranslate (optional): array with the yaml frontmatter keys to be translated

For security, the API key is not displayed in the source code but used from the environment
variable `DEEPL_API_KEY`.

This is an example for translating markdown text from English to Spanish:

```js
const authKey = process.env.DEEPL_KEY;
const options = { sourceLang: 'en', destLang: 'es', apiKey: authKey, yamlTranslate: ["title", "description"] };

const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkTranslate, options)
    .process(data);
```

Note that any yaml frontmatter fields as defined in `yamlTranslate` options are also translated.

This library is ESM only, meaning you cannot import it using `require` in a Node application. Therefore, you need
at a minimum a Node version that supports ESMs.

## Testing

You can test the plugin by running the following command:

```bash
npm run test
```

## References

- Unified: https://github.com/unifiedjs
- Remark: https://remark.js.org
- DeepL: https://www.deepl.com

## License

MIT License