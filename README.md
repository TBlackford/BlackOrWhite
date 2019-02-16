# Black Or White

## About

This is a small module that uses a neural network to determine whether the text colour should be black or white. The neural network library that this uses is [Brain.js](https://github.com/BrainJS/brain.js).

# Examples

```javascript
// Include the module
const BlackOrWhite = require('BlackOrWhite');
// or
import BlackOrWhite from 'BlackOrWhite';

// Make a new instance of it
const bow = new BlackOrWhite();

// This is the background color of the page or component
const backgroundColor = "#663399";

// Find the text color
const textColor = bow.findTextColor(backgroundColor);

// Should print 'white'
console.log(textColor);
```

You can also add in three arguments to the constructor to customise the returned text colour, what data is used to train, and how the training is done.

```javascript
const config = {
    white: "eee",
    black: "a4a4a4"
}

const data = [
    {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
    {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
    {input: { r: 0.8, g: 1, b: 0.4 }, output: { black: 1 }},
    {input: { r: 0.41, g: 0.55, b: 0.77 }, output: { white: 1 }},
    {input: { r: 0.94, g: 0.47, b: 0.39 }, output: { white: 1 }},
    {input: { r: 0.64, g: 0.93, b: 0.44 }, output: { black: 1 }},
    {input: { r: 0.99, g: 0.89, b: 0 }, output: { black: 1 }},
    {input: { r: 0, g: 0.73, b: 0 }, output: { white: 1 }},
]

const nn_config = {
    activation: 'tanh', 
    hiddenLayers: [6],
    learningRate: 0.6 
}

// Make a new instance of it
const bow = new BlackOrWhite(config, data, nn_config);

// This is the background color of the page or component
const backgroundColor = "#663399";

// Find the text color
const textColor = bow.findTextColor(backgroundColor);

// Should print '#eee'
console.log(textColor);
```

# Options

There are two config objects in the constructor as well as an array. 

## config



### Default
```javascript
// You can customise the white or black colours
// Be careful that they don't stray too far from #000 or #FFF
const config = {    
    white: "white",
    black: "black",
    appendDefaultData: true,
}
```

## data

The data is an array of objects that have two keys: input and output. 
- Input has three keys: r, g, and b which need to be a float between 0 and 1. 
- Output only has one key which is the desired text color which must be 1.
  
If the appendDefaultData config option is true then the data passed in will be appended to the default data.

Default:
```javascript
const data = [
    {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
    {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
    {input: { r: 0.8, g: 1, b: 0.4 }, output: { black: 1 }},
    {input: { r: 0.41, g: 0.55, b: 0.77 }, output: { white: 1 }},
    {input: { r: 0.94, g: 0.47, b: 0.39 }, output: { white: 1 }},
    {input: { r: 0.64, g: 0.93, b: 0.44 }, output: { black: 1 }},
    {input: { r: 0.99, g: 0.89, b: 0 }, output: { black: 1 }},
    {input: { r: 0, g: 0.73, b: 0 }, output: { white: 1 }},
]
```

## nn_config

This config object is for the Brain.js neural network constructor. (The following is )

### activation
There are four types of activation functions that Brain.js (and BlackOrWhite) can support:

- [sigmoid](https://www.wikiwand.com/en/Sigmoid_function) (default)
- [relu](https://www.wikiwand.com/en/Rectifier_(neural_networks))
- [leaky-relu](https://www.wikiwand.com/en/Rectifier_(neural_networks))
- [tanh](https://theclevermachine.wordpress.com/tag/tanh-function/)

### hiddenLayers
This specifies the number of hidden layers in the network and the number of them.
```
hiddenLayers: [2, 3]
```
This would mean that there are two layers with the first having 2 nodes and the second having 3 nodes.

### learningRate
This scales with the delta that the network uses and affects the learning rate as well as the outcome.

### Default
```javascript
const nn_config = {
    activation: 'sigmoid', 
    hiddenLayers: [4],
    learningRate: 0.6 
}
```

