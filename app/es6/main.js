/*
The code written in this file is for demonstrational purposes and is not required for the proper functioning of miniCanvasJS
Feel free to change values and experiment.
Written by Stijn Stevens, 2018
*/

class App {
    constructor () {
        this.cvs = null;
    }
    init() {
        this.cvs = new Cvs({    //Make a canvas by creating a new instance of the Cvs class. It is possible to pass width, height, and color parameters as an object literal. Not passing these will make miniCanvas revert to default values.
            width: 800, 
            height: 450, 
            offScreen: {        //offScreen lets you decide what happens to shapes that are out of the canvas boundaries. Mode 'delete' deletes the shape (including animations and properties). 'noDraw' only splices the shape from the renderQueue. Properties continue to exist and animations continue executing. Can be re-added to renderQueue later.
                mode: 'delete',
                time: 7000      //How often should offScreen check if shapes are out of the canvas boundaries. More often can cause stuttering, less often will cause gradual slowdown. Find a value that fits your application the best
            }
        });
        this.cvs.renderStart();                     //Rendering will not start by default. To start rendering, call the renderStart() function on your Cvs instance.

        const colors = ["red", "orange", "yellow"];
        
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                let shape = new Rect({              //A shape is made by creating a new instance of Rect or Circle (more coming soon). Pass parameters for your shape as an object literal. Colors in hex or CSS color values.
                    x: this.cvs.style.width / 2,
                    y: this.cvs.style.height / 2,
                    width: 15,
                    height: 15,
                    fillColor: colors[Math.round(Math.random() * 3)],
                    canvas: this.cvs,               //Do not forget to pass your instance of Cvs to the shape.
                });
                this.animate(shape);                //Passes the shape to the animate function. Calling animate on shape (shape.animate({})) woudld suffice.
                shape.draw();
            }
        }, 250)
    }
    
    animate (shape) {
        let coordX;
        let coordY;
        if (Math.random() < 0.5) {
            coordX = -2000 * (Math.random() * 4);
            coordY = 2000 * (Math.random() * 4);
        } else {
            coordX = 2000 * (Math.random() * 4);
            coordY = -2000 * (Math.random() * 4);
        }

        shape.animate.x({   //Animating a shape can be achieved by calling the animate function on the shape object. Pass an object literal containing parameters for the animation to the function.
            coord: coordX,
            time: 10000
        });
        shape.animate.y({
            coord: coordY,
            time: 10000
        });
        shape.animate.width({
            width: 100 * Math.random(),
            time: 10000
        });
        shape.animate.height({
            height: 100 * Math.random(),
            time: 10000
        });
    }
}
const app = new App;
app.init();