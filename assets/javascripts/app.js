// Init Foundation 6
$(document).foundation();


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
        triangle.opacity = Math.random() / 0.1; //Random initial opacity
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
        return Math.floor(Math.pow(this.canvas.width * this.canvas.height / 8000, 0.55));
    }

    this.drawTriangle = function(triangle){
        //Select context
        var context = this.context;
        //Save current state
        context.save();
        // Draw a triangle

        context.globalAlpha= 0.2;
        img = document.getElementById("source-b");
        imgwidth = triangle.scale;
        imgheight = triangle.scale;
        context.drawImage(img, triangle.x, triangle.y, triangle.scale, triangle.scale);

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
        triangle.x += (Math.abs(Math.cos(this.angle)*3))/10;
        //Resetting triangles when they are out of frame
        if(triangle.y > this.canvas.height || triangle.y < 0 || triangle.x > (this.canvas.width + (triangle.scale / 2))){
            triangle.y = Math.random() * this.canvas.height;
            triangle.x =- triangle.scale;
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

$('#top-bar').find('ul.dropdown').find('.has-submenu > a').click(function(e) {
    e.preventDefault();
});

// Make input group labels equal length
function equalHeight(elem) {
  var max_height = 0;
  $(elem).each(function() {
    $(this).css({'min-height': '0px', 'padding': 0});
  });
  $(elem).each(function() {
    var height = $(this).height();
    if(height >= max_height) {
        max_height = height;
    }
  });
  $(elem).each(function() {
    $(this).css({'min-height': max_height, 'padding': 0});
  });
}
