//////////////////////////////////////////////////////////////////////////////
/* Canvas */
//////////////////////////////////////////////////////////////////////////////

class Cvs {
    constructor (properties) {
        this.style = {
            width: properties.width || 300,
            height: properties.height || 300,
            background: properties.background || '#333333',
        }

        this.offScreen = {
            mode: properties.offScreen.mode || 'delete',
            time: properties.offScreen.time || 10000
        }
        this.cvs = null;
        this.renderQueue = [];
        this.renderFrameRequest = null;
        this.frameRate = null;
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
        this._watchDog();
        this._render();
    }

    _watchDog () {
        console.log('I am efficient! Elements off screen will be deleted or not drawn. See "offScreen" for more. Stable after about 30 seconds.');
        setInterval(() => {
            this.renderQueue.forEach((shape, index) => {
                if (shape.props.x > this.style.width + 30 || shape.props.x < -30 || shape.props.y > this.style.height + 30 || shape.props.y < -30) {
                    switch (this.offScreen.mode) {
                        case 'noDraw':
                            this.renderQueue.splice(index, 1);
                            break;
                        case 'delete':
                            this.renderQueue.splice(index, 1);
                            shape = null;
                            break;
                    }
                }
            })
            console.log(`Objects currently in queue to be rendered: ${this.renderQueue.length}`);
        }, this.offScreen.time)
    }

    _render () {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        this.renderQueue.forEach((shape, index) => {
            shape._drawInstructions();
        }, this);
        this.renderFrameRequest = window.requestAnimationFrame(() => {this._render()});
    }
}

//////////////////////////////////////////////////////////////////////////////
/* Shapes */
//////////////////////////////////////////////////////////////////////////////

class Shape {
    constructor (properties) {
        this.props = {
            width: properties.width,
            height: properties.height,
            radius: properties.radius,
            x: properties.x,
            y: properties.y,
            fillColor: properties.fillColor,
        }
        this._targetCanvas = properties.canvas;
        this._renderQueueIndex = null;

        this.anims = [];

    }

    get animate () {
        return new Animation(this);
    }

    draw () {
        this._targetCanvas.renderQueue.push(this);
        this._renderQueueIndex = this._targetCanvas.renderQueue.length - 1;
    }
}

class Rect extends Shape {
    constructor (properties) {
        super(properties);
    }
    _drawInstructions () {
        const targetCtx = this._targetCanvas.ctx;
        targetCtx.beginPath();
        targetCtx.rect(this.props.x, this.props.y, this.props.width, this.props.height);
        targetCtx.strokeStyle = this.props.strokeColor;
        targetCtx.lineWidth = this.props.lineWidth;
        targetCtx.fillStyle = this.props.fillColor;
        targetCtx.fill();
    }
}

class Circle extends Shape {
    constructor (properties) {
        super(properties);
    }
    _drawInstructions () {
        const targetCtx = this._targetCanvas.ctx;
        targetCtx.beginPath();
        targetCtx.arc(this.props.x, this.props.y, this.props.radius, 0, 2 * Math.PI);
        targetCtx.strokeStyle = this.props.strokeColor;
        targetCtx.lineWidth = this.props.lineWidth;
        targetCtx.fillStyle = this.props.fillColor;
        targetCtx.fill();
    }
}

//////////////////////////////////////////////////////////////////////////////
/* Animations */
//////////////////////////////////////////////////////////////////////////////

class Animation {
    constructor (object) {
        this.object = object;
        this.animIndex = object.anims.length - 1;
    }

    _x (animProps) {
        const increment = animProps.coord / (animProps.time / (1000 / 60));
        let anim = setInterval(() => {
            this.object.props.x += increment;
        }, 1000 / 60)
        setTimeout(() => {clearInterval(anim); this.object.anims.splice[this.animIndex];}, animProps.time);
        return anim;
    }

    _y (animProps) {
        const increment = animProps.coord / (animProps.time / (1000 / 60));
        let anim = setInterval(() => {
            this.object.props.y += increment
        }, 1000 / 60)
        setTimeout(() => {clearInterval(anim); this.object.anims.splice[this.animIndex]; /*console.log(this.object.props.y)*/}, animProps.time); //Console logs for debug purposes
        return anim;
    }

    _radius (animProps) {
        const increment = animProps.radius / (animProps.time / (1000 / 60));
        let anim = setInterval(() => {
            this.object.props.radius += increment;
        }, 1000 / 60);
        setTimeout(() => {clearInterval(anim); this.object.anims.splice[this.animIndex];}, animProps.time);
        return anim;
    }

    _width (animProps) {
        const increment = animProps.width / (animProps.time / (1000 / 60));
        let anim = setInterval(() => {
            this.object.props.width += increment;
        }, 1000 / 60);
        setTimeout(() => {clearInterval(anim); this.object.anims.splice[this.animIndex]; /*console.log(this.object.props.width)*/}, animProps.time);
        return anim;
    }

    _height (animProps) {
        const increment = animProps.height / (animProps.time / (1000 / 60));
        let anim = setInterval(() => {
            this.object.props.height += increment;
        }, 1000 / 60);
        setTimeout(() => {clearInterval(anim); this.object.anims.splice[this.animIndex];}, animProps.time);
        return anim;
    }

    get x () {
        return animProps => this._x(animProps);
    }

    get y () {
        return animProps => this._y(animProps);
    }

    get radius () {
        return animProps => this._radius(animProps);
    }

    get width () {
        return animProps => this._width(animProps);
    }

    get height () {
        return animProps => this._height(animProps);
    }
}
