import { v1 } from 'uuid';

export const Highlight = (pageNumber, getRect, color = 'yellow') => {
  // Create a newHighlight
  const newHighlight = {
    id: v1(),
    content: {
      // Get the text selected
      text: window.getSelection().toString()
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

  return newHighlight
}