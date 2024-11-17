let timerInterval;
let chartInstance;

function updateTime() {
    fetch('/time')
        .then(response => response.json())
        .then(data => {
            document.getElementById('timer').innerText = data.time;
        });
}

function startTimer() {
    fetch('/start', { method: 'POST' })
        .then(() => {
            if (!timerInterval) {
                timerInterval = setInterval(updateTime, 1000);
            }
        });
}

function stopTimer() {
    fetch('/stop', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            clearInterval(timerInterval);
            timerInterval = null;

            // Update graph data
            if (data.data) {
                updateGraph(data.data.focused, data.data.unfocused);
            }
        });
}

function resetTimer() {
    fetch('/reset', { method: 'POST' })
        .then(() => {
            clearInterval(timerInterval);
            timerInterval = null;
            updateTime();

            // Reset graph to empty values
            updateGraph(0, 0);
        });
}

function loadGraph() {
    const ctx = document.getElementById('sessionBarGraph').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Focused', 'Unfocused'],
            datasets: [{
                label: 'Session Data',
                data: [0, 0], // Initially no data
                backgroundColor: ['#007acc', '#c3e7f7']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateGraph(focused, unfocused) {
    chartInstance.data.datasets[0].data = [focused, unfocused];
    chartInstance.update();
}

$(document).ready(function () {
    // Load the graph on page load
    loadGraph();

    $(".switch").on("click", function () {
        // Toggle the "active" class
        $(".toggle-btn").toggleClass("active");

        // Play appropriate sound based on state
        if ($(".toggle-btn").hasClass("active")) {
            $("body").css("background-color", "#71b7d3");
        } else {
            $("body").css("background-color", "#f0f4f8");
        }
    });
});
