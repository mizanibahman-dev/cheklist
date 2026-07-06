const input = document.getElementById("habitName");
const button = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

document.getElementById("todayDate").innerHTML =
new Date().toLocaleDateString("fa-IR");

button.onclick = function () {

    const name = input.value.trim();

    if (name === "") return;

    addHabit(name);

    input.value = "";

    render();

};

function render() {

    const habits = loadHabits();

    list.innerHTML = "";

    habits.forEach(habit => {

        const percent = getSuccessPercent(habit);

        let color = "#e74c3c";

        if (percent >= 80) color = "#2ecc71";
        else if (percent >= 50) color = "#f39c12";

        list.innerHTML += `

<div class="card">

<div class="row">

<div class="title">

${habit.name}

</div>

<div class="circle"

style="background:${color};">

${percent}%

</div>

</div>

<div class="buttons">

<button

class="plus"

onclick="plus(${habit.id})">

➕

</button>

<button

class="minus"

onclick="minus(${habit.id})">

➖

</button>

</div>

<div style="margin-top:10px">

مثبت:

${habit.positive}

&nbsp;&nbsp;&nbsp;

منفی:

${habit.negative}

</div>

</div>

`;

    });

}

function plus(id){

    updateHabit(id,"positive");

    render();

}

function minus(id){

    updateHabit(id,"negative");

    render();

}

render();