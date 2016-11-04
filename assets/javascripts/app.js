// Init Foundation 6


$(document).foundation();
var label_max_width = 0;
$('.input-group-label').each(function() {
    var label_width = $(this).width();
    if(label_width >= label_max_width) {
        label_max_width = label_width;
    }
});
$('.input-group-label').each(function() {
    $(this).css({'width': label_max_width + 20, 'padding': 0});
});

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Animation for triangles, canvas elements add to elements which have selectorClass
// Author - Rich J

var selectorClass = "trianglize";
var requestId;

var trianglize = function(element,i){

    this.buildCanvas = function(){
        //Create canvas element
        this.canvas = this.newCanvasElement();
        //Append to element
        element.appendChild(this.canvas);
        //Assign new context
        this.context = this.assignContext();
        //Initalize triangles
        this.triangles = this.initTriangles();
    }

    this.newCanvasElement = function(){
        //Create canvas element
        var canvas = document.createElement("canvas");
        //Set canvas id
        canvas.id = "canvas-" + i;
        //Set canvas dimensions
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        return canvas;
    }

    this.assignContext = function(){
        //Create context
        return this.canvas.getContext("2d");
    }

    this.newTriangle = function() {
        //Create new triangle with random properties
        var triangle = {};
        triangle.x = Math.random() * this.canvas.offsetWidth; // Random starting position on X axis
        triangle.y = Math.random() * this.canvas.offsetHeight; // Random starting position on Y axis
        triangle.scale = Math.random() * 150; //Scale of Triangle based on 150 (Needs changing to work off area of canvas)
        triangle.height = triangle.scale * (Math.sqrt(3)/2); //Height of the triangle (center of edge to opposite verticies)
        triangle.opacity = Math.random() / 5; //Random initial opacity
        return triangle;
    }

    this.initTriangles = function(){
        //Array of triangles
        var triangles = [];
        //Calculate max number of triangles to be generated
        this.maxTriangles = this.getMaxTriangles();
        //Create triangles based on maxTriangles
        for (var i = 0; i < this.maxTriangles; i++) {
            //Add new triangle to array
            triangles[i] = this.newTriangle();
        };
        return triangles;
    }

    this.getMaxTriangles = function(){
        //Calculate max number of triangles to be generated
        return Math.floor(Math.pow(this.canvas.width * this.canvas.height / 2000, 1/2));
    }

    this.drawTriangle = function(triangle){
        //Select context
        var context = this.context;
        //Save current state
        context.save();
        // Draw a triangle
        context.fillStyle = "rgba(0,0,0," + triangle.opacity + ")";
        context.beginPath();
        context.translate(triangle.x,triangle.y);                       //Move to start position
        context.rotate(Math.PI / 2);                                    //Rotate left
        context.moveTo(0, -triangle.height / 2);
        context.lineTo( -triangle.scale / 2, triangle.height / 2);
        context.lineTo(triangle.scale / 2, triangle.height / 2);
        context.lineTo(0, -triangle.height / 2);
        context.fill();
        context.closePath();
        //Restore context
        context.restore();
    }

    this.draw = function(){
        //For each triangle draw triangle
        for(var i = 0; i < this.triangles.length; i++) {
            var triangle = this.triangles[i];
            this.drawTriangle(triangle);
        }
    }

    this.clearCanvas = function(){
        // Clear out the whole of the canvas ready for redraw
        this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    this.moveTriangles = function(){
        this.angle = 50;
        //For each triangle, move it!
        for(var i=0; i < this.maxTriangles; i++){
            var triangle = this.triangles[i];
            this.moveTriangle(triangle);
        }
    }

    this.moveTriangle = function(triangle){
        this.angle += Math.sqrt(2/triangle.scale);
        //moving top to bottom using Cos
        triangle.x += (Math.abs(Math.cos(this.angle)*5))/10;
        //Resetting triangles when they are out of frame
        if(triangle.y > this.canvas.height || triangle.y < 0 || triangle.x > (this.canvas.width + (triangle.scale / 2))){
            triangle.y = Math.random() * this.canvas.height;
            triangle.x =- triangle.scale / 2;
        }
    }

    this.updateCanvas = function(){
        //Update canvas element
        this.canvas = this.updateCanvasElement();
        //Assign updated context
        this.context = this.assignContext();
        //Update triangles
        this.triangles = this.updateTriangles();
    }

    this.updateCanvasElement = function(){
        //Select the canvas from the DOM by ID
        var canvas = document.getElementById(this.canvas.id);
        //Set canvas dimensions
        canvas.width = canvas.parentNode.offsetWidth;
        canvas.height = canvas.parentNode.offsetHeight;
        return canvas;
    }

    this.updateTriangles = function(){
        var updatedMaxTriangles = this.getMaxTriangles();
        //Check whether max triangles has changed
        if (this.maxTriangles < updatedMaxTriangles) {
            // If max allows triangles has increased add more
            for (var i = this.triangles.length; i < updatedMaxTriangles; i++) {
                //Add new triangle to array
                this.triangles[i] = this.newTriangle();
            };
        }
        else if (this.maxTriangles > updatedMaxTriangles) {
            //If it has decreased then remove some
            for (var i = this.triangles.length; i > updatedMaxTriangles; i--) {
                this.triangles.pop();
            };
        }
        else {
            //If nothing has changed return
            return this.triangles;
        }
        //Update maxTriangles
        this.maxTriangles = updatedMaxTriangles;
        return this.triangles;
    }
}

function animateTriangles() {
    requestId = requestAnimationFrame(animateTriangles);
    //Animation frame proceedures for each canvas element
    for(var i = 0; i < triangleCanvas.length; i++) {
        triangleCanvas[i].clearCanvas();
        triangleCanvas[i].moveTriangles();
        triangleCanvas[i].draw();
    }
}

function startAnimateTriangles() {
    //Check if animation initiated already
    if (!requestId) {
        //Start animation
        animateTriangles();
    }
}

function stopAnimateTriangles() {
    if (requestId) {
        //Stop animation
       window.cancelAnimationFrame(requestId);
       requestId = undefined;
    }
}

function resizeend() {
    if (new Date() - resizeTime < delta) {
        setTimeout(resizeend, delta);
    } else {
        resizeTimeout = false;
        //Stop animation
        stopAnimateTriangles();
        //Update animation frame proceedures for each canvas element
        for(var i = 0; i < triangleCanvas.length; i++) {
            triangleCanvas[i].updateCanvas();
        }
        //Restart animation
        startAnimateTriangles();
    }
}


var triangleCanvas = new Array();
//begin once DOM is loaded
window.addEventListener('load', function(){
    //Check DOM for target elements with selectorClass
    var trianglizeElements = document.getElementsByClassName(selectorClass);
    //For each .trianglize element
    for(var i = 0; i < trianglizeElements.length; i++) {
        var element = trianglizeElements[i];
        //Create new canvas object
        triangleCanvas[i] = new trianglize(element,i);
        //Build new canvas
        triangleCanvas[i].buildCanvas();
    }
    //Start the animation loop
    startAnimateTriangles();
});


// Triggering resize after window resize event has completed
var resizeTime = new Date(1, 1, 2000, 12,00,00);
var resizeTimeout = false;
var delta = 200;

window.addEventListener('resize', function() {
    resizeTime = new Date();
    if (resizeTimeout === false) {
        resizeTimeout = true;
        setTimeout(resizeend, delta);
    }
});

$(document).ready(function() {
  var page_title = $('#page-title').text();
  console.log(page_title);
  $('#page-title').text('').css({'visibility':'visible'});
    // Init Typed.JS on homepage banner
  $("#page-title").typed({
    strings: [page_title],
    typeSpeed: 50,
    startDelay: 300,
    showCursor: false,
  });
});
