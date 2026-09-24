// ── PROJETOS ──────────────────────────────────────────────────────────────────
const projects = [
  { id: 1070193438, title: 'Pokemon Infinite Fusion' },
  { id: 1066982033, title: 'Batman Joker\'s Maze' },
  { id: 1070681588, title: 'Gênio Quiz' },
  { id: 1070685533, title: 'Sonic e Mario' },
  { id: 1073877425, title: 'Spongebob Flight' },
  { id: 1064392867, title: 'Angry Birds Halloween' },
  { id: 1071826286, title: 'Super Minecraft Jump' },
  { id: 1070293458, title: 'Ghetto Heroes' },
  { id: 1073390686, title: 'Dark Ness' },
  { id: 1071804496, title: 'Tetris' },
  { id: 1066994031, title: 'Minecraft 2D' },
  { id: 1070549007, title: 'Mortal Kombat' },
  { id: 1067484457, title: 'Water Sort' },
  { id: 1067544239, title: 'Zumbis Famintos' },
  { id: 1067830709, title: 'Sonic 2' },
  { id: 1284877845, title: 'Sobrevivência Máxima' },
];

// Jogo em destaque (aparece no topo, ao lado do título)
const featured = { id: 745861471, title: 'Guitar Hero', img: 'guitar-hero.png' };

// ── STATE ─────────────────────────────────────────────────────────────────────
let currentIndex = 0; // null = jogo em destaque

// ── ELEMENTS ──────────────────────────────────────────────────────────────────
const grid    = document.getElementById('grid');
const modal   = document.getElementById('modal');
const iframe  = document.getElementById('iframe');
const mTitle = document.getElementById('modal-title');
const mLink  = document.getElementById('modal-link');

// ── THEME ─────────────────────────────────────────────────────────────────────
const themeBtn = document.getElementById('theme-toggle');
const saved    = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── INIT ──────────────────────────────────────────────────────────────────────
projects.forEach((p, idx) => grid.appendChild(createCard(p, idx)));
renderFeatured();

function renderFeatured() {
  const box = document.getElementById('featured');
  if (!box) return;
  box.innerHTML = `
    <div class="featured-thumb" style="--bg:url('${featured.img}')">
      <img
        src="${featured.img}"
        alt="${featured.title}"
        onerror="this.onerror=null;this.src='https://uploads.scratch.mit.edu/get_image/project/${featured.id}_480x360.png'">
      <div class="card-overlay">
        <div class="play-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
      <span class="featured-badge">★ DESTAQUE</span>
    </div>
    <div class="featured-body">
      <div class="card-title">${featured.title}</div>
    </div>`;
  const open = () => openProject(featured, null);
  box.addEventListener('click', open);
  box.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
}

function createCard(p, idx) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Abrir ${p.title}`);

  card.innerHTML = `
    <div class="card-thumb">
      <img
        src="https://uploads.scratch.mit.edu/get_image/project/${p.id}_480x360.png"
        alt="${p.title}"
        loading="lazy"
        onerror="this.src='https://placehold.co/480x360/13131F/F5FF4D?text=${encodeURIComponent(p.title)}'">
      <div class="card-overlay">
        <div class="play-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
      <span class="card-badge">${String(idx + 1).padStart(2, '0')}</span>
    </div>
    <div class="card-body">
      <div class="card-title">${p.title}</div>
    </div>`;

  const open = () => openModal(idx);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  return card;
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(index) {
  openProject(projects[index], index);
}

function openProject(p, index) {
  currentIndex = index;
  modal.classList.toggle('single', index === null); // esconde ‹ › no destaque
  mTitle.textContent = p.title;
  mLink.href         = `https://scratch.mit.edu/projects/${p.id}/`;
  iframe.src          = `https://scratch.mit.edu/projects/${p.id}/embed`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  iframe.src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  if (currentIndex === null) return;
  const next = currentIndex + dir;
  if (next >= 0 && next < projects.length) openModal(next);
}

document.getElementById('close-modal-btn').addEventListener('click', closeModal);
document.getElementById('prev-btn').addEventListener('click', () => navigate(-1));
document.getElementById('next-btn').addEventListener('click', () => navigate(1));
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (modal.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  }
});

// ── INIT ──────────────────────────────────────────────────────────────────────
