const STORAGE_KEY = "moraghebeh_data_v1";

function loadHabits() {
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

function addHabit(name) {

    const habits = loadHabits();

    habits.push({

        id: Date.now(),

        name: name,

        positive: 0,

        negative: 0,

        history: {}

    });

    saveHabits(habits);

}

function updateHabit(id, type) {

    const habits = loadHabits();

    const today = new Date().toLocaleDateString("fa-IR");

    habits.forEach(h => {

        if (h.id === id) {

            if (!h.history[today]) {

                h.history[today] = {

                    positive: 0,

                    negative: 0

                };

            }

            if (type === "positive") {

                h.positive++;

                h.history[today].positive++;

            } else {

                h.negative++;

                h.history[today].negative++;

            }

        }

    });

    saveHabits(habits);

}

function getSuccessPercent(habit) {

    const total = habit.positive + habit.negative;

    if (total === 0) return 0;

    return Math.round((habit.positive / total) * 100);

}