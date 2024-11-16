// Javascript file 
let timerInterval;

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
        .then(() => {
            clearInterval(timerInterval);
            timerInterval = null;
        });
}

function resetTimer() {
    fetch('/reset', { method: 'POST' })
        .then(() => {
            clearInterval(timerInterval);
            timerInterval = null;
            updateTime();
        });
}

$(document).ready(function () {
    $(".switch").on("click", function () {
        console.log("Switch clicked"); // Check if this logs

        $(".toggle-btn").toggleClass("active");

        if ($(".toggle-btn").hasClass("active")) {
            $("body").css("background-color", "#71b7d3"); // Unfocused
        } else {
            $("body").css("background-color", "#f0f4f8"); // Focused
        }
    });
});

  