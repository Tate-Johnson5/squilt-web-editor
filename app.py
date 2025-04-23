from flask import Flask, Response, request
import json
from os.path import exists as file_exists

app = Flask(__name__)

"""
should prolly make this file prettier in the future xD
"""

# Editor
@app.route("/")
def index_page():
    with open("web/pages/index.html", "r") as f:
        page = f.read()
    return page

# Workspace
@app.route("/workspace/toolbox.json")
def toolbox_workspace():
    with open("web/workspace/toolbox.json", "r") as f:
        page = f.read()
    # condense json
    page_dict = json.loads(page)
    condensed_page = json.dumps(page_dict)

    status_code = 200
    headers = {'Content-Type': 'text/json'}
    return condensed_page, status_code, headers

# Scripts
@app.route("/scripts/<file>", methods = ['GET'])
def scripts(file):
    if not file_exists(f"web/scripts/{file}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"web/scripts/{file}", "r") as f:
        page = f.read()
    status_code = 200
    headers = {'Content-Type': 'text/javascript'}
    return page, status_code, headers

@app.route("/scripts/workspace/<file>", methods = ['GET'])
def workspace_scripts(file):
    if not file_exists(f"web/scripts/workspace/{file}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"web/scripts/workspace/{file}", "r") as f:
        page = f.read()
    status_code = 200
    headers = {'Content-Type': 'text/javascript'}
    return page, status_code, headers

@app.route("/scripts/project/<file>", methods = ['GET'])
def project_scripts(file):
    if not file_exists(f"web/scripts/project/{file}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"web/scripts/project/{file}", "r") as f:
        page = f.read()
    status_code = 200
    headers = {'Content-Type': 'text/javascript'}
    return page, status_code, headers

@app.route("/scripts/code/<file>", methods = ['GET'])
def code_scripts(file):
    if not file_exists(f"web/scripts/code/{file}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"web/scripts/code/{file}", "r") as f:
        page = f.read()
    status_code = 200
    headers = {'Content-Type': 'text/javascript'}
    return page, status_code, headers

# Python scripts
@app.route("/lib/<file>", methods = ['GET'])
def base_python_script(file):
    if not file_exists(f"web/lib/{file}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"web/lib/{file}", "r") as f:
        page = f.read()
    status_code = 200
    headers = {'Content-Type': 'text/javascript'}
    return page, status_code, headers

# Stylesheets
@app.route("/styles/<file>")
def stylesheet(file):
    if not file_exists(f"web/styles/{file}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"web/styles/{file}", "r") as f:
        page = f.read()
    status_code = 200
    headers = {'Content-Type': 'text/css'}
    return page, status_code, headers

# Get project data
@app.route("/project-data", methods = ['GET'])
def send_project_data():
    with open("project/project-data.json", "r") as f:
        page = f.read()
    # condense json
    page_dict = json.loads(page)
    condensed_page = json.dumps(page_dict)

    status_code = 200
    headers = {'Content-Type': 'text/json'}
    return condensed_page, status_code, headers

# Save project data
@app.route("/project-data", methods = ['PUT'])
def update_project_data():
    project_json = json.dumps(request.json)
    with open("project/project-data.json", "w") as f:
        f.write(project_json)

    print("Saved code")

    status_code = 201
    headers = {'Content-Type': 'text/json'}
    response = "{'updated': true}"
    return response, status_code, headers

@app.route("/project/<actor>/<costume>")
def project_asset(actor, costume):
    if not file_exists(f"project/{actor}/{costume}"):
        status_code = 404
        return "Script not found", status_code
    with open(f"project/{actor}/{costume}", "rb") as f:
        img = f.read()
    return img

print("Server running")