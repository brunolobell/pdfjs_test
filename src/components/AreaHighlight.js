import React, { useEffect, useState } from 'react';

export default function AreaHighlight(props) {
  const [areaMode, setAreaMode] = useState(false);

  const { addHighlight, color = 'yellow', height, pageNumber, width } = props;
 
  // Get the ctrl press and set the area mode
  document.addEventListener('keydown', e => e.ctrlKey ? setAreaMode(!areaMode) : '');

  useEffect(() => {
    if (areaMode){
      var canvas = document.getElementById('AreaHighlightCanvas');
      var ctx = canvas.getContext('2d');

      var heightRatio = 1.5;
      canvas.height = canvas.width * heightRatio;

      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;

      var canvasx = (canvas.offsetLeft - rect.left) * scaleX;
      var canvasy = (canvas.offsetTop - rect.top) * scaleY;
      var last_mousex = 0;
      var last_mousey = 0;
      var mousex = 0;
      var mousey = 0;
      var mousedown = false;

      // Get mouse down position
      canvas.addEventListener('mousedown', function(e) {
        last_mousex = parseInt(((e.clientX - rect.left) * scaleX) - canvasx);
        last_mousey = parseInt(((e.clientY - rect.top) * scaleY) - canvasy);
        mousedown = true;
      }, true);

      // Get mouseup and add a new highlight
      canvas.addEventListener('mouseup', function(e) {
        mousedown = false;
        var lastX = parseInt((last_mousex / scaleX) + rect.left);
        var lastY = parseInt((last_mousey / scaleY) + rect.top);
        var mouseX = parseInt((mousex / scaleX) + rect.left);
        var mouseY = parseInt((mousey / scaleY) + rect.top);
        var position = {
          x: lastX,
          y: lastY,
          right: mouseX,
          bottom: mouseY
        }
        addHighlight(position, true);
      }, true);

      // Get a mousemove
      canvas.addEventListener('mousemove', function(e) {
        mousex = parseInt(((e.clientX - rect.left) * scaleX) - canvasx);
        mousey = parseInt(((e.clientY - rect.top) * scaleY) - canvasy);
        if(mousedown) {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          ctx.beginPath();
          var width = mousex - last_mousex;
          var height = mousey - last_mousey;
          ctx.rect(last_mousex,last_mousey,width,height);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }, true);
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  }, [areaMode])

  return <canvas
    id="AreaHighlightCanvas"
    className="highlights"
    width={width} 
    height={height}
    style={{
      zIndex: areaMode ? 3 : 1,
    }}
  ></canvas>
}