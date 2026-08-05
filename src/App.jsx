import React, { useState, useEffect } from 'react';
import './index.css';
import Antigravity from './components/Antigravity';

function App() {
  const [modalImage, setModalImage] = useState(null);
  const [modalCaption, setModalCaption] = useState('');

  const openModal = (src, alt) => {
    setModalImage(src);
    setModalCaption(alt);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalCaption('');
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('belaoliveira413@gmail.com');
    alert('Chave Pix copiada com sucesso!');
  };

  // Timer logic
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-01T00:00:00').getTime(); // Outubro 2026

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }

      const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ dias, horas, minutos, segundos });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="canvas-container">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.1}
          lerpSpeed={0.05}
          color="#ff0000"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>
      
      <div className="background-blur-image"></div>

      <div className="container">
        <header>
          <p className="subtitle">Missão Global</p>
          <h1>Até os Confins da Terra</h1>
        </header>

        <main>
          <section className="missionary-name">
            <h2>Amanda e Isabel</h2>
            <p className="tagline">“Depois disto, ouvi a voz do Senhor, que dizia: — A quem enviarei, e quem há de ir
              por nós? Eu respondi: — Eis-me aqui, envia-me a mim.” <br />Isaías 6:8</p>
          </section>

          <section className="about-mission">
            <h3>Nova Fase Ministerial</h3>

            <p className="intro">Estamos iniciando um novo passo na nossa caminhada: a nossa próxima missão.</p>

            <p>Dessa vez, seguimos com a <a href="https://www.instagram.com/missionflow_/" target="_blank" rel="noreferrer"
              className="instagram-link"><strong>Mission Flow</strong></a>, um projeto que nasceu com o propósito
              de levantar todos os recursos necessários através de algo especial.</p>

            <p>O destino ainda é um segredo, mas o chamado já é claro. Em outubro, daremos esse passo de fé rumo a
              algo maior.</p>

            <p>Para tornar isso possível, estamos disponibilizando livros exclusivos, que não são encontrados em
              sites, apenas diretamente conosco. Cada livro adquirido é mais do que uma compra, é uma forma de fazer
              parte dessa missão.</p>

            <div className="ways-to-help-wrapper">
              <h4>Maneiras Práticas de Engajamento</h4>
              <ol className="ways-to-help">
                <li>
                  <i className="fa-solid fa-hands-praying icon-professional"></i>
                  <strong>Intercessão</strong>
                  <span>Cobrir a missão, as lideranças e a região em pautas de orações intencionais.</span>
                </li>
                <li>
                  <i className="fa-solid fa-share-nodes icon-professional"></i>
                  <strong>Networking</strong>
                  <span>Compartilhe com sua igreja, seus amigos e nas suas redes, às vezes, um simples gesto
                    pode alcançar pessoas e fazer parte de algo muito maior do que imaginamos.</span>
                </li>
                <li>
                  <i className="fa-solid fa-hand-holding-dollar icon-professional"></i>
                  <strong>Mantenedores</strong>
                  <span>Uma pessoa que apoia financeiramente essa missão e faz parte, de forma direta, de cada
                    passo e de cada vida alcançada.</span>
                </li>
              </ol>
            </div>

            <blockquote className="verse professional-verse">
              <p>“...e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos
                confins da terra.”</p>
              <cite>Atos 1:8</cite>
            </blockquote>

            <p className="instagram professional-instagram">
              <i className="fa-brands fa-instagram"></i>
              Acompanhe de perto:
              <a href="https://www.instagram.com/isa_obz" target="_blank" rel="noreferrer">@isa_obz</a> E
              <a href="https://www.instagram.com/4manda.costa/" target="_blank" rel="noreferrer">@4manda.costa</a>
            </p>
          </section>

          <section className="info professional-info">
            <div className="info-item">
              <i className="fa-regular fa-calendar icon-large"></i>
              <h3>Embarque</h3>
              <p>Outubro de 2026</p>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-globe icon-large"></i>
              <h3>Destino</h3>
              <p>Confidencial</p>
            </div>
          </section>

          <section className="gallery">
            <h3><i className="fa-solid fa-camera-retro"></i> Diário de Bordo</h3>
            <div className="slider-container">
              <div className="slide-track">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => {
                  const ext = num < 10 ? 'jpeg' : 'png';
                  const src = `/imgs/foto${num}.${ext}`;
                  return (
                    <div className="slide" key={num}>
                      <img src={src} alt="Missão" onClick={() => openModal(src, 'Missão')} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="countdown professional-countdown">
            <h3>Preparação em Andamento</h3>
            <div id="timer" className="elegant-timer">
              <div className="timer-unit">
                <span id="dias">{String(timeLeft.dias).padStart(2, '0')}</span>
                <label>Dias</label>
              </div>
              <div className="timer-unit">
                <span id="horas">{String(timeLeft.horas).padStart(2, '0')}</span>
                <label>Horas</label>
              </div>
              <div className="timer-unit">
                <span id="minutos">{String(timeLeft.minutos).padStart(2, '0')}</span>
                <label>Minutos</label>
              </div>
              <div className="timer-unit">
                <span id="segundos">{String(timeLeft.segundos).padStart(2, '0')}</span>
                <label>Segundos</label>
              </div>
            </div>
          </section>

          <section className="books professional-books">
            <h3>Literatura com Propósito</h3>
            <p className="books-subtitle">Obras de Lucca Martini</p>

            <p className="books-intro">Como forma de captar recursos essenciais para a concretização desta missão,
              estamos ofertando edições exclusivas destas obras literárias. A disponibilidade é limitada e direta; os
              livros não compõem o escopo de vendas das principais revendedoras online no momento.</p>

            <div className="books-image-container">
              <img src="/imgs/livros.jpeg" alt="Livros Pode Acontecer com Você e O Melhor da Vida"
                className="books-display-img"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x400/fcfbf9/a81b1b?text=Foto+dos+Livros'; }} />
            </div>

            <div className="books-pricing-card">
              <span>Investimento:</span>
              <strong>1 exemplar: R$ 35,00</strong>
              <span className="divider">|</span>
              <strong>2 exemplares: R$ 60,00</strong>
            </div>

            <div className="book-list">
              <div className="book-item professional-card">
                <h4>Pode acontecer com você</h4>
                <p>Uma imersão na realidade profunda do amor transformador. O livro expõe o testemunho palpável
                  de indivíduos anônimos que tomaram a ousada decisão de aceitar seus chamados. Uma
                  experiência literária provocante que evoca o questionamento primordial: "E se estivessem
                  falando de mim?"</p>
              </div>

              <div className="book-item professional-card">
                <h4>O melhor da vida</h4>
                <p>Uma obra que interpela o leitor a abandonar a posição de plateia. Trata-se de um instigante
                  convite à construção de uma biografia fundamentada em objetivos eternos, assumindo a
                  responsabilidade pessoal como um protagonista na elaboração de uma vida excepcional e
                  direcionada.</p>
              </div>
            </div>

            <p className="books-outro">Textos moldados para mentes inquietas que anseiam por ultrapassar as fronteiras
              da mediocridade contemporânea.</p>
          </section>

          <section className="donation professional-donation">
            <h3>Ofertas e compras de livro</h3>

            <div className="pix-area">
              <div className="pix-qr">
                <img src="/imgs/pixIsa.jpeg" alt="QR Code Pix" className="pix-qr-code" />
                <p style={{ textAlign: 'center' }}>Aponte a câmera</p>
              </div>
              <div className="pix-or">ou utiliza a chave</div>
              <div className="pix-copy">
                <p className="pix-key" id="chavePixTexto" style={{ marginTop: 0 }}>belaoliveira413@gmail.com</p>
                <br />
                <button className="cta-button pix-button" id="btnCopiarPix" onClick={handleCopyPix}>
                  <i className="fa-regular fa-copy"></i> Copiar Chave Pix
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p>Até os confins da terra • Isa Mission</p>
        </footer>

      </div>

      {modalImage && (
        <div id="imageModal" className="modal" style={{ display: 'block' }} onClick={closeModal}>
          <span className="close-modal" onClick={closeModal}>&times;</span>
          <img className="modal-content" id="img01" src={modalImage} alt={modalCaption} onClick={(e) => e.stopPropagation()} />
          <div id="caption">{modalCaption}</div>
        </div>
      )}
    </>
  );
}

export default App;
