const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

// -----------------------------------------  display/updating pending task ---------------------
const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}


// -------------------------------------------  addTask function ------------------------------------

const addTask = ()=> {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if(!taskName){
        setTimeout(() => {
            error.style.display = "block";
        }, 200);

        return;
    }
// -------------------------------------------------  task display ------------------------------------------
    const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash-can"></i>
    </button>
    </div>`;
    
    tasksContainer.insertAdjacentHTML("beforeend",task);

// ------------------------------------------------------  delete task  ------------------------------------------
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            const del = button.parentNode;
            del.classList.add("fall");
        
            del.addEventListener("transitionend",function(){
                button.parentNode.remove();
            });

           if(!del.classList.contains("fade")){  // to check if its not marked completed
            taskCount -= 1;
            displayCount(taskCount);
            }
        };
    });
// -----------------------------------------------------  edit task -----------------------------------------
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }

            newTaskInput.value = targetElement.previousElementSibling.innerText;
            targetElement.parentNode.remove();
            taskCount -=1;
            displayCount(taskCount);
        };
    });

//    ------------------------------------------  changing task count after checking ----------------------- 
    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox)=> {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            const todo = checkBox.parentElement;
            todo.classList.toggle("fade");
            if(checkBox.checked){
                taskCount-=1;
            }
            else{
                taskCount +=1;
            }
            displayCount(taskCount);
        };
    });
    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};


// ----------------------------------------  add button event listener -----------------------
addBtn.addEventListener("click",addTask);


