from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# Variables to track timer state
start_time = None
elapsed_time = timedelta(0)

# Variables to track focus/unfocus data
focus_count = 0
unfocus_count = 0


@app.route('/')
def home():
    return render_template('timer.html')


@app.route('/start', methods=['POST'])
def start_timer():
    global start_time
    if start_time is None:  # Timer not already running
        start_time = datetime.now()
    return jsonify({"status": "started"})


@app.route('/stop', methods=['POST'])
def stop_timer():
    global start_time, elapsed_time, focus_count, unfocus_count
    if start_time is not None:
        elapsed_time += datetime.now() - start_time
        start_time = None

        # Simulate focus/unfocus data generation on stop
        focus_count = 5  # Example focus times
        unfocus_count = 7  # Example unfocus times

    return jsonify({"status": "stopped"})


@app.route('/reset', methods=['POST'])
def reset_timer():
    global start_time, elapsed_time, focus_count, unfocus_count
    start_time = None
    elapsed_time = timedelta(0)
    focus_count = 0
    unfocus_count = 0
    return jsonify({"status": "reset"})


@app.route('/time', methods=['GET'])
def get_time():
    global start_time, elapsed_time
    current_time = elapsed_time
    if start_time is not None:
        current_time += datetime.now() - start_time
    total_seconds = int(current_time.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    formatted_time = f"{hours:02}:{minutes:02}:{seconds:02}"
    return jsonify({"time": str(formatted_time)})


@app.route('/graph-data', methods=['GET'])
def graph_data():
    """
    Provides the focus/unfocus data for the graph.
    """
    global focus_count, unfocus_count
    return jsonify({
        "focus": focus_count,
        "unfocus": unfocus_count
    })


if __name__ == '__main__':
    app.run(debug=True)
