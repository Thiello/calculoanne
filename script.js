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

    // Captura dos valores inseridos no formulário
    let quinzenas = parseInt(document.getElementById('quinzenas').value);
    let percentual = parseFloat(document.getElementById('percentual').value) / 100;
    let valorBase = parseFloat(document.getElementById('valorBase').value);

    // Obter a cotação do dólar
    let cotacaoDolar = await getCotacaoDolar();

    // Verificação da cotação
    if (!cotacaoDolar) {
        document.getElementById('resultado').innerHTML = 'Erro ao obter a cotação do dólar. Tente novamente.';
        return;
    }

    // Verificação básica dos inputs
    if (isNaN(quinzenas) || isNaN(percentual) || isNaN(valorBase)) {
        document.getElementById('resultado').innerHTML = 'Preencha todos os campos corretamente.';
        return;
    }

    // Inicializa o cálculo com o valor base
    let resultadoEmDolares = valorBase;
    
    // Calcula o valor com o percentual para cada quinzena
    for (let i = 0; i < quinzenas; i++) {
        resultadoEmDolares += resultadoEmDolares * percentual;
    }

    // Converte o resultado final de dólares para reais
    let resultadoEmReais = resultadoEmDolares * cotacaoDolar;

    // Exibe os valores em dólares e reais
    document.getElementById('resultado').innerHTML = `
        Resultado Final em Dólares: $${resultadoEmDolares.toFixed(2)}<br>
        Resultado Final em Reais: R$${resultadoEmReais.toFixed(2)} (Cotação: R$${cotacaoDolar.toFixed(2)})
    `;
});
