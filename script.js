// ATENÇÃO: Data da missão atualizada para 19 de Janeiro.
// Formato: "Ano-Mês-DiaTHora:Minuto:Segundo"
// (19 de Dezembro de 2026, às 08:00)
const dataDaMissao = new Date("2026-01-19T08:00:00").getTime();

// Atualiza a contagem a cada 1 segundo
const intervalo = setInterval(function () {

    // Pega a data e hora de agora
    const agora = new Date().getTime();

    // Encontra a distância entre agora e a data da missão
    const distancia = dataDaMissao - agora;

    // Cálculos de tempo para dias, horas, minutos e segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Mostra o resultado nos elementos com os respectivos IDs
    // Verifica se os elementos existem antes de tentar atualizar
    if (document.getElementById("dias")) {
        document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
        document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
        document.getElementById("minutos").innerText = minutos < 10 ? '0' + minutos : minutos;
        document.getElementById("segundos").innerText = segundos < 10 ? '0' + segundos : segundos;
    }

    // Se a contagem terminar, escreva uma mensagem
    if (distancia < 0) {
        clearInterval(intervalo);
        if (document.getElementById("timer")) {
            document.getElementById("timer").innerHTML = "A MISSÃO COMEÇOU! DEUS ABENÇOE!";
        }
    }
}, 1000);


/* ===================================== */
/* NOVA FUNÇÃO: COPIAR CHAVE PIX         */
/* ===================================== */
// Adiciona o "ouvinte de evento" ao botão de copiar
const btnCopiar = document.getElementById('btnCopiarPix');

if (btnCopiar) {
    btnCopiar.addEventListener('click', function () {
        // Pega o texto da chave pix
        const chavePix = document.getElementById('chavePixTexto').innerText;

        // Usa a API do navegador (Clipboard) para copiar o texto
        navigator.clipboard.writeText(chavePix).then(() => {
            // Sucesso!
            // Altera o texto do botão temporariamente para dar feedback
            const icone = btnCopiar.querySelector('i');

            btnCopiar.innerHTML = '<i class="fa-solid fa-check"></i> Chave Copiada!';

            // Volta ao normal depois de 2 segundos
            setTimeout(() => {
                btnCopiar.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar Chave Pix';
            }, 2000);

        }).catch(err => {
            // Erro (raro, mas pode acontecer por permissões)
            console.error('Falha ao copiar a chave: ', err);
            alert('Não foi possível copiar a chave. Por favor, copie manualmente.');
        });
    });
}


/* ===================================== */
/* NOVA FUNÇÃO: MODAL DE IMAGEM          */
/* ===================================== */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close-modal")[0];

// Seleciona todas as imagens dentro do carrossel
const galleryImages = document.querySelectorAll('.slide img');

galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

// Fechar modal ao clicar no X
if (closeBtn) {
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
}

// Fechar modal ao clicar fora da imagem
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}