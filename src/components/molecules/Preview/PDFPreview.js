import './Preview.scss'
import React, { useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();
export default function PDFPreview() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className='preview-pdf'>
            <Document onLoadSuccess={onDocumentLoadSuccess} file={`https://locnguyen2k2-portfolio.vercel.app/static/media/${process.env.REACT_APP_RESUME_FILENAME}.pdf`}>
                <Page renderTextLayer
                    renderAnnotationLayer width={830} pageNumber={pageNumber} />
            </Document>
            <div className="pdf-toolbar">
                <button
                    className="pdf-btn"
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                >
                    ← Previous
                </button>

                <div className="pdf-page-info">
                    <span className="label">Page</span>
                    <span className="current">{pageNumber}</span>
                    <span className="divider">/</span>
                    <span>{numPages}</span>
                </div>

                <button
                    className="pdf-btn"
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                >
                    Next →
                </button>
            </div>
        </div>
    )
}