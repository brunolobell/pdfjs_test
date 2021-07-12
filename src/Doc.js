import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function MyDocument({ doc, loading }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileURL, setURL] = useState(null);

  useEffect(() => {
    if (!loading) {
      console.log(doc);
      setURL(doc)
    }
  }, [loading]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{textAlign: 'center', alignItems: 'center'}}>
      {console.log(loading)}
      {!loading && <>
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
      <Document
        options={{
          cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }}
        file={fileURL}
        onLoadSuccess={onDocumentLoadSuccess}
        style={{display: 'inline', textAlign: 'center', alignItems: 'center'}}
      >
        <Page pageNumber={pageNumber}/>
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
      </>}
    </div>
  );
}