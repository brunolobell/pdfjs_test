import React, { useEffect } from "react";

function ShowHighlights({ highlights, width, height }) {
  useEffect(() => {
    var c = document.getElementById("highlightCanvas");
    var ctx = c.getContext("2d");
    var rect = c.getBoundingClientRect();
    var scaleX = c.width / rect.width;
    var scaleY = c.height / rect.height;

    console.log(highlights);
    highlights.map(highlight => {
      var position = highlight.position;
      var x1 = (position.x1 - rect.left) * scaleX;
      var x2 = (position.x2 - rect.left) * scaleX;
      var y1 = (position.y1 - rect.top) * scaleY;
      var y2 = (position.y2 - rect.top) * scaleY;
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = highlight.color;
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    });
  }, [highlights])  
  
  return <canvas 
  id="highlightCanvas"
  className="highlights" 
  width={width} 
  height={height} 
  ></canvas>
}

export default ShowHighlights;