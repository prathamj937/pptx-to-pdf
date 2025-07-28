import React, { useState } from 'react';
import axios from 'axios';
import './PptxConverter.css'; 

const PptxConverter = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [extractedText, setExtractedText] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtractedText([]);
    setPdfUrl('');
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) {
    setError('Please select a PPTX file');
    return;
  }

  setIsConverting(true);
  setError('');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      'http://localhost:5000/convert', // Direct Flask endpoint
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setExtractedText(response.data.extracted_text);
    setPdfUrl(`http://localhost:5000${response.data.pdf_url}`);
  } catch (err) {
    console.error('Full error:', err);
    setError(err.response?.data?.error || 
             err.message || 
             'Conversion failed. Is the backend running?');
  } finally {
    setIsConverting(false);
  }
};

  return (
    <div className="converter-container">
      <h1>PPTX to PDF Converter</h1>
      <p>Upload a PowerPoint file to convert to PDF and extract text</p>
      
      <form onSubmit={handleSubmit} className="converter-form">
        <div className="file-input-container">
          <label htmlFor="pptx-upload">Choose PPTX File:</label>
          <input 
            id="pptx-upload"
            type="file" 
            accept=".pptx" 
            onChange={handleFileChange} 
            disabled={isConverting}
          />
        </div>
        <button 
          type="submit" 
          disabled={isConverting || !file}
          className="convert-button"
        >
          {isConverting ? (
            <>
              <span className="spinner"></span>
              Converting...
            </>
          ) : (
            'Convert to PDF'
          )}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {pdfUrl && (
        <div className="result-section">
          <h2>Conversion Successful!</h2>
          <a 
            href={pdfUrl} 
            download="converted.pdf" 
            className="download-button"
          >
            Download PDF
          </a>
        </div>
      )}

      {extractedText.length > 0 && (
        <div className="text-results">
          <h2>Extracted Slide Content</h2>
          <div className="slides-container">
            {extractedText.map((slideText, index) => (
              <div key={index} className="slide-content">
                <h3>Slide {index + 1}</h3>
                <div className="slide-text">
                  {slideText.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PptxConverter;