const btnAddTask = document.querySelector('.app__button--add-task')
const formAddTask = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')

const tasks = []

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden')
})

formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        description: textarea.value
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
})