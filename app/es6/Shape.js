class Shape {
    constructor (properties) {
        this.props = {
            width: properties.width,    
            height: properties.height,
            radius: properties.radius,
            x: properties.x,
            y: properties.y,
            fillColor: properties.color,
        }

        this._transforms = {
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            translateX: 0,
            translateY: 0,
            reflect: false
        }

        this.drawInstructions = null;

        this.parentCanvas = properties.canvas;
        this.renderQueueIndex = null;

        this.anims = [];

    }

    get animate () {
        return {
            x: (animProps) => {new animX(animProps, this).animate()},
            y: (animProps) => {new animY(animProps, this).animate()},
            width: (animProps) => {new animWidth(animProps, this).animate()},
            height: (animProps) => {new animHeight(animProps, this).animate()},
            radius: (animProps) => {new animRadius(animProps, this).animate()},
            rotate: (animProps) => {new animRotate(animProps, this).animate()},
        }
    }

    draw () {
        this.renderQueueIndex = `${new Date().getTime()}${Math.random() * 10}`;  //Generate random index id based on timestamp and random number
        this.parentCanvas.renderQueue.set(this.renderQueueIndex, this)
    }

    del () {
        this.parentCanvas.renderQueue.delete(this.renderQueueIndex);
    }
}

class Rect extends Shape {
    constructor (properties) {
        super(properties);
        this.init();
    }

    init () {
        super.drawInstructions = {
            onStart: () => {
                this.parentCanvas.ctx.moveTo(this.props.x, this.props.y);
                this.parentCanvas.ctx.beginPath();
            },

            connect: (x, y) => {this.parentCanvas.ctx.lineTo(this.props.x + x, this.props.y + y)},

            onFinish: () => {
                this.parentCanvas.ctx.closePath();
                this.parentCanvas.ctx.strokeStyle = this.props.strokeColor;
                this.parentCanvas.ctx.lineWidth = this.props.lineWidth;
                this.parentCanvas.ctx.fillStyle = this.props.fillColor;
                this.parentCanvas.ctx.fill();
            },

            points: () => {
                let props = this.props;
                
                return [
                    {x: props.width, y: 0},
                    {x: props.width, y: props.height},
                    {x: 0, y: props.height},
                    {x: 0, y: 0},
                ]
            }
        }
    }
}

class Circle extends Shape {
    constructor (properties) {
        super(properties);
        this.setDrawInstructions();
    }
    setDrawInstructions () {
        super.drawInstructions = () => {
            const parentCtx = this.parentCanvas.ctx;
            parentCtx.beginPath();
            parentCtx.arc(this.props.x, this.props.y, this.props.radius, 0, 2 * Math.PI);
            parentCtx.strokeStyle = this.props.strokeColor;
            parentCtx.lineWidth = this.props.lineWidth;
            parentCtx.fillStyle = this.props.fillColor;
            parentCtx.fill();
        }
    }
}

class CustomShape extends Shape {
    constructor (properties) {
        super(properties);
        this.drawInstructions = properties.drawInstructions;
    }
}
