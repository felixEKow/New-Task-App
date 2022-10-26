window.addEventListener("load",() => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
})