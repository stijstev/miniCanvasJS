class Canvas {
    constructor (properties) {
        this.debug = true;
        this.style = {
            width: properties.width           || 300,
            height: properties.height         || 300,
            background: properties.background || '#333333',
        }

        this.cvs = null;
        this.renderQueue = new Map();
        this.renderFrameRequest = null;
        this.ctx = null;

        this.createCanvas();
    }

    createCanvas () {
        let canvas = document.createElement('canvas');
        this.cvs = canvas;

        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        
        let cvsAttribs = {
            id: 'miniCanvas',
            width: `${this.style.width}px`,
            height: `${this.style.height}px`,
            style: `background-color: ${this.style.background}`,
        }

        for (let attribute in cvsAttribs) {
            this.cvs.setAttribute(attribute, `${cvsAttribs[attribute]}`);
        }

        document.body.appendChild(canvas);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    }

    renderStop () {
        window.cancelAnimationFrame(this.renderFrameRequest);
    }

    renderStart (frameRate = 60) {
        this.frameRate = frameRate;
        //this._watchDog();
        this._render();
    }

    _watchDog () {
        setInterval(() => {
            if (this.debug) {
                console.log(this.renderQueue.size);
            }
            for (let [shapeKey, shape] of this.renderQueue.entries()) {
                if (shape.props.x > this.style.width + 30 || shape.props.x < - 30 || shape.props.y > this.style.height + 30 || shape.props.y < - 30) {
                    switch (this.offScreen.mode) {
                        case 'noDraw':
                            this.renderQueue.delete(shapeKey);
                            break;
                        case 'delete':
                            this.renderQueue.delete(shapeKey);
                            shape = null;
                            break;
                    }
                }
            }
        }, this.offScreen.time);
    }

    _render () {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

        for (let [shapeKey, shape] of this.renderQueue.entries()) {
            let connect = (x, y) => {shape.drawInstructions.connect(x, y)}
            let points = shape.drawInstructions.points();
            
            shape.drawInstructions.onStart();
            points.forEach((point, index) => {
                connect(point.x, point.y);
            });
            shape.drawInstructions.onFinish();
        }

        this.renderFrameRequest = window.requestAnimationFrame(() => {this._render()});
    }
}