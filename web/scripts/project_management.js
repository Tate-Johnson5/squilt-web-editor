import { load_actor_code, save_actor_code, upload_project_json } from "/scripts/project/project_code.js"
import { load_actors } from "/scripts/project/actors.js"

// fetch and parse project data 
export function fetch_project_data(project_path, callback) {
    try {
        fetch(project_path).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            // Process the JSON data
            const json = data;
            callback(json);
        }).catch(error => {
            // Handle errors
            console.error("Error fetching data:", error);
        });
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}

export function init_project(project_json) {
    document.title = `${project_json.name} - Squilt, Editor`;
    load_actor_code(project_json["selected-actor"], project_json);
    load_actors(project_json);
}