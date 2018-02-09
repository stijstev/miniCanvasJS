const transform = {
    x: (newValue, object) => {
        object.props.x += newValue;
    },

    y: (newValue, object) => {
        object.props.y += newValue;
    },

    scaleX: (newValue, object) => {
        object.props.width *= newValue;
    },

    scaleY: (newValue, object) => {
        object.props.height *= newValue;
    },

    rotate: (newValue, object) => {
        //TODO: Add rotate code
    },

    skew: (newValue, object) => {
        //TODO: Add skew code
    },
}