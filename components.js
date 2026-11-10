// components.js — SiteNav and SiteFooter web components

const SECTIONS = [
  { href: 'clips.html',        label: 'clips' },
  { href: 'photos.html',       label: 'photography' },
  { href: 'video.html',        label: 'video' },
  { href: 'service.html',      label: 'service',      activeOn: ['service.html', 'suso-camp.html'] },
  { href: 'data-science.html', label: 'data science', activeOn: ['data-science.html', 'knight-lab.html'] },
  { href: 'awards.html',       label: 'awards' },
];

class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.split('/').pop() || 'index.html';

    const items = SECTIONS.map((s, i) => {
      const active = (s.activeOn || [s.href]).includes(path);
      return `<li><a href="${s.href}"${active ? ' class="active" aria-current="page"' : ''}><span>${i + 1}</span>${s.label}</a></li>`;
    }).join('');

    this.innerHTML = `
      <header class="site-header">
        <p class="site-header__id"><a href="index.html"><b>grace gormley</b></a><br>journalism and data science</p>
        <nav aria-label="Main"><ol>${items}</ol></nav>
        <p class="site-header__mail"><a href="mailto:gracegormley@gmail.com">gracegormley@gmail.com</a></p>
      </header>
    `;
  }
}

customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const credit = this.getAttribute('credit');
    this.innerHTML = `
      <footer class="colophon">
        <p><a href="assets/Grace-Gormley-Resume.pdf" download="Grace-Gormley-Resume.pdf">resume, pdf</a></p>
        <p><a href="https://www.linkedin.com/in/grace-gormley/" target="_blank" rel="noopener">linkedin</a><br><a href="https://github.com/gracegormley-gkg" target="_blank" rel="noopener">github</a></p>
        <p>${credit ? `portrait<br>${credit}` : ''}</p>
        <p class="colophon__year red">2026</p>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
