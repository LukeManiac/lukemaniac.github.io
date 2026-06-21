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
      openItem.style.transformOrigin = "center";
    });

    // open current if closed
    if (!isOpen) {
      item.classList.add('open');
      readme.style.height = readme.scrollHeight + "px";
    }
  });

  // MAGNETIC transform origin (cursor-based zoom pivot)
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const originX = ((1 - x) * 100).toFixed(1) + '%';
    const originY = ((1 - y) * 100).toFixed(1) + '%';

    item.style.transformOrigin = `${originX} ${originY}`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transformOrigin = 'center';
  });

});

document.querySelectorAll('.glass').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty('--x', x + '%');
    el.style.setProperty('--y', y + '%');
  });
});