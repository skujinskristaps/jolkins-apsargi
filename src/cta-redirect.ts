document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
  if (link?.getAttribute('href') === '/kontakti' && link.classList.contains('button')) {
    event.preventDefault();
    window.history.pushState({}, '', '/drošibas-tests');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
});

const updateCtaLabel = () => {
  document.querySelectorAll<HTMLAnchorElement>('a[href="/kontakti"]').forEach((link) => {
    if (link.textContent?.includes('Pārrunāt iekšējās zādzības riskus')) {
      const icon = link.querySelector('svg');
      link.textContent = 'Sākt drošības testu';
      if (icon) link.appendChild(icon);
    }
  });
};

updateCtaLabel();
new MutationObserver(updateCtaLabel).observe(document.documentElement, { childList: true, subtree: true });
