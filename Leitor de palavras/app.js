// Array para armazenar palavras
let palavras = [];
let palavrasEscolhidas = [];
let palavrasEscolhidasContagem = {};


function adicionarPalavras() {
    const input = document.getElementById('inputWords').value;
    if (input.trim() === '') {
        alert('Digite uma palavra, por favor!');
        return;
    }
    const palavrasNovas = input.split(',')
                               .map(palavra => palavra.trim())
                               .filter(palavra => palavra.length > 0);

    palavras = palavras.concat(palavrasNovas);
    document.getElementById('inputWords').value = ''; // Limpar o campo de entrada
    const listaPalavras = document.getElementById('listaPalavras');
    if (!listaPalavras) {
        const newLista = document.createElement('ul');
        newLista.id = 'listaPalavras';
        document.body.appendChild(newLista);
    }


    const lista = document.getElementById('listaPalavras');
    lista.innerHTML = palavras.map(palavra => `<li>${palavra}</li>`).join('');

  
    const listaPalavrasContainer = document.getElementById('listaPalavrasContainer');
    if (listaPalavrasContainer) {
        listaPalavrasContainer.style.display = 'block'; // Exibir lista oculta
    }
    
    alert('Palavras adicionadas com sucesso!');
}

// Função para sortear uma palavra
function sortearPalavra() {
    if (palavras.length === 0) {
        alert('Por favor, adicione palavras antes de sortear.');
        return;
    }

    let palavra;
    do {
        palavra = palavras[Math.floor(Math.random() * palavras.length)];
    } while (palavrasEscolhidasContagem[palavra] >= 3);

    // Adiciona a palavra sorteada à lista de palavras escolhidas
    if (!palavrasEscolhidasContagem[palavra]) {
        palavrasEscolhidasContagem[palavra] = 0;
    }
    palavrasEscolhidasContagem[palavra]++;
    palavrasEscolhidas.push(palavra);
    lerPalavra(palavra);
    const elementoWord = document.getElementById('word');
    elementoWord.textContent = palavra;
    document.getElementById('repeatButton').style.display = 'inline';
    document.getElementById('lerPalavraButton').style.display = 'inline'; // Exibir botão de leitura
    document.getElementById('showWordButton').style.display = 'inline'; // Exibir botão de mostrar palavra
    document.getElementById('container__Palavras').style.display = 'none';
    document.getElementById('word').style.display = 'none';

}

// Função para ler a palavra
function lerPalavra(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    
    const isJapanese = /[ぁ-んァ-ン]/.test(texto);
    utterance.lang = isJapanese ? 'ja-JP' : 'pt-BR';

    utterance.rate = 0.75; // Velocidade da fala

    synth.speak(utterance);
}

// Função para repetir a pronúncia da palavra exibida
document.getElementById('repeatButton').addEventListener('click', () => {
    const palavra = document.getElementById('word').textContent;
    lerPalavra(palavra);
});

// Função para mostrar a palavra escolhida
function mostrarPalavraEscolhida() {
    const palavraEscolhida = palavrasEscolhidas[palavrasEscolhidas.length - 1];
    const containerPalavraEscolhida = document.getElementById('palavraEscolhidaContainer');
    document.getElementById('word').style.display = 'inline';
}

// Função para ler a palavra ao clicar no botão
document.getElementById('lerPalavraButton').addEventListener('click', () => {
    const palavra = document.getElementById('word').textContent;
    lerPalavra(palavra);
});
