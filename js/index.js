// ==========================================================================
// 1. Fullscreen Interactive Node Graph Canvas
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('node-graph-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let nodes = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Node {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
      if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
    }

    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#00e5ff' : '#0284c7';
      if (isDark) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00e5ff';
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const nodeCount = Math.max(35, Math.floor((window.innerWidth * window.innerHeight) / 18000));
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node());
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw(isDark);

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          const alpha = 0.35 * (1 - dist / 130);
          ctx.strokeStyle = isDark
            ? `rgba(0, 229, 255, ${alpha})`
            : `rgba(2, 132, 199, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }

  render();
});

// ==========================================================================
// 2. Full-Sentence Typewriter Effect
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const targetElement = document.getElementById('typewriter-text');
  if (!targetElement) return;

  const sentences = [
    'Surf the web with zero phish anxiety.',
    'Real-time protection against typosquatting.',
    'Private, local, open-source browser defense.',
    'Say goodbye to deceptive login traps.'
  ];

  let sentenceIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 60;

  function typeEffect() {
    const currentSentence = sentences[sentenceIndex];

    if (isDeleting) {
      charIndex--;
      typingSpeed = 30;
    } else {
      charIndex++;
      typingSpeed = 60;
    }

    targetElement.textContent = currentSentence.substring(0, charIndex);

    if (!isDeleting && charIndex === currentSentence.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
});
