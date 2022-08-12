import * as deepl from 'deepl-node';
import yaml from 'js-yaml';

let translator;
let sourceLang;
let destLang;
let yamlTranslate;

const setDeepL = (options) => {
  const { apiKey } = options;

  sourceLang = options.sourceLang;
  destLang = options.destLang;
  translator = new deepl.Translator(apiKey);
};

const translate = async (text) => translator.translateText(text, sourceLang, destLang);

const visitorText = async (node) => {
  const newNode = { ...node };
  const term = node.value;
  const result = await translate(term);
  const { position } = node;
  position.end.column = position.end.column + result.text.length - term.length;
  position.end.offset = position.end.column - 1;

  newNode.value = result.text;
  newNode.position = position;
  return newNode;
};

const visitor = async (node) => {
  const newNode = { ...node };
  const term = node.children[0].value;
  const result = await translate(term);
  const { position } = node.children[0];
  position.end.column = position.end.column + result.text.length - term.length;
  position.end.offset = position.end.column;

  newNode.children[0].value = result.text;
  newNode.children[0].position = position;
  return newNode;
};

const walkNode = async (node) => {
  const newNode = { ...node };
  const newItems = [];

  newNode.children.map((item) => {
    if (item.type === 'text') {
      newItems.push(visitorText(item));
    } else {
      newItems.push(item);
    }
  })

  newNode.children = await Promise.all(newItems);

  return newNode;
};

const translateYaml = async (node) => {
  const newNode = { ...node };
  const yamlContent = node.value;
  const yamlObject = yaml.load(yamlContent);
  const yamlObjectCopy = { ...yamlObject };

  for (const item of yamlTranslate) {
    if (yamlObject[item]) {
      const result = await translate(yamlObject[item]);
      yamlObjectCopy[item] = result.text;
    }
  }

  /*
  yamlObjectCopy.lang = destLang;
  const translatedSlug = slugify(yamlObjectCopy["title"], {
    lower: true,
    locale: destLang,
  });
  yamlObjectCopy.path = `/${destLang}/${translatedSlug}`; */
  const dumpedYaml = yaml.dump(yamlObjectCopy, { forceQuotes: true });
  newNode.value = dumpedYaml;
  return newNode;
}

const walkRoot = async (root) => {
  if (root.type === 'root') {
    const newRoot = { ...root };
    const newRootItems = [];

    for (const node of root.children) {
      if (node.type === 'heading') {
        newRootItems.push(visitor(node));
      } else if (node.type === 'paragraph') {
        newRootItems.push(walkNode(node));
      } else if (node.type === 'yaml') {
        newRootItems.push(translateYaml(node));
      } else {
        newRootItems.push(node);
      }
    }
    newRoot.children = await Promise.all(newRootItems);
    return newRoot;
  }

  return null;
};

export default function remarkTranslate(options) {
  setDeepL(options);
  yamlTranslate = options?.yamlTranslate;

  return async function (root) {
    return new Promise((resolve, reject) => {
      try {
        const newRoot = walkRoot(root);
        resolve(newRoot);
      } catch (error) {
        reject(error);
      }
    });
  };
}
