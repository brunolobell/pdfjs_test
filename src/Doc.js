import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import ShowHighlights from './components/ShowHighlights';
import { Highlight } from './components/Highlight';
import AreaHighlight from './components/AreaHighlight';

// 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class MyDocument extends Component {
  state = {
    numPages: 0,
    pageNumber: 1,
    pageWidth: 842,
    pageHeight: 596,
    fileURL: null,
    highlights: [{
      id: 111,
      color: 'blue',
      position: {
        x1: 0,
        x2: 30,
        y1: 0,
        y2: 30
      }
    }]
  }

  // Function to add a new highlight
  addHighlight = (rectPosition = {}, area = false) => {
    if(!area){
      // Get a selection
      const textSelected = window.getSelection();
      const getRange = textSelected.getRangeAt(0);
      // Get the text position on screen 
      rectPosition = getRange.getBoundingClientRect().toJSON();
    }
    this.setState({highlights: [...this.state.highlights, Highlight(this.state.pageNumber, rectPosition)]})
  }

  // Function to take the number of pages
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({numPages: numPages});
  }

  // Function to take height and width of page
  onPageLoad = ({ height, width }) => {
    this.setState({
      pageHeight: height,
      pageWidth: width
    })
  }

  render() {
    if (!this.props.loading && this.state.fileURL === null) {
      this.setState({fileURL: this.props.doc})
    }

    return (
      <div style={{textAlign: 'center', alignItems: 'center'}}>
        {!this.props.loading && <>
        <button onClick={() => this.setState({pageNumber: this.state.pageNumber - 1})}>Prev</button>
        <button onClick={() => this.setState({pageNumber: this.state.pageNumber + 1})}>Next</button>
        {/* Component to pass a full pdf */}
        <Document
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
          }}
          file={"https://arxiv.org/pdf/2101.10281v1.pdf"}
          onLoadSuccess={this.onDocumentLoadSuccess}
          //style={{display: 'inline', textAlign: 'center', alignItems: 'center'}}
        >
          {/* Component to draw an area to new highlight */}
          <AreaHighlight 
            width={this.state.pageWidth} 
            height={this.state.pageHeight} 
            addHighlight={this.addHighlight}
            pageNumber={this.state.pageNumber}
          />
          {/* Component to draw all highlights on page */}
          <ShowHighlights 
            highlights={this.state.highlights} 
            width={this.state.pageWidth} 
            height={this.state.pageHeight}
            pageNumber={this.state.pageNumber}
          />
          <center>
            {/* Component to take a pdf page */}
            <Page 
              pageNumber={this.state.pageNumber}
              onMouseUp={event => window.getSelection().toString() !== '' ? this.addHighlight() : null}
              onLoadSuccess={this.onPageLoad}
            />
          </center>          
        </Document>
        <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
        </>}
      </div>
    );
  }
}


export default MyDocument;