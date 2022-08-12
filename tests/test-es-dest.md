---
title: 'Reconocer un bisonte con ML'
date: '2019-03-11T22:40:32.169Z'
layout: 'post'
lang: 'en'
draft: false
path: '/en/recognize-bison-ai'
category: 'Web'
tags:
  - 'JavaScript'
  - 'Web'
  - 'AI'
  - 'ML'
  - 'Image recognition'
description: 'La biblioteca ml5.js facilita a los desarrolladores de JavaScript la integración del aprendizaje automático (ML) en su aplicación web. En este artículo te muestro cómo reconocer fácilmente un bisonte con IA.'
audio: false
attachments:
  - './bison.jpg'

---

Con la llegada de las bibliotecas de JavaScript para el aprendizaje automático, ahora es posible realizar tareas sencillas de aprendizaje automático (ML) en
en el navegador. Una de las bibliotecas que lo hace especialmente fácil para los principiantes es[ml5.js](https://ml5js.org).

Ml5.js es una abstracción sobre el popular[Tensorflow.js](https://www.tensorflow.org/js) Implementación de JavaScript. Tensorflow.js está diseñado para
entornos móviles y de navegador y tiene un conjunto limitado de capacidades en comparación con la biblioteca completa de Tensorflow.
Pero esto no debería frenarte con tus proyectos de IA en el navegador porque ya puedes hacer cosas increíbles.

Lo fácil que es reconocer el bisonte muestran las siguientes líneas de código:

index.html

```html
<head>
  <script
    src="https://unpkg.com/ml5@0.1.1/dist/ml5.min.js"
    type="text/javascript"
  ></script>
</head>

<body>
  <img src="images/bison.jpg" id="image" />
  <script src="sketch.js"></script>
</body>
```

Primero, importamos la biblioteca ml5.js que está alojada en una CDN. Luego definimos el archivo de imagen
que queremos reconocer. En este caso, como la imagen de un bisonte de Tomas Caspers.

sketch.js

```javascript
const image = document.getElementById('image') // The image we want to classify
const result = document.getElementById('result') // The result tag in the HTML
const probability = document.getElementById('probability') // The probability tag in the HTML

// Initialize the Image Classifier method with MobileNet
ml5
  .imageClassifier('MobileNet')
  .then(classifier => classifier.predict(image))
  .then(results => {
    result.innerText = results[0].className
    probability.innerText = results[0].probability.toFixed(4)
  })
```

En el archivo sketch.js, obtenemos el elemento imagen y dos elementos para mostrar el nombre y la
probabilidad.

La función ml5.imageClassifier() devuelve una promesa con un clasificador. Utilizamos la función predictor
del clasificador para obtener una predicción de nuestro elemento de imagen bisonte.
A continuación, se muestra el resultado de la función de predicción. Es decir, el nombre del objeto
reconocido y su probabilidad.

En caso de que te lo preguntes, este ejemplo utiliza[MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)un modelo especial preentrenado.
El modelo MobileNet está optimizado para entornos con recursos limitados, como un
navegador o los dispositivos móviles. Sin embargo, afirma tener buenos resultados.

MobileNet está disponible para diferentes tamaños y niveles de precisión. En
dispone de 1.000 clases con objetos preformados. Otros ejemplos, además del reconocimiento de bisontes
son clasificaciones de ranas arborícolas, cocodrilos africanos y elefantes indios.

Puede encontrar una lista de las clases en este archivo:

*   https://github.com/tensorflow/tfjs-models/blob/master/mobilenet/src/imagenet\_classes.ts

## Caso práctico

Un caso de uso potencial sería un reconocedor de animales como aplicación web. Los usuarios suben
la imagen del animal y la aplicación devuelve el nombre reconocido junto con una
probabilidad.

Seguro que encuentras otras aplicaciones útiles. ¡Escríbeme si quieres!

<hr></hr>

## Enlaces

*   Ml5.js: https://ml5js.org
*   Tensorflow.js: https://www.tensorflow.org/js
*   MobileNet: https://github.com/tensorflow/tfjs-models/tree/master/mobilenet

## Referencias

*   Bison image, Tomas Caspers, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)
