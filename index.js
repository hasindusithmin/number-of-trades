let labels = []
let numbers_of_traders = []
fetch('https://www.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m')
    .then(res=>res.json())
        .then($data=>{
            for (dt of $data) {
                labels.push(new Date(dt[0]).toLocaleString())
                numbers_of_traders.push(dt[8])
            }
        })


let data = {
    labels: labels,
    datasets: [{
        label: `Number of Trades Bitcoin 5m`,
        data: numbers_of_traders,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

let config = {
    type: 'line',
    data: data
}

let myChart = new Chart(
    document.getElementById('myChart'),
    config
);



document.getElementById('form').onsubmit = e=>{
    e.preventDefault()
    const interval = e.target.interval.value;
    const market = e.target.market.value;
    fetch(`https://www.binance.com/api/v3/klines?symbol=${market}&interval=${interval}`)
    .then(res=>{
        labels = []
        numbers_of_traders = []
        data = {}
        config = {}
        return res.json()
    })
        .then($data=>{
            for (dt of $data) {
                labels.push(new Date(dt[0]).toLocaleString())
                numbers_of_traders.push(dt[8])
            }
            data = {
                labels: labels,
                datasets: [{
                    label: `Number of Trades ${market.toUpperCase()} ${interval}`,
                    data: numbers_of_traders,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
            config = {
                type: 'line',
                data: data,
            }
            myChart.destroy()
            myChart = new Chart(
                document.getElementById('myChart'),
                config
            )
        })
}
