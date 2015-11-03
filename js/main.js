var canvasClass = function(){
    var self = this;

    //globals
    var width = window.innerWidth;
    var height = window.innerHeight;

    var centerX = width / 2;
    var centerY = height / 2;

    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext('2d');

    var mouseX, mouseY, mouseDown;

    var shapeRotation = 0;
    var shapeOscillation = 0;

    this.sides = 3;
    this.radius = 10;
    this.useStroke = true;
    this.strokeColor = "#000000";
    this.strokeThickness = 1;
    this.useFill = true;
    this.fillColor = "#000000";
    this.autoIncrementRotate = true;
    this.oscillateSize = true;
    this.oscillateMin = 1;
    this.oscillateMax = 10;

    function init(){
        registerEvents();
        setCanvasSize();
        render();
    }

    function drawShape(numberOfPoints, radius){
        if(self.autoIncrementRotate){
            shapeRotation++;
            var rotateIncreament = shapeRotation;
        }

        if(self.oscillateSize){
            shapeOscillation++;
            radius =  ((self.oscillateMax - self.oscillateMin) / 2) * (1 - Math.cos(shapeOscillation * 0.1)) + self.oscillateMin;
        }

        var offset = 180 * (numberOfPoints - 2) / (2 * numberOfPoints) + rotateIncreament;
        var offsetRad = offset / 180 * Math.PI;

        ctx.strokeStyle = self.strokeColor;
        ctx.fillStyle = self.fillColor;

        ctx.save();
        ctx.translate(mouseX, mouseY);
        ctx.rotate(offsetRad);
        ctx.lineWidth = self.strokeThickness;

        ctx.beginPath();
        ctx.moveTo (radius * Math.cos(0),radius *  Math.sin(0));  
        for (var i = 1; i <= numberOfPoints; i++) {
            ctx.lineTo (radius * Math.cos(i * 2 * Math.PI / numberOfPoints),radius * Math.sin(i * 2 * Math.PI / numberOfPoints));
        }

        if(self.useFill){
            ctx.fill();
        }
        if(self.useStroke){
            ctx.stroke();
        }
        ctx.restore();
    }

    function registerEvents(){
        window.addEventListener("resize", function(){
            resize();
        });
        window.addEventListener("mousedown", function(e){
            updateMouseCoords(e);
            if(e.target.id === "canvas"){
                mouseDown = true;
            }
        });
        window.addEventListener("mouseup", function(){
            mouseDown = false;
        });
        window.addEventListener("mousemove", function(e){
            updateMouseCoords(e);
        });
    }

    function updateMouseCoords(e){
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }

    function resize(){
        console.log("r");
        setCanvasSize();
    }

    function setCanvasSize(){
        width = window.innerWidth;
        height = window.innerHeight;

        centerX = width / 2;
        centerY = height / 2

        ctx.canvas.width = width;
        ctx.canvas.height = height;
    }

    function render(){
      requestAnimationFrame(render);

      if(mouseDown){
        drawShape(self.sides, self.radius);
      }
    }
    init();
};


var canvasClass = new canvasClass();
var gui = new dat.GUI();
gui.add(canvasClass, 'radius', 10, 100).step(1);
gui.add(canvasClass, 'sides', 3, 32).step(1);
gui.add(canvasClass, 'useStroke');
gui.addColor(canvasClass, 'strokeColor');
gui.add(canvasClass, 'strokeThickness', 1, 10).step(1);
gui.add(canvasClass, 'useFill');
gui.addColor(canvasClass, 'fillColor');
gui.add(canvasClass, 'autoIncrementRotate');
gui.add(canvasClass, 'oscillateSize');
gui.add(canvasClass, 'oscillateMin');
gui.add(canvasClass, 'oscillateMax');
