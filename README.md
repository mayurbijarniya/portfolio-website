# Python Portfolio Website

A clean, modern portfolio website built with Flask to showcase your projects and skills using JON for data management.

## Features

* Responsive design (desktop, tablet, mobile)
* Flask + Jinja template structure
* JSON-driven content (`static/data/portfolio.json`)
* Project showcase with metrics and detail pages
* Skills, achievements, and education sections

## Local Setup & Running

1.  **Prerequisites:** Python 3.8+ and pip.
2.  **Navigate:** Open your terminal in the `portfolio-website` directory.
3.  **Create Environment:**
    ```bash
    python -m venv venv
    ```
4.  **Activate Environment:**
    * Windows: `venv\Scripts\activate`
    * macOS/Linux: `source venv/bin/activate`
5.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
6.  **Run:**
    ```bash
    python run.py
    ```
7.  **View:** Open `http://127.0.0.1:5000` (or the address shown in your terminal) in your browser.

## Customization

* **Content:** Edit `static/data/portfolio.json` to add your personal info, projects, skills, achievements, and education details.
    ```json
    // Example structure within portfolio.json -> projects array
    {
      "id": "your-project-id",
      "title": "Your Project Title",
      "description": "Short project description...",
      "image_path": "/static/img/your-project-image.jpg",
      "metrics": [
        {"name": "Key Stat", "value": "Result"}
      ],
      "details": {
          "long_description": "More details here...",
          "technologies": ["Tech 1", "Tech 2"],
          // Add other details like role, date, challenges, learnings, slideshow_images, document_pdf_path
      }
    }
    ```
* **Images:** Replace images in `static/img/` and add any project-specific files (like slideshow images or PDFs) to `static/project_files/`. Ensure the `image_path`, `slideshow_images`, and `document_pdf_path` in `portfolio.json` point to the correct locations within the `static` folder (e.g., `/static/img/my_photo.jpg`, `/static/project_files/project_name/slides/slide1.png`).

## Project Structure