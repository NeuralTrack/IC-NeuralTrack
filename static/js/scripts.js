const socket = io.connect('http://' + document.domain + ':' + location.port);  // Conecta ao servidor via Socket.IO
const muscleTensionCtx = document.getElementById('muscleTensionChart').getContext('2d');
const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');

// Inicializa os gráficos vazios
const muscleTensionChart = new Chart(muscleTensionCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Tensão Muscular',
            data: [],
            backgroundColor: 'rgba(62, 142, 126, 0.2)',
            borderColor: 'rgba(62, 142, 126, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const heartRateChart = new Chart(heartRateCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Frequência Cardíaca',
            data: [],
            backgroundColor: 'rgba(247, 200, 70, 0.2)',
            borderColor: 'rgba(247, 200, 70, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let capturingData = true;  // Flag para controlar a captura de dados

// Função para parar a captura de dados
function stopDataCapture() {
    capturingData = false;  // Define a flag como falsa para parar a captura de novos dados

    // Faz uma requisição AJAX para o servidor para interromper a captura de dados
    fetch('/stop', {
        method: 'POST'  // Envia como POST para a rota '/stop'
    }).then(response => {
        if (response.ok) {
            console.log("Captura de dados interrompida.");
        } else {
            console.error("Erro ao tentar parar a captura de dados.");
        }
    });
}

// Adiciona o evento de clique no botão de parada
document.querySelector(".stop-button").addEventListener("click", function(event) {
    event.preventDefault();  // Evita o recarregamento da página
    stopDataCapture();  // Chama a função de parada
});


// Função para adicionar novos dados ao gráfico
function addData(chart, label, data) {
    if (capturingData) {  // Adiciona novos dados apenas se capturingData for true
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
}

// Escuta os novos dados recebidos via Socket.IO
socket.on('new_data', function (msg) {
    const timeLabel = `${muscleTensionChart.data.labels.length * 1}s`;  // Exemplo de label de tempo
    addData(muscleTensionChart, timeLabel, msg.emg);
    addData(heartRateChart, timeLabel, msg.heart);
});
