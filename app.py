# app.py - Main Flask application file

from flask import Flask, render_template
from flask import request
import json

app = Flask(__name__)

# Load portfolio data from a JSON file
def load_portfolio_data():
    with open('static/data/portfolio.json', 'r') as file:
        return json.load(file)

@app.route('/')
def home():
    data = load_portfolio_data()
    return render_template('index.html', data=data)

@app.route('/projects')
def projects():
    data = load_portfolio_data()
    return render_template('projects.html', projects=data['projects'], data=data)

@app.route('/project/<project_id>')
def project_detail(project_id):
    data = load_portfolio_data()
    project = next((p for p in data['projects'] if p['id'] == project_id), None)
    if project:
        return render_template('project_detail.html', project=project, data=data)
    return "Project not found", 404

@app.route('/skills')
def skills():
    data = load_portfolio_data()
    return render_template('skills.html', skills=data['skills'], data=data)

@app.route('/achievements')
def achievements():
    data = load_portfolio_data()
    return render_template('achievements.html', achievements=data['achievements'], data=data)

@app.route('/education')
def education():
    data = load_portfolio_data()
    return render_template('education.html', education=data['education'], data=data)

@app.route('/resume')
def resume():
    with open('static/data/resume.json', 'r') as file:
        data = json.load(file)
    return render_template('resume.html', data=data)

@app.context_processor
def inject_active_page():
    # request.endpoint is the name of the view function being executed
    return dict(active_page=request.endpoint)

if __name__ == '__main__':
    app.run(debug=True)