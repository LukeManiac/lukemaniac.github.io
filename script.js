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
  const header = item.querySelector('.util-header');
  const clickArea = item.querySelector('.util-click-area');
  const readme = item.querySelector('.util-readme');

  // OPEN URL when clicking title
  header.addEventListener('click', (e) => {
    const url = item.getAttribute('data-url');
    if (url) window.open(url, "_blank");
  });

  // TOGGLE README when clicking body
  clickArea.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .util-header')) return;

    const isOpen = item.classList.contains('open');

    // close all others
    document.querySelectorAll('.util-item.open').forEach(openItem => {
      const openReadme = openItem.querySelector('.util-readme');
      openItem.classList.remove('open');
      openReadme.style.height = "0px";
    });

    // open current if closed
    if (!isOpen) {
      item.classList.add('open');
      readme.style.height = readme.scrollHeight + "px";
    }
  });
});