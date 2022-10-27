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
    })
})