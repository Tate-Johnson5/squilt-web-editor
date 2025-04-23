function create_actor_start_function(actor_name) {
    return `${actor_name}.on_start()`
}

function create_actor_loop_function(actor_name) {
    return `    ${actor_name}.loop()`
}

export function compile_actor(actor_name, project_json) {
    let actor_class_name = `${actor_name}_SQUILT_CLASS`
    let actor = project_json["actors"][actor_name]
    let decoded_actor_code = atob(actor["code"])
    let actor_code_prefix = `class ${actor_class_name}(Actor):\n`
    let actor_code_suffix = `${actor_name} = ${actor_class_name}()`

    // add tab to each line
    let split_code = decoded_actor_code.split("\n")
    let tabbed_code_list = [actor_code_prefix]
    let line
    for (line in split_code) {
        tabbed_code_list.push("    " + split_code[line])
    }

    tabbed_code_list.push(actor_code_suffix)

    // turn back into string
    let tabbed_code = tabbed_code_list.join("\n");
    console.log(tabbed_code);
    let actor_start_function = create_actor_start_function(actor_name);
    let actor_loop_function = create_actor_loop_function(actor_name);
    return [tabbed_code, actor_start_function, actor_loop_function];
}