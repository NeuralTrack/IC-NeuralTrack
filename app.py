from flask import Flask, render_template, redirect, url_for, jsonify
import serial
import keyboard

app = Flask(__name__)

# Armazena os dados de amostragem
data = []

# Função para capturar dados do sensor
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
                            print(f"Heart: {heart}, EMG: {emg}")
            # Interrompe o loop
            if keyboard.is_pressed("enter") or keyboard.is_pressed("space"):
                print("Loop interrompido.")
                break

    except Exception as e:
        print(f"Erro com a porta: {e}")

# Rota que exibe os dados
@app.route("/")
def index():
    # Renderiza o template com os dados capturados
    return render_template("index.html", data=data)

# Rota para resetar os dados e começar nova amostragem
@app.route("/reset")
def reset():
    global data
    data = []  # Limpa os dados
    capture_data()  # Inicia a nova amostragem
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
