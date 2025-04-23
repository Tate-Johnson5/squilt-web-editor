import { compile_actor } from "/scripts/code/compile_actor.js"

const BASE_SCRIPT_PATH = "/lib/base_script.py"
const EXEC_SCRIPT_PATH = "/lib/exec_script.py"
var project_code;

// Brython runner
const runner = new BrythonRunner({
    stdout: {
        write(content) {
            const console_output = document.getElementById("console-output");
            let br = document.createElement("br");
            let output_line = document.createElement("span");
            output_line.innerText = content;
            console_output.appendChild(br);
            console_output.appendChild(output_line);
            console.log('StdOut: ' + content);
        },
        flush() {},
    },
    stderr: {
        write(content) {
            const console_output = document.getElementById("console-output");
            let output_line = document.createElement("span");
            output_line.innerText = content;
            output_line.classList.add("console-error");
            console_output.appendChild(output_line);
            console.error('StdErr: ' + content);
        },
        flush() {},
    },
    stdin: {
        async readline() {
            const console_output = document.getElementById("console-output");
            let input_text_box = document.createElement("input");
            input_text_box.type = "text"
            var userInput = "a"
            console.log('Received StdIn: ' + userInput);
            return userInput;
        },
    }
});

export function get_base_script(callback) {
    try {
        fetch(BASE_SCRIPT_PATH).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        }).then(data => {
            callback(data);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}

export function get_exec_script(callback) {
    try {
        fetch(EXEC_SCRIPT_PATH).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        }).then(data => {
            callback(data);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}

function exec_python_code(code) {
    //return window.eval(__BRYTHON__.python_to_js(code));
    runner.runCode(code);
}

// compile project into python code for execution
function compile_project(base_script, project_json, exec_script) {
    // compile base script
    let base_script_compiled = base_script;

    project_code = base_script_compiled;

    let start_functions = [];
    let loop_functions = [];

    // add actor scripts together
    for (let actor in project_json["actors"]) {
        let [actor_code, actor_start_function, actor_loop_function] = compile_actor(actor.replace(" ", "_"), project_json);
        console.log(actor_code, actor_start_function, actor_loop_function)
        start_functions.push(actor_start_function);
        loop_functions.push(actor_loop_function);
        project_code += "\n" + actor_code;
    }
    
    let actor_start_functions = start_functions.join("\n");
    let actor_loop_functions = loop_functions.join("\n");

    // compile exec script
    let exec_script_compiled = exec_script;
    exec_script_compiled = exec_script_compiled.replace("<actor_start_functions>", actor_start_functions);
    exec_script_compiled = exec_script_compiled.replace("<actor_loop_functions>", actor_loop_functions);

    project_code += "\n" + exec_script_compiled;

    console.log(project_code)
    return project_code;
}

export function run_project(base_script, project_json, exec_script) {
    let code = compile_project(base_script, project_json, exec_script);
    console.log("Running project")
    return exec_python_code(code);
}