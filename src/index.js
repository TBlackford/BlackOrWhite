'use strict';

const brain = require('brain.js');

class BlackOrWhite {
    constructor(config = {}, data = [], nn_config = {}) {
        const defaultConfig = {
            // You can customise the white or black colours
            white: "white",
            black: "black",
            appendDefaultData: true,
        }

        const defaultData = [
            {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
            {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
            {input: { r: 0.8, g: 1, b: 0.4 }, output: { black: 1 }},
            {input: { r: 0.41, g: 0.55, b: 0.77 }, output: { white: 1 }},
            {input: { r: 0.94, g: 0.47, b: 0.39 }, output: { white: 1 }},
            {input: { r: 0.64, g: 0.93, b: 0.44 }, output: { black: 1 }},
            {input: { r: 0.99, g: 0.89, b: 0 }, output: { black: 1 }},
            {input: { r: 0, g: 0.73, b: 0 }, output: { white: 1 }},
        ]

        // Make the network
        this.network = new brain.NeuralNetwork(nn_config);

        // Merge the configs
        this.config = Object.assign({}, defaultConfig, config);
        if(this.config.appendDefaultData) {
            defaultData.map(item => data.push(item));
        }
        this.data = data;

        // Do training
        this.network.train(this.data);
    }    

    _hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // Converts 0-255 to 0.0-1.0 
        return result ? {
            r: parseFloat((parseInt(result[1], 16) / 255).toFixed(2)),
            g: parseFloat((parseInt(result[2], 16) / 255).toFixed(2)),
            b: parseFloat((parseInt(result[3], 16) / 255).toFixed(2)),
        } : null;
    }

    findTextColor(backgroundColor = "#000") {      
        backgroundColor = this._hexToRgb(backgroundColor);

        // Determine the colour of the text
        var output = this.network.run(backgroundColor);        
        return output.white > output.black ? this.config.white : this.config.black;
    }
};

module.exports = BlackOrWhite;