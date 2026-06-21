// Reveal animation
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));


// Toggle util menu
const toggleBtn = document.getElementById('toggleUtil');
const utilMenu = document.getElementById('utilMenu');
const arrow = document.querySelector('.arrow');

toggleBtn.addEventListener('click', () => {
  utilMenu.classList.toggle('open');

  arrow.style.transform = utilMenu.classList.contains('open')
    ? 'rotate(180deg)'
    : 'rotate(0deg)';

  const items = utilMenu.querySelectorAll('.util-item');
  items.forEach((item, i) => {
    setTimeout(() => item.classList.add('show'), i * 120);
  });
});

document.querySelectorAll('.util-item').forEach(item => {
  item.style.cursor = "pointer";

  item.addEventListener('click', () => {
    const url = item.getAttribute('data-url');
    if (url) {
      window.open(url, "_blank");
    }
  });
});