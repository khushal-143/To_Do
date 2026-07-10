const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addTaskBtn");
const taskList=document.getElementById("taskList");
const searchInput=document.getElementById("searchInput");
const filterSelect=document.getElementById("filterSelect");
const toast=document.getElementById("toast");
const themeToggle=document.getElementById("themeToggle");

const totalTasks=document.getElementById("totalTasks");
const completedTasks=document.getElementById("completedTasks");
const pendingTasks=document.getElementById("pendingTasks");
const progressFill=document.getElementById("progressFill");
const progressText=document.getElementById("progressText");
const emptyState=document.getElementById("emptyState");

let tasks=JSON.parse(localStorage.getItem("todoTasks"))||[];
let editingId=null;

function save(){
    localStorage.setItem("todoTasks",JSON.stringify(tasks));
}

function showToast(msg){
    toast.textContent=msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2000);
}

function updateStats(){
    const total=tasks.length;
    const completed=tasks.filter(t=>t.completed).length;
    const pending=total-completed;

    totalTasks.textContent=total;
    completedTasks.textContent=completed;
    pendingTasks.textContent=pending;

    const percent=total?Math.round((completed/total)*100):0;
    progressFill.style.width=percent+"%";
    progressText.textContent=percent+"%";

    emptyState.style.display=total?"none":"block";
}

function render(){
    taskList.innerHTML="";
    let list=[...tasks];

    const q=searchInput.value.toLowerCase();
    if(q){
        list=list.filter(t=>t.title.toLowerCase().includes(q));
    }

    if(filterSelect.value==="active"){
        list=list.filter(t=>!t.completed);
    }else if(filterSelect.value==="completed"){
        list=list.filter(t=>t.completed);
    }

    list.forEach(task=>{
        const li=document.createElement("li");
        li.className="task"+(task.completed?" completed":"");
        li.innerHTML=`
            <span class="title">${task.title}</span>
            <div class="actions">
                <button class="done">✔</button>
                <button class="edit">✏</button>
                <button class="delete">🗑</button>
            </div>
        `;
        li.dataset.id=task.id;
        taskList.appendChild(li);
    });

    updateStats();
}

function addTask(){
    const title=taskInput.value.trim();
    if(!title){
        showToast("Enter a task");
        return;
    }

    if(editingId){
        const task=tasks.find(t=>t.id===editingId);
        task.title=title;
        editingId=null;
        addBtn.innerHTML='<i class="fa-solid fa-plus"></i>';
        showToast("Task Updated");
    }else{
        tasks.unshift({
            id:Date.now(),
            title,
            completed:false
        });
        showToast("Task Added");
    }

    taskInput.value="";
    save();
    render();
}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keydown",e=>{
    if(e.key==="Enter") addTask();
});

taskList.addEventListener("click",e=>{
    const li=e.target.closest(".task");
    if(!li) return;
    const id=Number(li.dataset.id);
    const task=tasks.find(t=>t.id===id);

    if(e.target.classList.contains("done")){
        task.completed=!task.completed;
        showToast(task.completed?"Completed":"Marked Active");
    }

    if(e.target.classList.contains("edit")){
        editingId=id;
        taskInput.value=task.title;
        taskInput.focus();
        addBtn.textContent="Update";
    }

    if(e.target.classList.contains("delete")){
        tasks=tasks.filter(t=>t.id!==id);
        showToast("Task Deleted");
    }

    save();
    render();
});

searchInput.addEventListener("input",render);
filterSelect.addEventListener("change",render);

const savedTheme=localStorage.getItem("todoTheme");
if(savedTheme==="light"){
    document.body.classList.add("light");
    themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click",()=>{
    document.body.classList.toggle("light");
    const light=document.body.classList.contains("light");
    localStorage.setItem("todoTheme",light?"light":"dark");
    themeToggle.innerHTML=light?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
});

render();
