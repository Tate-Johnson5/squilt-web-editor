// Toolbox content selectors


// Get toolbox data
function fetch_toolbox(callback=toolbox_add_categories) {
    const toolbox_data_url = "/workspace/toolbox.json";

    try {
        fetch(toolbox_data_url).then(response => {
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

// Collapsable toolbox categories
function make_toolbox_categories_collapsable() {
    var collapsables = document.getElementsByClassName("toolbox-code-category-header");
    var i;
    
    for (i = 0; i < collapsables.length; i++) {
        collapsables[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                this.style["font-weight"] = "normal"
                content.style.display = "none";
            } else {
                this.style["font-weight"] = "bold"
                content.style.display = "block";   
            }
        });
    }   
}

function toolbox_add_categories(toolbox_json) {
    const toolbox = document.getElementById("toolbox-code-container");
    
    let categories = toolbox_json["categories"];

    for (i in categories) {
        let category_dict = categories[i];

        // Create div to store each category
        let category_div = document.createElement("div");
        category_div.id = `toolbox-code-category-${category_dict["id"]}`;
        category_div.style = `border-color: #${category_dict["color"]};`;
        category_div.classList.add("toolbox-code-category");

        // Create header for category
        let category_header = document.createElement("p");
        category_header.innerText = category_dict["title"];
        category_header.classList.add("toolbox-code-category-header","noselect");
        category_div.appendChild(category_header);

        // Create container for code elements
        let category_content = document.createElement("div");
        category_content.classList.add("toolbox-code-category-content");
        

        // Create each code element
        let code_items = category_dict["items"];
        for (i in code_items) {
            let code_item = code_items[i]
            let code_element = document.createElement("p");
            code_element.id = `code-element-${i}`;
            code_element.classList.add("toolbox-insert-code");

            // Add text input to element if necessary
            /*if (code_item.variables) {
                code_element.innerText = code_item["title"];

                for (i in code_item.variables) {
                    console.log("plug   ")
                    let variable_input = document.createElement("input");
                    variable_input.value = code_item.variables[i];
                    variable_input.name = i;
                    code_element.appendChild(variable_input)
                }
            } else {
                code_element.innerText = code_item["title"];
            }*/
            
            code_element.innerText = code_item["title"];

            // Add function to insert code
            code_element.addEventListener("click", () => {
                const my_code = code_item["code"];
                insert_code(my_code);
            })

            // Add element to container
            category_content.appendChild(code_element)
        }

        // Append content to container
        category_div.appendChild(category_content);
        // Append container
        toolbox.appendChild(category_div);
    }

    // then make them collapse
    make_toolbox_categories_collapsable();
}

// Insert toolbox categories 
export function load_toolbox() {
    fetch_toolbox();
}