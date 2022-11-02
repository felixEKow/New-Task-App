window.addEventListener("load",() => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const nameInput = document.querySelector("#name");
    const taskForm = document.querySelector("#newTodoForm");

    const userName = localStorage.getItem("username") || "";

    nameInput.value = userName;

    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("username", e.target.value);
    })

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            timeCreated: new Date().getTime()
        }

        tasks.push(task);
        localStorage.setItem("todos", JSON.stringify(tasks))
        e.target.reset();
        renderTasks();
    })

    renderTasks();s
})


function renderTasks (){
    const taskList = document.querySelector("#taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("taskItem");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const taskContent = document.createElement("div");
        const actionsBtns = document.createElement("div");
        const editButton = document.createElement("button");
        const remove = document.createElement("button");

        input.type = "checkbox";
        input.checked = task.done;
        span.classList.add("category");

        if(task.category == "personal"){
            span.classList.add("personal");
        } else {
            span.classList.add("work")
        }

        taskContent.classList.add("taskContent");
        actionsBtns.classList.add("actionButtons");
        editButton.classList.add("editBtn");
        remove.classList.add("deleteBtn");

        taskContent.innerHTML = `<input type="text" value"${task .content}" readonly>`;
        editButton.innerHTML = "Edit";
        remove.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actionsBtns.appendChild(editButton);
        actionsBtns.appendChild(remove);
        taskItem.appendChild(label);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(actionsBtns);
        
        taskList.appendChild(taskItem);

        if(task.done){
            taskItem.classList.add("done");
        }

        input.addEventListener("click", (e) => {
            task.done = e.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            if(task.done){
                taskItem.classList.add("done");
            } else{
                taskItem.classList.remove("done")
            }

            renderTasks();
        })

        editButton.addEventListener("click", (e) => {
            const input = content.querySelector("input");
            input.setAttribute("readonly");
            input.focus();
            input.addEventListener("blur", (e) => {
                input.removeAttribute("readonly", true);
                task.content = e.target.value;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            })

            remove.addEventListener("click", (e) => {
                tasks = tasks.filter((t) => t != task);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            })
        })
    })
}