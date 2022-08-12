With the advent of JavaScript libraries for machine learning, it is now possible to do simple machine learning (ML) tasks in
the browser. One library that makes this especially easy for beginners is [ml5.js](https://ml5js.org).

Ml5.js is an abstraction over the popular [Tensorflow.js](https://www.tensorflow.org/js) JavaScript implementation. Tensorflow.js is designed for
mobile and browser environments and has a limited set of capabilities compared to the full Tensorflow library.
But this should not hold you back with your AI projects in the browser because you can already do amazing things.

How easy it is to recognize the bison show the following lines of code:

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

First, we import the ml5.js library that is hosted on a CDN. Then we define the image file
we want to recognize. In this case, it as the image of a bison from Tomas Caspers.

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

In the sketch.js file, we get the image element and two elements to display the name and the
probability.

The function ml5.imageClassifier() returns a promise with a classifier. We use the predictor
function of the classifier to get a prediction from our bison image element.
Next, the result of the predictor function is displayed. That is, the name of the object
recognized and its probability.

In case you wondered, this example uses [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet), a special pre-trained model.
The MobileNet model is optimized for environments with limited resources, like a
browser or mobile devices. Yet, it claims to have good results.

MobileNet is available for different sizes and different levels of accuracy. It
has 1,000 classes available with pre-trained objects. Other examples besides bison
recognition are classifications of tree frogs, African crocodiles, and the Indian elephant.

You can find a list of the classes in this file:

- https://github.com/tensorflow/tfjs-models/blob/master/mobilenet/src/imagenet_classes.ts

## Use Case

One potential use case would be an animal recognizer as a web application. Users upload
the image of the animal and the application returns the recognized name together with a
probability.

I am sure you find other useful applications. Write me if you like!

<hr></hr>

## Links

- Ml5.js: https://ml5js.org
- Tensorflow.js: https://www.tensorflow.org/js
- MobileNet: https://github.com/tensorflow/tfjs-models/tree/master/mobilenet

## References

- Bison image, Tomas Caspers, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)
