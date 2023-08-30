let tasks = [];
const taskList = document.getElementById('list');   // this if for ul tag
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const completedCounter = document.getElementById('tasks-completed-counter');
var completeTaskCount = 0;
const incompleteCounter = document.getElementById('task-incomplete-counter')
// console.log(tasks);

function addTaskToDOM(task){
    const li = document.createElement('li');     // this will create a new li tag in html
    li.innerHTML=`<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
     <label for="${task.id}">${task.text}</label> <img src="bin.png" class="delete" data-id="${task.id} " id="${task.id}" alt="image"/>`;
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';     //initially the current list will be empty

    for(let i=0; i<tasks.length; i++)
    {
        addTaskToDOM(tasks[i]);
    }
    incompleteCounter.innerHTML = tasks.length - completeTaskCount;
    console.log(incompleteCounter.innerHTML)
    tasksCounter.innerHTML = tasks.length;
}

function toogleTask (taskId) {
    tasks.filter(function (task){
        if(task.id == taskId)
        {
            if(task.done == false)
            {
                task.done = true;
                completeTaskCount = completeTaskCount + 1;
                completedCounter.innerHTML = completeTaskCount;
            }
            else
            {
                task.done = false;
                completeTaskCount = completeTaskCount - 1;
                completedCounter.innerHTML = completeTaskCount;
            }
        }
    })
    renderList();
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function (task){  //this will traverse task array and filter out the target task and copy rest of task to this new array
        return task.id !== taskId;
    })

    tasks= newTasks;    //copying back the tasks to original array from the new array to display after delete
    alert('task deleted successfully');
    renderList();
}

function addTask (task) {
    tasks.push(task);
    renderList();
    // console.log(tasks);
}

function showNotification(text) {}

function handleInputKeyPress(letter){
    if(letter.key == 'Enter'){  // to check if user presses enter . if user presses enter then it will store the value of text from inputbox
        const text= letter.target.value;
        if(!text){
            alert('A task cannot be empty, please input atleast 1 letter');
            return;
        }

        // if valid data is entered then we need to create an object of the task which contains detail about the task
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        addTask(task);  // passing task object to addTask function where it will be stored
    }
}

function handleClickListener(eventPress){
    const target= eventPress.target;
    if(target.className == 'delete'){
        const taskId= target.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className == 'custom-checkbox'){
        const taskId= target.id;
        toogleTask(taskId);
        return;
    }
}

function initializeApp(){
addTaskInput.addEventListener('keyup', handleInputKeyPress);
document.addEventListener('click', handleClickListener);
}

initializeApp();