# Python Portfolio Website

A clean, modern portfolio website built with Flask, inspired by the design shown in the provided document. This portfolio website is perfect for designers, data analysts, product managers, and developers to showcase their projects and skills.

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- Modular project structure with Flask and Jinja templates
- Data-driven content management using JSON
- Project showcase with metrics and detailed project pages
- Skills, achievements, and education sections
- Clean and modern UI with custom styling

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - On Windows:
   ```bash
   venv\Scripts\activate
   ```
   - On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Customize the portfolio data:
   - Edit the `static/data/portfolio.json` file with your personal information, projects, skills, and achievements
   - Replace images in the `static/img/` directory with your own photos

6. Run the application:
```bash
python run.py
```

7. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
portfolio-website/
│
├── app.py                         # Main Flask application
├── requirements.txt               # Python dependencies
│
├── static/                        # Static files
│   ├── css/
│   │   └── style.css              # Custom CSS
│   ├── js/
│   │   └── script.js              # JavaScript file (if needed)
│   ├── img/                       # Images directory
│   │   ├── profile.jpg            # Profile picture
│   │   ├── nexus-ai.jpg           # Project images
│   │   ├── huskyshare.jpg
│   │   ├── premier-league.jpg
│   │   └── unicircle.jpg
│   │
│   └── data/                      # Data files
│       └── portfolio.json         # Portfolio data in JSON format
│
├── templates/                     # HTML templates
│   ├── base.html                  # Base template (layout)
│   ├── index.html                 # Home page
│   ├── projects.html              # Projects listing
│   ├── project_detail.html        # Individual project page
│   ├── skills.html                # Skills page
│   ├── achievements.html          # Achievements page
│   ├── education.html             # Education page
│   └── resume.html                # Resume page
│
└── README.md                      # Project documentation
```

## Customization

### Personal Information

Edit the `personal_info` section in `static/data/portfolio.json`:

```json
"personal_info": {
  "name": "Your Name",
  "headline": "Product Designer & Data Analyst",
  "bio": "Your short bio...",
  "description": "Longer description...",
  "image_path": "/static/img/profile.jpg"
}
```

### Projects

Add or edit projects in the `projects` array in `static/data/portfolio.json`:

```json
{
  "id": "project-id",
  "title": "Project Title",
  "description": "Project description...",
  "image_path": "/static/img/project-image.jpg",
  "metrics": [
    {"name": "Metric Name", "value": "Metric Value"},
    {"name": "Another Metric", "value": "Value"}
  ],
  "details": "Full project details..."
}
```

### Skills

Edit the `skills` section in `static/data/portfolio.json` with your own skills:

```json
"skills": {
  "analysis": ["Skill 1", "Skill 2", "Skill 3"],
  "data_analytics": ["Skill 4", "Skill 5", "Skill 6"],
  "technical": ["Skill 7", "Skill 8", "Skill 9"]
}
```

## Deployment

### Deploying to Heroku

1. Create a `Procfile` in the root directory:
```
web: gunicorn app:app
```

2. Make sure `gunicorn` is in your `requirements.txt` file.

3. Create a Heroku app and deploy:
```bash
heroku create your-portfolio-name
git push heroku main
```

### Deploying to PythonAnywhere

1. Create a PythonAnywhere account
2. Upload your code via Git
3. Set up a web app with Flask
4. Configure the WSGI file to point to your app.py

### Deploying to Vercel

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Create a `vercel.json` file in the root directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.py"
    }
  ]
}
```

3. Deploy with Vercel:
```bash
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.