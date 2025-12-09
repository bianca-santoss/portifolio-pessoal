// Interações: mobile menu, scroll reveal, modal de projeto e formulário simples
document.addEventListener('DOMContentLoaded', function () {
  // ano no footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav mobile
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
    // acessibilidade
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
  });

  // Simple scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // Project modal
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const data = JSON.parse(btn.getAttribute('data-project'));
      modalTitle.textContent = data.title || 'Projeto';
      modalDesc.textContent = data.desc || '';
      modalTech.textContent = data.tech || '';
      modal.setAttribute('aria-hidden', 'false');
      // foco para acessibilidade
      modalClose.focus();
    });
  });

  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  // Simple contact form validation & feedback
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name || !email || !msg) {
      formNote.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    // Simula envio (aqui você pode integrar envio real via email API)
    formNote.textContent = 'Enviando...';
    setTimeout(() => {
      formNote.textContent = 'Mensagem enviada! Obrigada — eu responderei em breve.';
      form.reset();
    }, 900);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
