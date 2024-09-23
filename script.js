// Função para obter a cotação do dólar
async function getCotacaoDolar() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
        const data = await response.json();
        return parseFloat(data.USDBRL.bid);
    } catch (error) {
        console.error('Erro ao buscar a cotação do dólar:', error);
        return null;
    }
}

document.getElementById('quinzenaForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let quinzenas = parseInt(document.getElementById('quinzenas').value);
    let percentual = parseFloat(document.getElementById('percentual').value) / 100;
    let valorBase = parseFloat(document.getElementById('valorBase').value);
    let saque = parseFloat(document.getElementById('saque').value) || 0; // Valor do saque, opcional

    // Obter a cotação atual do dólar
    let cotacaoDolar = await getCotacaoDolar();

    if (!cotacaoDolar) {
        document.getElementById('resultado').innerHTML = 'Erro ao obter a cotação do dólar. Tente novamente.';
        return;
    }

    let resultadoEmDolares = valorBase;
    
    // Calcula o valor com o percentual para cada quinzena e subtrai o saque (se houver)
    for (let i = 0; i < quinzenas; i++) {
        resultadoEmDolares += resultadoEmDolares * percentual;
        if (saque > 0) {
            resultadoEmDolares -= saque;
        }
        // Garante que o valor não seja negativo após subtrair o saque
        if (resultadoEmDolares < 0) {
            resultadoEmDolares = 0;
            break;
        }
    }

    // Converter o resultado final de dólares para reais
    let resultadoEmReais = resultadoEmDolares * cotacaoDolar;

    // Exibir os valores em dólares e reais
    document.getElementById('resultado').innerHTML = `
        Resultado Final em Dólares: $${resultadoEmDolares.toFixed(2)}<br>
        Resultado Final em Reais: R$${resultadoEmReais.toFixed(2)} (Cotação: R$${cotacaoDolar.toFixed(2)})
    `;
});
