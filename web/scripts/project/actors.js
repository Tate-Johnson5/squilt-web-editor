// Load actors and add event listeners to alter the workspace when clicked

export function load_actors(project_json) {
    let actors =  project_json["actors"];
    let actor_name;
    const actor_container = document.getElementById("actor-collection-container");
    for (actor_name in actors) {
        let actor = actors[actor_name];
        let actor_div = document.createElement("div");
        actor_div.classList.add("actor-container","actor");

        // actor thumbnail
        const actor_image = document.createElement('img');
        actor_image.classList.add("actor-image");

        // get actor costume image url
        let costume_number = actor["costume-number"];
        let costume_url = "project/My Actor/box.jpg"
        
        // set costume thumbnail
        actor_image.src = costume_url;

        // actor label
        let actor_label = document.createElement("p");
        actor_label.classList.add("actor-label");
        actor_label.innerText = actor_name;

        // add actor elements
        actor_div.appendChild(actor_image);
        actor_div.appendChild(actor_label);

        actor_container.appendChild(actor_div);
    }
}