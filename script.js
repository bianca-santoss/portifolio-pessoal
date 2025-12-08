// JS avançado para o portfólio da Bianca
// Tudo criado para combinar com o design dark, moderno e minimalista
// Recursos incluídos:
// 1. Efeito de digitação (typing effect)
// 2. Botão voltar ao topo (já existia)
// 3. Animação de fade-in ao scroll
// 4. Scroll suave
// 5. Tema claro/escuro automático com toggle criado via JS
// 6. Background com transição suave
// 7. Animações nos cards
// 8. Cursor customizado
// 9. Destaque automático de sessão ativa ao rolar
// 10. Contadores animados (se adicionados futuramente)

//---------------------------------------------------------------
// 1. EFEITO DE DIGITAÇÃO NO SUBTÍTULO
//---------------------------------------------------------------
const subtitle = document.querySelector('header p');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeEffect, 70);
        }
    }
    typeEffect();
}

//---------------------------------------------------------------
// 2. SCROLL SUAVE
//---------------------------------------------------------------
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

//---------------------------------------------------------------
// 3. ANIMAÇÃO DE FADE-IN AO ROLAR
//---------------------------------------------------------------
const elements = document.querySelectorAll('section, header, footer, .projeto-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

//---------------------------------------------------------------
// 4. BOTÃO VOLTAR AO TOPO
//---------------------------------------------------------------
const topButton = document.createElement('button');
topButton.innerText = '↑';
topButton.id = 'topButton';
document.body.appendChild(topButton);
topButton.style.display = 'none';

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    topButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

//---------------------------------------------------------------
// 5. TEMA CLARO/ESCURO AUTOMÁTICO + TOGGLE
//---------------------------------------------------------------
const themeBtn = document.createElement('button');
themeBtn.id = 'themeToggle';
themeBtn.textContent = 'Tema';
document.body.appendChild(themeBtn);

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
});

//---------------------------------------------------------------
// 6. BACKGROUND COM TRANSIÇÃO SUAVE
//---------------------------------------------------------------
let hue = 0;
setInterval(() => {
    hue = (hue + 1) % 360;
    document.body.style.background = `linear-gradient(120deg, hsl(${hue}, 30%, 8%), #000)`;
}, 120);

//---------------------------------------------------------------
// 7. ANIMAÇÃO NOS CARDS
//---------------------------------------------------------------
const cards = document.querySelectorAll('.projeto-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `translateY(-5px) rotateX(${(y - rect.height/2)/30}deg) rotateY(${-(x - rect.width/2)/30}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `translateY(0px)`;
    });
});

//---------------------------------------------------------------
// 8. CURSOR CUSTOMIZADO
//---------------------------------------------------------------
const cursor = document.createElement('div');
cursor.id = 'cursorCustom';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

//---------------------------------------------------------------
// 9. DESTAQUE AUTOMÁTICO DA SEÇÃO ATIVA
//---------------------------------------------------------------
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (pageYOffset >= top) current = sec.getAttribute('id');
    });
});

//---------------------------------------------------------------
// 10. CONTADORES ANIMADOS (para futura seção de skills)
//---------------------------------------------------------------
function animateCounter(el, max) {
    let value = 0;
    const speed = 20;
    const update = setInterval(() => {
        value++;
        el.textContent = value;
        if (value >= max) clearInterval(update);
    }, speed);
}