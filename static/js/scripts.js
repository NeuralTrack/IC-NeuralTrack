const muscleTensionCtx = document.getElementById('muscleTensionChart').getContext('2d');
const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');

const sensorData = {
            heartRate: JSON.parse('{{ data | tojson | safe }}').map(entry => entry[0]),  // Extrai os valores de batimentos cardíacos
            emg: JSON.parse('{{ data | tojson | safe }}').map(entry => entry[1])  // Extrai os valores de EMG
        };


// Gráfico de Tensão Muscular
const muscleTensionChart = new Chart(muscleTensionCtx, {
    type: 'line',
    data: {
        labels: ['10s', '20s', '30s', '40s', '50s'],
        datasets: [{
            label: 'Tensão Muscular',
            data: sensorData.emg,
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

// Gráfico de Frequência Cardíaca
const heartRateChart = new Chart(heartRateCtx, {
    type: 'line',
    data: {
        labels: ['10s', '20s', '30s', '40s', '50s'],
        datasets: [{
            label: 'Frequência Cardíaca',
            data: sensorData.heartRate,
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
