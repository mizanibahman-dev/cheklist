const STORAGE_KEY = "ChecklistAppData_v1";

const defaultData = {

    allTasks: [],

    currentTasks: [],

    todayTasks: [],

    dailyShopping: [],

    otherShopping: []

};


// خواندن اطلاعات

function loadData() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        saveData(defaultData);

        return JSON.parse(JSON.stringify(defaultData));

    }

    try {

        return JSON.parse(data);

    }

    catch (e) {

        console.log(e);

        saveData(defaultData);

        return JSON.parse(JSON.stringify(defaultData));

    }

}


// ذخیره اطلاعات

function saveData(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}


// ساخت آیتم جدید

function createItem(text) {

    return {

        id: Date.now() + "_" + Math.floor(Math.random()*10000),

        text: text,

        completed: false

    };

}


// گرفتن یک بخش

function getSection(section){

    const data = loadData();

    return data[section] || [];

}


// ذخیره یک بخش

function setSection(section,list){

    const data = loadData();

    data[section]=list;

    saveData(data);

}


// انتقال آیتم

function moveItem(from,to,id){

    const data=loadData();

    const index=data[from].findIndex(i=>i.id===id);

    if(index===-1)return;

    const item=data[from][index];

    data[from].splice(index,1);

    data[to].push(item);

    saveData(data);

}


// حذف انجام شده ها

function deleteCompleted(){

    const data=loadData();

    Object.keys(data).forEach(section=>{

        data[section]=data[section].filter(

            item=>!item.completed

        );

    });

    saveData(data);

}