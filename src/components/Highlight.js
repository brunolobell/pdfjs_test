import { v1 } from 'uuid';

export const Highlight = ({ pageNumber, color = 'yellow' }) => {
  // Get a selection
  const textSelected = window.getSelection();
  const getRange = textSelected.getRangeAt(0);
  //Get the text position on screen 
  const getRect = getRange.getBoundingClientRect().toJSON();
  console.log(getRect);
  
  const newHighlight = {
    id: v1(),
    content: {
      text: textSelected.toString()
    },
    position: {
      x1: getRect.x,
      y1: getRect.y,
      x2: getRect.right,
      y2: getRect.bottom
    },
    color: color,
    pageNumber: pageNumber
  }

  console.log(newHighlight);

  return newHighlight
}