const STORAGE_KEY = "moraghebeh_v1";

function getHabits() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];

}

function saveHabits(habits) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(habits)
    );

}

function createHabit(name) {

    const habits = getHabits();

    habits.push({

        id: Date.now(),

        name: name,

        history: {}

    });

    saveHabits(habits);

}

function addResult(id, positive) {

    const habits = getHabits();

    const today = new Date().toLocaleDateString("fa-IR");

    habits.forEach(habit => {

        if (habit.id == id) {

            if (!habit.history[today]) {

                habit.history[today] = {

                    positive: 0,

                    negative: 0

                };

            }

            if (positive) {

                habit.history[today].positive++;

            } else {

                habit.history[today].negative++;

            }

        }

    });

    saveHabits(habits);

}

function getPercent(habit) {

    let positive = 0;

    let negative = 0;

    Object.values(habit.history).forEach(day => {

        positive += day.positive;

        negative += day.negative;

    });

    const total = positive + negative;

    if (total == 0) return 0;

    return Math.round((positive / total) * 100);

}