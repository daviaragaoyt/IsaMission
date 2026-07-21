// DEFINE AQUI A DATA DA NOVA VIAGEM (Ano-Mês-Dia T Hora:Min:Seg)
// Exemplo: Coloquei para 1 de Outubro de 2026. Altere conforme necessário.
const dataDaMissao = new Date("2026-10-01T00:00:00").getTime();

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
            document.getElementById("timer").innerHTML = "<div style='text-align:center'><h3>A JORNADA COMEÇOU!</h3><p>Orem por nós nesse novo destino!</p></div>";
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
/* FUNÇÃO: EFEITO DE PARTÍCULAS (WAVE & ZOOM) */
/* ===================================== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Apenas tons de vermelho puro e o vermelho da marca para consistência
    const colors = ['#A81B1B', '#FF1A1A', '#D32F2F'];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    class Particle {
        constructor(x, y, spiralAngle) {
            this.originX = x;
            this.originY = y;
            
            this.x = x;
            this.y = y;

            // Alinhado ao longo da curva da espiral (tangente)
            this.angle = spiralAngle + Math.PI / 2;

            this.color = colors[Math.floor(Math.random() * colors.length)];

            // Tamanhos base arredondados e curtos (Zoom Adicionado)
            this.baseSize = Math.random() * 3.5 + 3; // Mais grossos
            this.baseLength = Math.random() * 2 + 1; // Continuam bem redondinhos

            this.currentLength = this.baseLength;
            this.currentSize = this.baseSize;
            this.alpha = 0; // Começam invisíveis
            
            // Targets para transições suaves (Lerp)
            this.targetAlpha = 0;
            this.targetSize = this.baseSize;
            this.targetLength = this.baseLength;
            
            // Variáveis para a onda "vai e vem" baseada na distância até o centro
            const dxCenter = x - (width / 2);
            const dyCenter = y - (height / 2);
            this.distFromCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter) || 1;
            this.dirX = dxCenter / this.distFromCenter;
            this.dirY = dyCenter / this.distFromCenter;
        }

        update(mouseX, mouseY, time) {
            // Movimento de onda natural (suave) da galáxia inteira (velocidade reduzida)
            const globalWaveOffset = Math.sin(time * 0.0004 - this.distFromCenter * 0.01) * 10;
            
            let targetX = this.originX + this.dirX * globalWaveOffset;
            let targetY = this.originY + this.dirY * globalWaveOffset;

            // Fator de tamanho dinâmico: mais perto do centro da espiral = menor. 
            const currentDistFromCenter = this.distFromCenter + globalWaveOffset;
            const centerScale = Math.max(0.1, currentDistFromCenter / 1000); 
            const dynamicBaseSize = this.baseSize * (0.4 + centerScale);
            const dynamicBaseLength = this.baseLength * (0.4 + centerScale);

            const dx = mouseX - targetX;
            const dy = mouseY - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            // Raio do efeito do mouse
            const maxDist = 550;

            if (dist < maxDist) {
                // Força baseada na distância do mouse (easing para transição suave)
                const force = (maxDist - dist) / maxDist;
                const smoothForce = Math.pow(force, 1.2); 
                const invertedForce = 1 - smoothForce;

                // NOVA ONDA: O mouse cria ondas (ripples) pulsantes ao seu redor (velocidade reduzida)
                const mouseWave = Math.sin(time * 0.0015 - dist * 0.03) * (smoothForce * 40);
                
                // Aplica a onda do mouse empurrando radialmente a partir do cursor
                targetX -= (dx / dist) * mouseWave;
                targetY -= (dy / dist) * mouseWave;

                // 1. EFEITO ZOOM INVERTIDO: Menores perto do mouse e influenciados pela distância do centro
                this.targetLength = dynamicBaseLength + (invertedForce * 1.5);
                this.targetSize = dynamicBaseSize + (invertedForce * 1.5);

                // 2. EFEITO APARECER
                this.targetAlpha = smoothForce; 
            } else {
                this.targetLength = dynamicBaseLength;
                this.targetSize = dynamicBaseSize;
                this.targetAlpha = 0;
            }
            
            // Interpolação suave (Lerp) para as transições de luz e tamanho
            this.alpha += (this.targetAlpha - this.alpha) * 0.1;
            this.currentSize += (this.targetSize - this.currentSize) * 0.1;
            this.currentLength += (this.targetLength - this.currentLength) * 0.1;

            // Interpolação suave (Lerp) para a posição, dando fluidez orgânica ao movimento das ondas
            this.x += (targetX - this.x) * 0.15;
            this.y += (targetY - this.y) * 0.15;
        }

        draw(ctx) {
            if (this.alpha <= 0.01) return; // Otimiza a renderização

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.beginPath();
            ctx.moveTo(-this.currentLength / 2, 0);
            ctx.lineTo(this.currentLength / 2, 0);

            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.currentSize;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.restore();
        }
    }

    function initParticles() {
        particles = [];
        const numParticles = 1600; // Quantidade dobrada
        const maxRadius = Math.max(width, height) * 1.5; // Espalha mais a espiral
        const numArms = 16; // O dobro de linhas na espiral
        
        for (let i = 0; i < numParticles; i++) {
            const arm = i % numArms;
            // Progresso de 0 a 1 ao longo do braço da espiral
            const t = Math.floor(i / numArms) / Math.floor(numParticles / numArms);
            
            // O buraco no meio: não deixa o centro da espiral aparecer
            const minRadius = 300; 
            const radius = minRadius + (t * maxRadius); 
            
            // O ângulo gira conforme o raio aumenta (com curva levemente mais aberta pelo zoom)
            const spiralAngle = (radius * 0.004) + (arm * (Math.PI * 2) / numArms);
            
            const x = width / 2 + Math.cos(spiralAngle) * radius;
            const y = height / 2 + Math.sin(spiralAngle) * radius;

            particles.push(new Particle(x, y, spiralAngle));
        }
    }

    // Variáveis para rastrear e interpolar a posição do mouse (iniciam fora da tela)
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    });

    // Remove as partículas da tela quando o mouse sai da janela
    document.addEventListener('mouseleave', () => {
        targetMouseX = -1000;
        targetMouseY = -1000;
    });

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        // Movimento fluido do mouse (Lerp)
        mouseX += (targetMouseX - mouseX) * 0.15;
        mouseY += (targetMouseY - mouseY) * 0.15;

        particles.forEach(p => {
            p.update(mouseX, mouseY, time);
            p.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate(0);
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