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

input.addEventListener("keypress", function(e){

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

        node.querySelector(".done").checked=item.completed;

        if(item.completed){

            node.querySelector(".item").classList.add("completed");

        }

        listContainer.appendChild(node);

    });

}

render();