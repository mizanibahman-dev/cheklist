//=====================
// وضعیت برنامه
//=====================

let currentMain = "tasks";
let currentSection = "allTasks";

let data = {
    allTasks: [],
    currentTasks: [],
    todayTasks: [],
    dailyShopping: [],
    otherShopping: []
};

// اگر storage.js وجود دارد

if (typeof loadData === "function") {

    const saved = loadData();

    if (saved) data = saved;

}

//=====================
// عناصر صفحه
//=====================

const input = document.getElementById("newItem");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("listContainer");
const template = document.getElementById("itemTemplate");const clearDoneBtn = document.getElementById("clearDoneBtn");//=====================
// افزودن آیتم
//=====================

function addItem() {

    const text = input.value.trim();

    if (text === "") return;

    data[currentSection].push({

        id: Date.now(),

        text: text,

        completed: false

    });

    if (typeof saveData === "function") {

        saveData(data);

    }

    input.value = "";

    render();

}

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        addItem();

    }

});//=====================
// نمایش لیست
//=====================

//=====================
// ترتیب سربرگ ها
//=====================

const taskSections = [

    "allTasks",

    "currentTasks",

    "todayTasks"

];

const shoppingSections = [

    "dailyShopping",

    "otherShopping"

];

function getSections(){

    return currentMain==="tasks"

        ? taskSections

        : shoppingSections;

} function render(){

    listContainer.innerHTML="";

    data[currentSection].forEach((item,index)=>{

        const node=template.content.cloneNode(true);

        const card=node.querySelector(".item");

        const text=node.querySelector(".text");

        const check=node.querySelector(".done");

        const left=node.querySelector(".move-left");

        const right=node.querySelector(".move-right");

        text.textContent=item.text;

        check.checked=item.completed;

        if(item.completed){

            card.classList.add("completed");

        }

        // انجام شده

        check.addEventListener("change",()=>{

            item.completed=check.checked;

            saveData(data);

            render();

        });

        // فلش چپ

        left.addEventListener("click",()=>{

            moveItem(index,-1);

        });

        // فلش راست

        right.addEventListener("click",()=>{

            moveItem(index,1);

        });

        listContainer.appendChild(node);

    });

}//=====================
// انتقال بین سربرگ ها
//=====================

function moveItem(index,dir){

    const sections=getSections();

    const currentIndex=sections.indexOf(currentSection);

    const newIndex=currentIndex+dir;

    if(newIndex<0)return;

    if(newIndex>=sections.length)return;

    const item=data[currentSection][index];

    data[currentSection].splice(index,1);

    data[sections[newIndex]].push(item);

    saveData(data);

    currentSection=sections[newIndex];

    document.querySelectorAll(".sub-tab").forEach(btn=>{

        btn.classList.remove("active");

        if(btn.dataset.section===currentSection){

            btn.classList.add("active");

        }

    });

    render();

} //=====================
// حذف انجام شده ها
//=====================

function clearCompleted(){

    data[currentSection] = data[currentSection].filter(item => !item.completed);

    if(typeof saveData === "function"){
        saveData(data);
    }

    render();

} //=====================
// سربرگ های اصلی
//=====================

const mainTabs = document.querySelectorAll(".main-tab");
const subTabs = document.querySelectorAll(".sub-tab");

const tasksTabs = document.getElementById("tasksTabs");
const shoppingTabs = document.getElementById("shoppingTabs");

mainTabs.forEach(btn=>{

    btn.addEventListener("click",()=>{

        mainTabs.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentMain=btn.dataset.main;

        if(currentMain==="tasks"){

            tasksTabs.classList.remove("hidden");
            shoppingTabs.classList.add("hidden");

            currentSection="allTasks";

        }else{

            shoppingTabs.classList.remove("hidden");
            tasksTabs.classList.add("hidden");

            currentSection="dailyShopping";

        }

        document.querySelectorAll(".sub-tab").forEach(t=>t.classList.remove("active"));

        if(currentMain==="tasks"){

            tasksTabs.querySelector(".sub-tab").classList.add("active");

        }else{

            shoppingTabs.querySelector(".sub-tab").classList.add("active");

        }

        render();

    });

});//=====================
// زیر سربرگ ها
//=====================

subTabs.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const parent=btn.parentElement;

        parent.querySelectorAll(".sub-tab").forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentSection=btn.dataset.section;

        render();

    });

}); clearDoneBtn.addEventListener("click", clearCompleted);