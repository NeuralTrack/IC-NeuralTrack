const muscleTensionCtx = document.getElementById('muscleTensionChart').getContext('2d');
const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');

// Gráfico de Tensão Muscular
const muscleTensionChart = new Chart(muscleTensionCtx, {
    type: 'line',
    data: {
        labels: ['10s', '20s', '30s', '40s', '50s'],
        datasets: [{
            label: 'Tensão Muscular',
            data: [12, 19, 3, 5, 2],
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
            data: [60, 65, 70, 75, 72],
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
