const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const paragraphDescriptionTask = document.querySelector('.app__section-active-task-description');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskSelected = null;
let liTaskSelected = null;

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `;
    const paragraph = document.createElement('p');
    paragraph.textContent = task.description;
    paragraph.classList.add('app__section-task-list-item-description');

    const button = document.createElement('button');
    button.classList.add('app_button-edit');

    button.onclick = () => {
        debugger
        const newDescription = prompt("Qual é o novo nome da tarefa?");
        console.log('Nova descrição da tarefa: ', newDescription);
        if (newDescription) {
            paragraph.textContent = newDescription;
            task.description = newDescription;
            updateTasks();
        }
    };

    const buttonImage = document.createElement('img');
    buttonImage.setAttribute('src', '/images/edit.png');
    button.append(buttonImage);

    li.append(svg);
    li.append(paragraph);
    li.append(button);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(element => {
                element.classList.remove('app__section-task-list-item-active');
            });

        if (taskSelected == task) {
            paragraphDescriptionTask.textContent = '';
            taskSelected = null;
            liTaskSelected = null;
            return
        };

        taskSelected = task;
        liTaskSelected = li;
        paragraphDescriptionTask.textContent = task.description;

        li.classList.add('app__section-task-list-item-active');
    }

    return li;
};

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        description: textarea.value
    };
    tasks.push(task);
    const taskElement = createTaskElement(task);
    ulTasks.append(taskElement);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTasks();
    textarea.value = '';
    formAddTask.classList.add('hidden');
});

tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    ulTasks.append(taskElement);
});

document.addEventListener('FocoFinalizado', () => {
    if (taskSelected && liTaskSelected) {
        liTaskSelected.classList.remove('app__section-task-list-item-active');
        liTaskSelected.classList.add('app__section-task-list-item-complete');
        liTaskSelected.querySelector('button').setAttribute('disabled', 'disabled')
    };
});
