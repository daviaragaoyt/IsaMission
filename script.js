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
/* FUNÇÃO: EFEITO DE PARTÍCULAS (2D WAVES - MOUSE INTERACTION) */
/* ===================================== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let ripples = [];

    // Cores da marca
    const colors = ['#A81B1B', '#FF1A1A', '#D32F2F', '#ff4d4d', '#8B0000'];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    class Particle {
        constructor() {
            // Distribuição aleatória por toda a tela (plano 2D)
            this.baseX = Math.random() * width;
            this.baseY = Math.random() * height;
            
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Tamanho base das linhas finas
            this.baseLength = Math.random() * 3 + 3;
        }

        updateAndDraw(ctx, time, mouseX, mouseY) {
            let x = this.baseX;
            let y = this.baseY;

            let interactionLevel = 0; // Define se a partícula aparece
            let pushX = 0;
            let pushY = 0;

            // 1. Calcula a Geleia (Jelly Mask) em volta do mouse
            let jellyMask = 0;
            const jellyRadius = 650; 
            
            let distMouse = 9999;
            let dxMouse = 0;
            let dyMouse = 0;
            
            if (mouseX !== -1000) {
                dxMouse = x - mouseX;
                dyMouse = y - mouseY;
                distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse) || 1;
                
                if (distMouse < jellyRadius) {
                    jellyMask = Math.pow(1 - (distMouse / jellyRadius), 0.6);
                }
            }

            // Removido o efeito de zoom (sizeBoost). Apenas ilumina a área.
            interactionLevel += jellyMask * 0.45; 

            // 2. Ondas (Ripples) que reverberam pela tela toda
            let rippleIllumination = 0;

            for (let r of ripples) {
                const dx = x - r.x;
                const dy = y - r.y;
                const dist = Math.sqrt(dx*dx + dy*dy) || 1;
                
                const distanceToRipple = dist - r.radius; 
                
                // Se estiver dentro da espessura da onda
                if (Math.abs(distanceToRipple) < r.thickness) {
                    const angle = (distanceToRipple / r.thickness) * Math.PI; 
                    const wavePush = Math.sin(angle); 
                    const envelope = Math.pow(Math.cos(angle / 2), 2); 
                    
                    const push = wavePush * envelope * 25 * r.life; // Onda mais suave (não parece explosão)
                    
                    pushX += (dx / dist) * push;
                    pushY += (dy / dist) * push;

                    // A onda tem luz própria, ilumina por onde passa na tela toda
                    rippleIllumination += envelope * r.life * 1.5;
                }
            }

            // 3. Onda parada (Pulso fixo no centro ativo - Geleia puxando)
            if (mouseX !== -1000) {
                const distanceToPulse = distMouse - pulseRadius;
                if (Math.abs(distanceToPulse) < 100) {
                    const angle = (distanceToPulse / 100) * Math.PI;
                    const wavePush = Math.sin(angle);
                    const envelope = Math.pow(Math.cos(angle / 2), 2);
                    const pulseLife = Math.max(0, Math.pow(1.0 - (pulseRadius / 450), 1.5));
                    
                    const push = wavePush * envelope * 25 * pulseLife; // Puxa e empurra
                    pushX += (dxMouse / distMouse) * push;
                    pushY += (dyMouse / distMouse) * push;

                    interactionLevel += envelope * pulseLife * 1.5;
                }
            }

            // A MÁGICA: A geleia ilumina o centro ao redor do mouse
            interactionLevel *= jellyMask; 
            
            // Mas as ondas reverberam e iluminam tudo (mesmo fora da geleia)
            interactionLevel += rippleIllumination;

            x += pushX;
            y += pushY;

            let alpha = Math.min(1, interactionLevel); 
            if (alpha < 0.02) return; // Escondido

            const finalLength = this.baseLength; // Removido o sizeBoost

            // Orientação ordenada
            const angleToCenter = Math.atan2(y - height/2, x - width/2);
            const dashAngle = angleToCenter + Math.PI/2;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(x, y);
            ctx.rotate(dashAngle);

            ctx.beginPath();
            ctx.moveTo(-finalLength/2, 0);
            ctx.lineTo(finalLength/2, 0);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1.0; // Linhas finas
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();
        }
    }

    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 750; // Alcance ainda mais reduzido, morre logo após a geleia (650)
            this.speed = 3.0; // Velocidade suave
            this.thickness = 180; // Onda gordinha
            this.life = 1.0;
        }
        update() {
            this.radius += this.speed;
            const progress = this.radius / this.maxRadius;
            this.life = Math.max(0, Math.pow(1.0 - progress, 1.5));
        }
    }

    function initParticles() {
        particles = [];
        // Densidade baseada no tamanho da tela para cobrir bem em 2D
        const numParticles = Math.floor((width * height) / 2500); 
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Variáveis para rastrear o movimento do mouse de forma suave
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let lastSpawnX = -1000;
    let lastSpawnY = -1000;
    let time = 0;
    let pulseRadius = 0; // Pulso da geleia
    
    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        targetMouseX = -1000;
        targetMouseY = -1000;
    });

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            targetMouseX = e.touches[0].clientX;
            targetMouseY = e.touches[0].clientY;
            mouseX = targetMouseX;
            mouseY = targetMouseY;
            lastSpawnX = mouseX;
            lastSpawnY = mouseY;
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetMouseX = e.touches[0].clientX;
            targetMouseY = e.touches[0].clientY;
        }
    });

    document.addEventListener('touchend', () => {
        targetMouseX = -1000;
        targetMouseY = -1000;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 16; 
        
        // Pulso da Geleia (puxa e traz os pontos quando parada)
        pulseRadius += 1.5;
        if (pulseRadius > 450) {
            pulseRadius = 0;
        }

        if (targetMouseX !== -1000) {
            if (mouseX === -1000) { 
                mouseX = targetMouseX;
                mouseY = targetMouseY;
                lastSpawnX = mouseX;
                lastSpawnY = mouseY;
            } else {
                mouseX += (targetMouseX - mouseX) * 0.15; 
                mouseY += (targetMouseY - mouseY) * 0.15;
            }

            const dx = mouseX - lastSpawnX;
            const dy = mouseY - lastSpawnY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Gera onda ao mexer
            if (dist > 80) { 
                if (ripples.length > 8) { // Mais ondas ativas para preencher a tela
                    ripples.shift();
                }
                ripples.push(new Ripple(mouseX, mouseY));
                lastSpawnX = mouseX;
                lastSpawnY = mouseY;
            }
        } else {
            mouseX = -1000;
            mouseY = -1000;
        }

        for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].update();
            if (ripples[i].life <= 0) {
                ripples.splice(i, 1);
            }
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].updateAndDraw(ctx, time, mouseX, mouseY);
        }

        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resize);
    resize();
    animate();
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