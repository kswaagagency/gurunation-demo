(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.getElementById('intro');
  const skip = document.getElementById('skipIntro');
  let introFinished = false;
  const finishIntro = () => {
    if (!intro || introFinished) return;
    introFinished = true;
    intro.classList.add('done');
    document.body.classList.remove('loading');
    window.setTimeout(() => intro.remove(), 900);
  };
  const introTimer = window.setTimeout(finishIntro, reduceMotion ? 0 : 5000);
  skip?.addEventListener('click', () => { window.clearTimeout(introTimer); finishIntro(); });

  const menu = document.getElementById('menu');
  const nav = document.getElementById('nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const targets = document.querySelectorAll('.statement-copy,.tile,.campaign-copy,.look,.finale-stamp,.finale h2,.manifesto-words span,.manifesto-note');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    targets.forEach((target, i) => {
      target.classList.add('reveal');
      target.style.transitionDelay = reduceMotion ? '0ms' : Math.min(i % 5, 4) * 85 + 'ms';
      observer.observe(target);
    });
  } else targets.forEach(target => target.classList.add('visible'));

  if (!reduceMotion) {
    const progress = document.getElementById('scrollProgress');
    const heroPhoto = document.querySelector('[data-parallax]');
    const campaignPhoto = document.querySelector('.campaign>img');
    const manifestoWords = [...document.querySelectorAll('.manifesto-words span')];
    let ticking = false;
    const paintScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
      const y = window.scrollY;
      if (heroPhoto && y < window.innerHeight * 1.5) heroPhoto.style.transform = 'translate3d(0,' + (y * .16) + 'px,0) scale(1.08)';
      if (campaignPhoto) {
        const rect = campaignPhoto.parentElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) campaignPhoto.style.transform = 'translate3d(0,' + ((rect.top - window.innerHeight) * -.09) + 'px,0) scale(1.12)';
      }
      const manifesto = document.querySelector('.motion-manifesto');
      if (manifesto) {
        const rect = manifesto.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        manifestoWords.forEach((word, i) => {
          const direction = i % 2 ? -1 : 1;
          word.style.transform = 'translate3d(' + (direction * (1-p) * 34) + 'px,' + ((1-p) * 18) + 'px,0) rotate(' + (direction * (1-p) * 3) + 'deg)';
        });
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(paintScroll); ticking = true; }
    }, { passive: true });
    paintScroll();

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('pointermove', event => {
          const r = tile.getBoundingClientRect();
          const x = (event.clientX - r.left) / r.width - .5;
          const y = (event.clientY - r.top) / r.height - .5;
          tile.style.transform = 'perspective(900px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-3px)';
        });
        tile.addEventListener('pointerleave', () => { tile.style.transform = ''; });
      });
    }
  }
})();