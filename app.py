from flask import Flask, render_template, redirect, url_for
from flask_socketio import SocketIO, emit
import serial
import keyboard
import threading
import time

app = Flask(__name__)
socketio = SocketIO(app)

# Armazena os dados de amostragem
data = []

# Função para capturar dados do sensor em segundo plano
def capture_data():
    global data
    try:
        ser = serial.Serial("COM3", 9600)
        print("Amostragem de dados iniciada. Pressione Enter ou Espaço para parar.")
        data = []  # Limpa os dados
        while True:
            if ser.in_waiting > 0:
                line = ser.readline().decode("utf-8").strip()
                if "," in line:
                    parts = line.split(",")
                    if len(parts) == 2:
                        heart, emg = parts
                        if heart.isdigit() and emg.isdigit():
                            heart, emg = int(heart), int(emg)
                            data.append([heart, emg])
                            # Emite os dados para o front-end em tempo real
                            socketio.emit('new_data', {'heart': heart, 'emg': emg})
                            print(f"Heart: {heart}, EMG: {emg}")
            # Interrompe o loop
            if keyboard.is_pressed("enter") or keyboard.is_pressed("space"):
                print("Loop interrompido.")
                break

    except Exception as e:
        print(f"Erro com a porta: {e}")

# Inicia a captura de dados em uma thread separada
def start_data_capture():
    data_thread = threading.Thread(target=capture_data)
    data_thread.start()

# Rota que exibe os dados
@app.route("/")
def index():
    return render_template("index.html")

# Rota para resetar os dados e começar nova amostragem
@app.route("/reset")
def reset():
    global data
    data = []  # Limpa os dados
    start_data_capture()  # Inicia a nova amostragem
    return redirect(url_for("index"))

if __name__ == "__main__":
    start_data_capture()  # Começa a captura de dados
    socketio.run(app, debug=True)
