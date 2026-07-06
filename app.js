const list = document.getElementById("habitList");

const input = document.getElementById("habitName");

const addBtn = document.getElementById("addHabitBtn");

const today = new Date();

document.getElementById("todayDate").innerHTML =
today.toLocaleDateString("fa-IR");

addBtn.onclick = () => {

    const name = input.value.trim();

    if (name == "") return;

    createHabit(name);

    input.value = "";

    render();

}

function render() {

    list.innerHTML = "";

    const habits = getHabits();

    habits.forEach(habit => {

        let positive = 0;

        let negative = 0;

        Object.values(habit.history).forEach(day => {

            positive += day.positive;

            negative += day.negative;

        });

        let percent = getPercent(habit);

        let color = "#e74c3c";

        if (percent >= 80) color = "#2ecc71";
        else if (percent >= 50) color = "#f39c12";

        list.innerHTML += `

<div class="card">

<div class="topRow">

<div class="habitTitle">

${habit.name}

</div>

<div
class="percentCircle"
style="background:${color};">

${percent}%

</div>

</div>

<div class="counterRow">

<div>

✅ ${positive}

</div>

<div>

❌ ${negative}

</div>

</div>

<div class="buttons">

<button
class="plus"
onclick="plus(${habit.id})">

＋

</button>

<button
class="minus"
onclick="minus(${habit.id})">

－

</button>

</div>

</div>

`;

    });

}

function plus(id){

    addResult(id,true);

    render();

}

function minus(id){

    addResult(id,false);

    render();

}

render();