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

    renderTasks();
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
        const content = document.createElement("div");
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

        content.classList.add("taskContent");
        actionsBtns.classList.add("actionButtons");
        editButton.classList.add("editBtn");
        remove.classList.add("deleteBtn");

        content.innerHTML = `<input type="text" value"${task.content}" readonly>`;
        editButton.innerHTML = "Edit";
        remove.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actionsBtns.appendChild(editButton);
        actionsBtns.appendChild(remove);
        taskItem.appendChild(label);
        taskItem.appendChild(content);
        taskItem.appendChild(actionsBtns);
        
        taskList.appendChild(taskItem);

    })
}