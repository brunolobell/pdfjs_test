import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import ShowHighlights from './components/ShowHighlights';
import { Highlight } from './components/Highlight';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class MyDocument extends Component {
  state = {
    numPages: 0,
    pageNumber: 1,
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

  addHighligh = (e) => {
    console.log("CX: ", e);
    this.setState({highlights: [...this.state.highlights, Highlight(this.state.pageNumber)]})
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({numPages: numPages});
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
        <Document
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
          }}
          file={this.state.fileURL}
          onLoadSuccess={this.onDocumentLoadSuccess}
          //style={{display: 'inline', textAlign: 'center', alignItems: 'center'}}
        >
          <ShowHighlights highlights={this.state.highlights}/>
          <center>
            <Page 
              pageNumber={this.state.pageNumber}
              onMouseUp={e => window.getSelection().toString() !== '' ? this.addHighligh(e) : null}
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