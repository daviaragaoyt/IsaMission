// DEFINE AQUI A DATA DA NOVA VIAGEM PARA A FRONTEIRA (Ano-Mês-Dia T Hora:Min:Seg)
// Exemplo: Coloquei para 15 de Janeiro de 2026. Altere conforme necessário.
const dataDaMissao = new Date("2026-01-15T08:00:00").getTime();

// Atualiza a contagem a cada 1 segundo
const intervalo = setInterval(function () {

    const agora = new Date().getTime();
    const distancia = dataDaMissao - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    if (document.getElementById("dias")) {
        document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
        document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
        document.getElementById("minutos").innerText = minutos < 10 ? '0' + minutos : minutos;
        document.getElementById("segundos").innerText = segundos < 10 ? '0' + segundos : segundos;
    }

    if (distancia < 0) {
        clearInterval(intervalo);
        if (document.getElementById("timer")) {
            document.getElementById("timer").innerHTML = "<div style='text-align:center'><h3>A JORNADA COMEÇOU!</h3><p>Orem por nós na fronteira!</p></div>";
        }
    }
}, 1000);


/* ===================================== */
/* FUNÇÃO: COPIAR CHAVE PIX              */
/* ===================================== */
const btnCopiar = document.getElementById('btnCopiarPix');

if (btnCopiar) {
    btnCopiar.addEventListener('click', function () {
        const chavePix = document.getElementById('chavePixTexto').innerText;

        navigator.clipboard.writeText(chavePix).then(() => {
            const icone = btnCopiar.querySelector('i');
            btnCopiar.innerHTML = '<i class="fa-solid fa-check"></i> Chave Copiada!';
            setTimeout(() => {
                btnCopiar.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar Chave Pix';
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar: ', err);
            // Fallback simples
            alert('Copie manualmente: ' + chavePix);
        });
    });
}

/* ===================================== */
/* FUNÇÃO: MODAL DE IMAGEM               */
/* ===================================== */
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close-modal")[0];
const galleryImages = document.querySelectorAll('.slide img');

galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

if (closeBtn) {
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}