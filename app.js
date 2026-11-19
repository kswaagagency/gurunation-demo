(() => {
  const intro = document.getElementById('intro');
  const skip = document.getElementById('skipIntro');
  const finishIntro = () => {
    if (!intro || intro.classList.contains('is-done')) return;
    intro.classList.add('is-done');
    document.body.classList.remove('is-loading');
    window.setTimeout(() => intro.remove(), 900);
  };
  window.setTimeout(finishIntro, 5000);
  skip?.addEventListener('click', finishIntro);

  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.desktop-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();

  const revealTargets = document.querySelectorAll('.manifesto-copy,.collection-card,.campaign-copy,.look,.forthe-copy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealTargets.forEach(el => {
      el.classList.add('will-reveal');
      observer.observe(el);
    });
  }
})();