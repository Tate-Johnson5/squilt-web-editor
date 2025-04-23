import { load_workspace } from "/scripts/workspace_management.js"
import { fetch_project_data, init_project } from "/scripts/project_management.js"
import { save_actor_code, upload_project_json } from "/scripts/project/project_code.js"
import { get_base_script, get_exec_script, run_project } from "/scripts/code_management.js"

var project_json;
var seleted_actor = "main";
var queue_code_update = false;
const PROJECT_PATH = "/project-data";
var base_script;
var exec_script;

// save to project json when code typed (prolly change this later xd)


editor.session.on('change', function(delta) {
    queue_code_update = true;
});

function save() {
    project_json["selected-actor"] = seleted_actor
    save_actor_code(seleted_actor, project_json);
    queue_code_update = false;
    upload_project_json(project_json, PROJECT_PATH);
    console.log("Uploaded code")
}

// main script
function main() {

    // Load project data and update project
    fetch_project_data(PROJECT_PATH, (data)=>{
        project_json = data;
        seleted_actor = project_json["selected-actor"];
        init_project(project_json);
    });

    load_workspace();

    // Save code every 10 seconds
    const save_interval = setInterval(()=>{
        if (queue_code_update) {
            save_actor_code(seleted_actor, project_json);
            queue_code_update = false;
        } else {
            
        }
    }, 10000);

    // Save and upload code button
    const save_button = document.getElementById("save-button")
    save_button.addEventListener("click", ()=>{
        save();
    })

    // Load button
    const load_button = document.getElementById("load-button")
    load_button.addEventListener("click", ()=>{
        fetch_project_data(PROJECT_PATH, (data)=>{
            project_json = data;
            init_project(project_json);
        });
    })

    // Add saving keybind
    editor.commands.addCommand({
        name: 'save',
        bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
        exec: function(editor) {
            save()
        },
        readOnly: true, // false if this command should not apply in readOnly mode
        // multiSelectAction: "forEach", optional way to control behavior with multiple cursors
        // scrollIntoView: "cursor", control how cursor is scolled into view after the command
    });

    // get scripts
    get_base_script((data)=>{base_script = data});
    get_exec_script((data)=>{exec_script = data});

    // bind run button
    const run_button = document.getElementById("run-button");
    run_button.addEventListener("click", ()=>{
        save_actor_code(seleted_actor, project_json);
        queue_code_update = false;
        run_project(base_script, project_json, exec_script);
    })
}

main()