export function load_actor_code(actor_name, project_json) {
    let encoded_code

    if (actor_name == "main") {
        encoded_code = project_json["main-script"]["code"];
    } else {
        encoded_code = project_json["actors"][actor_name]["code"];
    }

    let code = atob(encoded_code);
    set_editor_code_to(code);
}

export function save_actor_code(actor_name, project_json) {
    let code = get_editor_code();
    let encoded_code = btoa(code);
    
    let saved_project_json = project_json;

    if (actor_name == "main") {
        saved_project_json["main-script"]["code"] = encoded_code;
    } else {
        saved_project_json["actors"][actor_name]["code"] = encoded_code;
    }

    return saved_project_json;
}

export function upload_project_json(project_json, project_url) {
    fetch(project_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project_json)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log('Saved ' + data);
    }).catch(error => {
        console.error('Error ' + error);
    });
}