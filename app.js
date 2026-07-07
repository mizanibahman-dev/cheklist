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
const template = document.getElementById("itemTemplate");//=====================
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

function render(){

    listContainer.innerHTML="";

    data[currentSection].forEach(item=>{

        const node=template.content.cloneNode(true);

        node.querySelector(".text").textContent=item.text;

        const check=node.querySelector(".done");

check.checked=item.completed;

check.addEventListener("change",()=>{

    item.completed=check.checked;

    if(typeof saveData==="function"){

        saveData(data);

    }

    render();

});

        if(item.completed){

            node.querySelector(".item").classList.add("completed");

        }

        listContainer.appendChild(node);

    });

}

render();//=====================
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

});