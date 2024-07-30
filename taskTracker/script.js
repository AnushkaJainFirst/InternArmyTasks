document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value;
        const category = categoryInput.value;
        addTask(taskText, category);
        taskInput.value = '';
    });

    function addTask(taskText, category) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskContent = document.createElement('span');
        taskContent.textContent = `${category}: ${taskText}`;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '✓';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            taskDiv.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '✗';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            taskList.removeChild(taskDiv);
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        taskDiv.appendChild(taskContent);
        taskDiv.appendChild(buttonContainer);
        taskList.appendChild(taskDiv);
    }
});
