window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 2000);
  });
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX - 5 + 'px';
    cursor.style.top = mouseY - 5 + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX - 20) * 0.12;
    ringY += (mouseY - ringY - 20) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .menu-card, .t-dot').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.transform = 'scale(1.5)'; ring.style.borderColor = 'var(--gold-light)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; ring.style.borderColor = 'var(--gold)'; });
  });
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));
  const testimonials = [
    { quote: '"Palm Spring is not just a restaurant — it is a pilgrimage."', author: '— Chidi Ekwueme, · Customer\'s Review' },
    { quote: '"An experience that transcends dining — Palm Spring is where Nigeria\'s cultural pride lives, breathes, and sings on every plate."', author: '— Emeka Ibe, Customer\'s Review' },
    { quote: '"From the moment you step in, Palm Spring envelops you in a world of elegance and flavor. Each dish is a masterpiece, a testament to the rich culinary heritage of Nigeria."', author: '— Amina Yusuf, Customer\'s Review' }
];
  let currentT = 0;
  function changeTestimonial(idx) {
    const textEl = document.getElementById('testimonialText');
    const authorEl = document.getElementById('testimonialAuthor');
    const dots = document.querySelectorAll('.t-dot');
    textEl.style.opacity = 0; textEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
      currentT = idx;
      textEl.textContent = testimonials[idx].quote;
      authorEl.textContent = testimonials[idx].author;
      textEl.style.opacity = 1; textEl.style.transform = 'translateY(0)';
    }, 300);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  setInterval(() => changeTestimonial((currentT + 1) % testimonials.length), 5000);
  document.getElementById('testimonialText').style.transition = 'all 0.4s ease';
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroImgs = document.querySelectorAll('.hero-img-left img, .hero-img-right img');
    heroImgs.forEach(img => { img.style.transform = `scale(1.1) translateY(${scrollY * 0.1}px)`; });
  });