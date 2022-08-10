# remark-translate

A simple plugin for remark to translate markdown text to other languages. It uses the
translation API of [DeepL](https://www.deepl.com/).

In order to use this plugin, you need to create an API key and register with DeepL.

## Installation

```js
npm install remark-translate
```

## Usage

You need to pass an `options` object to the plugin in order to use it.

These are the options:

- sourceLang: the language of the source markdown text
- destLang: the language of the translated text
- apiKey: the DeepL API token

For security, the API key is not displayed in the source code but used from the environment
variable `DEEPL_API_KEY`.

```js
const authKey = process.env.DEEPL_KEY;
const options = { sourceLang: 'en', destLang: 'fr', apiKey: authKey };

const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkTranslate, options)
    .process(data);
```

## Testing

You can test the plugin by running the following command:

```bash
npm run test
```

## References

- Remark: https://remark.js.org
- Unified: https://github.com/unifiedjs
- DeepL: https://www.deepl.com
