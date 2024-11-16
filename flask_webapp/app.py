from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# Variables to track timer state
start_time = None
elapsed_time = timedelta(0)

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
    global start_time, elapsed_time
    if start_time is not None:
        elapsed_time += datetime.now() - start_time
        start_time = None
    return jsonify({"status": "stopped"})

@app.route('/reset', methods=['POST'])
def reset_timer():
    global start_time, elapsed_time
    start_time = None
    elapsed_time = timedelta(0)
    return jsonify({"status": "reset"})

@app.route('/time', methods=['GET'])
def get_time():
    global start_time, elapsed_time
    current_time = elapsed_time
    if start_time is not None:
        current_time += datetime.now() - start_time
    return jsonify({"time": str(current_time)})

if __name__ == '__main__':
    app.run(debug=True)
