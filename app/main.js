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
        this.cvs = new Canvas({
            width: 800, 
            height: 450, 
        });
        this.cvs.renderStart();

        const colors = ['red', 'orange', 'yellow'];
        
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                let shape = new Circle({
                    x: this.cvs.style.width / 2,
                    y: this.cvs.style.height / 2,
                    // width: 15,
                    // height: 15,
                    radius: 20,
                    color: colors[Math.round(Math.random() * 3)],
                    canvas: this.cvs,
                });
                shape.draw();
                this.anim(shape);
            }
        }, 100)
        // let shape = new Rect({
        //     x: 200,
        //     y: 200,
        //     width: 50,
        //     height: 50,
        //     color: 'red',
        //     canvas: this.cvs
        // });
        // shape.draw();
    }
    
    anim (shape) {
        let coordX;
        let coordY;
        if (Math.random() < 0.5) {
            coordX = -750 * Math.random();
            coordY = 750 * Math.random();
        } else {
            coordX = 750 * Math.random();
            coordY = -750 * Math.random();
        }

        shape.animate.x({
            coord: coordX,
            time: 1500,
            onComplete: () => {
                setTimeout(() => {shape.del()}, 1000);
            } 
        });
        shape.animate.y({
            coord: coordY,
            time: 1500
        });
        shape.animate.radius({
            radius: 100 * Math.random(),
            time: 1500
        });
        // shape.animate.height({
        //     height: 100 * Math.random(),
        //     time: 1500,
        // });
    }
}
const app = new App;
app.init();