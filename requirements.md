# 🖼️ PPTX to PDF Converter

This is a **Flask-based web application** that allows users to upload PowerPoint (`.pptx`) files, extract text from slides, and convert the extracted text into a **PDF**. The application provides a **RESTful API** with endpoints for file upload and PDF download.

---

## ✨ Features

- Upload `.pptx` files (up to **10MB**)
- Extract text from each slide
- Convert extracted text to a **PDF file**
- Download the generated PDF
- CORS support enabled for cross-origin requests

---

## 📦 Requirements

### 🐍 Python Dependencies

- `flask`: Web framework for the server
- `werkzeug`: Utility for secure file handling
- `flask-cors`: Enables CORS support
- `python-pptx`: Reads and extracts text from `.pptx` files
- `pdfkit`: Converts HTML to PDF using `wkhtmltopdf`

### ⚙️ System Dependencies

- **Python**: 3.8+
- **wkhtmltopdf**: Command-line tool for HTML-to-PDF conversion

#### 🪟 Windows:
- Download from [https://wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html)
- Install to:  
  `C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe`

#### 🐧 Linux:
```bash
sudo apt-get install wkhtmltopdf


