# miniCanvasJS v0.1.0

miniCanvasJS is a lightweight, compact canvas animation library written in native ES6. This is my first project of this size and complexity. Feedback and bug reports are appreciated.

## Author

**Stijn Stevens** - [StijStev](https://github.com/stijstev)

Like this project? Support the creator! It's always appreciated :)
* Ethereum address: 0x16A49febDe0c927BC942878e644ea35a18dcF6CF

## Features
A brief list of current features, planned features and features I'm still dreaming up.
###Features:
* Simple creation and management of HTML5 canvases
* Simple creation and management of shapes (circles and rectangles)
* Drawing and rendering shapes to HTML5 canvases
* Animation of shapes
* Clear and consistent syntax

###Planned short-term features:
* Transformations (scale, translate, rotate, skew)
* More animations (scale, translate, rotate, skew)
* Custom shapes and more built-in shapes
* Gradients

###Planned long-term features:
* Support for images
* Physics and collisions

## Getting Started

Simply clone the repository onto your local machine in a directory of your choosing.
Link the script to your HTML file using the <script></script> tag.
Check out main.js. It contains a few examples of how to use the library.

### Dependencies

Currently, miniCanvasJS requires no dependencies. This may change in the future.

## Usage and code snippets
This project was entirely written in ES6. You may transpile it to ES5 but I don't recommend it. I recommend you stick to ES6 yourself.
### Creating a canvas
To get started, a canvas must be created.

```javascript
const canvas = new Cvs();
```

This will generate a default canvas with a width of 300 pixels and a height of 300 pixels. It is possible to set these parameters yourself by passing an object literal:

```javascript
const canvas = new Cvs({
    width: 500px,
    height: 300px,
    background: '#FF0000'
});
```

This will create a canvas with a red background, a width of 500px and a height of 300px.

By default, rendering is turned off (shapes will not be drawn to the canvas). To turn rendering, call following function on your canvas:

```javascript
 canvas.renderStart();
```

### Creating shapes

Currently, miniCanvas has support for 2 shapes: circles and rectangles. Support for more and custom shapes is coming soon.
To create a rectangle, you must create a new instance of the Rect class.

```javascript
let rectangle = new Rect({
    width: 50px,
    height: 50px,
    x: 50px,
    y: 50px,
    fillColor: '#00FF00'
    canvas: canvas
});
```
This returns a rectangle. Note: there are no default values configured for shapes in this version. It is of importance that you pass atleast the following parameters to your shape: width, height, x, y and the target canvas. Or in the case of the circle: radius, x, y and the target canvas.

To now draw this shape to your canvas, call draw() on your shape:

```javascript
rectangle.draw();
});
```

### Animating shapes

Let's bring some life to our shapes. Currently, these animations are supported in miniCanvas:

* x
* y
* width
* height
* radius

You can animate a shape by calling 'animate.animation()' on the shape you wish to animate. For example, if we want to animate x we would call 'animate.x()'. The parameters for the animation are passed as an object literal. Let's animate our rectangle's x:

```javascript
rectangle.animate.x({
    coord: 300,
    time: 2000
});
```
In this version, all values passed to animations are relative and start from the top left corner of the shape. In this case, our rectangle will move 300 pixels to the right in a timespan of 2 seconds. Time is always passed in milliseconds. Animating to the opposite side simply requires a negative value at 'coord'.

The following example makes the rectangle 50 pixels taller over a timespan of 1 second.

```javascript
rectangle.animate.height({
    height: 50,
    time: 1000
});
```

### Optimizing your code
Optimization is the bread and butter of this library. There is currently one built-in function that helps you optimize your application. offScreen. The parameters for offScreen are passed to the canvas constructor when it is instantiated.
offScreen handles objects that are out of the canvas' boundaries. There are 2 modes for this function:

* noDraw: This keeps your shape in memory but removes it from the renderQueue. In other words: it still exists and all functions on this shape will continue as normal but it will not be drawn to the canvas anymore.

* delete: This deletes the shape when it is out of the canvas' boundaries.

You can set one final paramater to this function: the timer. A short timer will check if a shape has gone out of bounds more often. This may however lead to stuttering. A longer timer prevents stuttering but may slow down your application in the long run. It is up to you to find a good balance for your project.

You must pass these parameters when you create the canvas. If these parameters are not set before renderStart() is called, offScreen will revert to default values. An example:

```javascript
const canvas = new Cvs({
    width: 500px,
    height: 300px,
    background: '#FF0000',
    offScreen: {
        mode: 'delete',
        time: 7000
    }
});
canvas.renderStart();
```

It is still possible to modify these parameters after renderStart() is called. It does however require jumping through a few hoops. You must stop rendering the canvas in order to modify these parameters. Example:

```javascript
canvas.renderStop();
canvas.offScreen.mode = "delete";
canvas.offScreen.time = 5000;
canvas.renderStart();
```

### Final words
Feel free to experiment with the code yourself. The snippets above should not create any issues but feel free to experiment and record any bugs. That is all, thank you for reading :)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details