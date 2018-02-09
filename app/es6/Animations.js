class Animation {
    constructor (animProps, object) {
        this.object = object;
        this.animIndex = object.anims.length - 1;
        this.anim = null;
        this.increment;
        this.incrementValue;
        this.animProps = animProps;
        this.onComplete = animProps.onComplete;
    }

    init (animFunction) {
        this.anim = setInterval(() => {
            animFunction();
        }, 16.66667)
        return this;
    }

    stop () {
        clearInterval(this.anim);
        if (this.onComplete) {
            this.onComplete();
        } else {
            return true;
        }
    }
}

class animX extends Animation{
    constructor (animProps, object) {
        super(animProps, object);
    }

    animate () {
        this.incrementValue = this.animProps.coord / (this.animProps.time / 16.66667);
        this.increment = Math.round(this.animProps.coord / this.incrementValue);

        super.init(() => {
            if (this.increment > 0) {
                this.object.props.x += this.incrementValue;
                this.increment--
            } else {
                this.stop();
            }
        })
    }
}

class animY extends Animation{
    constructor (animProps, object) {
        super(animProps, object);
    }

    animate () {
        this.incrementValue = this.animProps.coord / (this.animProps.time / 16.66667);
        this.increment = Math.round(this.animProps.coord / this.incrementValue);
        
        super.init(() => {
            if (this.increment > 0) {
                this.object.props.y += this.incrementValue;
                this.increment--
            } else {
                this.stop();
            }
        })
    }
}

class animRadius extends Animation{
    constructor (animProps, object) {
        super(animProps, object);
        this.animProps = animProps;
    }

    animate () {
        const increment = this.animProps.radius / (this.animProps.time / (1000 / 60));
        this.anim = setInterval(() => {
            this.object.props.radius += increment;
        }, 1000 / 60);
        setTimeout(() => {super.stop();}, this.animProps.time);
        return this;
    }
}

class animWidth extends Animation{
    constructor (animProps, object) {
        super(animProps, object);
    }

    animate () {
        this.incrementValue = this.animProps.width / (this.animProps.time / 16.66667);
        this.increment = Math.round(this.animProps.width / this.incrementValue);
        
        super.init(() => {
            if (this.increment > 0) {
                this.object.props.width += this.incrementValue;
                this.increment--
            } else {
                this.stop();
            }
        })
    }
}

class animHeight extends Animation{
    constructor (animProps, object) {
        super(animProps, object);
    }

    animate () {
        this.incrementValue = this.animProps.height / (this.animProps.time / 16.66667);
        this.increment = Math.round(this.animProps.height / this.incrementValue);
        
        super.init(() => {
            if (this.increment > 0) {
                this.object.props.height += this.incrementValue;
                this.increment--
            } else {
                this.stop();
            }
        })
    }
}