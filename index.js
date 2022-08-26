
const chartopt = {
    width: 800,
    height: 500,
    layout: {
        backgroundColor: '#ffffff',
        textColor: 'rgba(33, 56, 77, 1)',
    },
    grid: {
        vertLines: {
            color: 'rgba(197, 203, 206, 0.7)',
        },
        horzLines: {
            color: 'rgba(197, 203, 206, 0.7)',
        },
    },
    timeScale: {
        timeVisible: true,
        secondsVisible: false,
    },
}

document.getElementById('form').onsubmit = e => {
    e.preventDefault()
    // Get form name:interval 
    const interval = e.target.interval.value;
    // Get form name:market 
    const market = e.target.market.value;
    // Create empty data array 
    const data = []
    // Fetch required payload
    fetch(`https://www.binance.com/api/v3/klines?symbol=${market}&interval=${interval}`)
        .then(res => res.json())
        .then(Data => {
            document.getElementById('chart').innerHTML = ''
            // Override 'data' array 
            for (D of Data) {
                data.push({ time: D[0] / 1000, value: D[8] });
            }
            // Draw chart -> <div id="chart"></div>
            const chart = LightweightCharts.createChart(document.getElementById('chart'),chartopt)
            const lineSeries = chart.addLineSeries();
            lineSeries.setData(data)
            // Chart -> Responsive 
            new ResizeObserver(entries => {
                if (entries.length === 0 || entries[0].target !== document.getElementById('chart')) { return; }
                const newRect = entries[0].contentRect;
                chart.applyOptions({ height: newRect.height, width: newRect.width });
            }).observe(document.getElementById('chart'));
        })
}
