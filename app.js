(() => {
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
  const introTimer = window.setTimeout(finishIntro, 5000);
  skip?.addEventListener('click', () => {
    window.clearTimeout(introTimer);
    finishIntro();
  });

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

  const targets = document.querySelectorAll('.statement-copy,.tile,.campaign-copy,.look,.finale-stamp,.finale h2');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(target => {
      target.classList.add('reveal');
      observer.observe(target);
    });
  } else {
    targets.forEach(target => target.classList.add('visible'));
  }
})();