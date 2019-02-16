var assert = require('assert');
const BlackOrWhite = require('./../index.js')

describe('BlackOrWhite', function() {
    describe('Check colours', function() {
        it('should return white - backgroundColor: #000', function() {
            const bow = new BlackOrWhite();
            var colour = bow.findTextColor("#000");
            
            assert.equal(colour, "white");
        });

        it('should return black - backgroundColor: #fff', function() {
            var bow = new BlackOrWhite();
            var colour = bow.findTextColor("#fff");
            
            assert.equal(colour, "black");
        });

        it('should return white - backgroundColor: #000000', function() {
            var bow = new BlackOrWhite();
            var colour = bow.findTextColor("#000000");
            
            assert.equal(colour, "white");
        });

        it('should return black - backgroundColor: #ffffff', function() {
            var bow = new BlackOrWhite();
            var colour = bow.findTextColor("#ffffff");
            
            assert.equal(colour, "black");
        });
    });

    describe('Check colours with training data', function() {
        it('should return white - data array is length 3', function() {
            var bow = new BlackOrWhite({}, [
                {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
                {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
                {input: { r: 123/255, g: 31/255, b: 75/255 }, output: { black: 1 }},
            ]);
            var colour = bow.findTextColor("#000");
            
            assert.equal(colour, "white");
        });

        it('should return black - data array is length 6', function() {
            var bow = new BlackOrWhite({}, [
                {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
                {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
                {input: { r: 0.73, g: 0.81, b: 0.37 }, output: { black: 1 }},
                {input: { r: 0.1, g: 0.71, b: 0.73 }, output: { black: 1 }},
                {input: { r: 0.11, g: 0.64, b: 0.73 }, output: { black: 1 }},
                {input: { r: 0.63, g: 0.39, b: 0.08 }, output: { black: 1 }},
            ]);
            var colour = bow.findTextColor("#fff");
            
            assert.equal(colour, "black");
        });
    });

    describe('Check colours with training data and config', function() {
        it('should return white - data array is length 3', function() {
            var bow = new BlackOrWhite({
                white: "e4e4e4",
                black: "4a4a4a"
            }, [
                {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
                {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
                {input: { r: 123/255, g: 31/255, b: 75/255 }, output: { black: 1 }},
            ]);
            var colour = bow.findTextColor("#000");
            
            assert.equal(colour, "e4e4e4");
        });

        it('should return black - data array is length 6', function() {
            var bow = new BlackOrWhite({
                white: "e4e4e4",
                black: "4a4a4a"
            }, [
                {input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 }},
                {input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 }},
                {input: { r: 0.73, g: 0.81, b: 0.37 }, output: { black: 1 }},
                {input: { r: 0.1, g: 0.71, b: 0.73 }, output: { black: 1 }},
                {input: { r: 0.11, g: 0.64, b: 0.73 }, output: { black: 1 }},
                {input: { r: 0.63, g: 0.39, b: 0.08 }, output: { black: 1 }},
            ]);
            var colour = bow.findTextColor("#fff");
            
            assert.equal(colour, "4a4a4a");
        });
    });
});