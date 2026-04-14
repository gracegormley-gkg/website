// components.js — SiteNav and SiteFooter web components

class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.split('/').pop() || 'index.html';

    const links = [
      { href: 'index.html',      label: 'About' },
      { href: 'clips.html',      label: 'Clips' },
      { href: 'photos.html',     label: 'Photography' },
      { href: 'video.html',      label: 'Video' },
      { href: 'knight-lab.html', label: 'Data Science' },
      { href: 'suso-camp.html',  label: 'Service' },
      { href: 'awards.html',     label: 'Awards' },
    ];

    this.innerHTML = `
      <nav class="site-nav">
        <div class="site-nav__brand"><a href="index.html">Grace Gormley</a></div>
        <ul class="site-nav__links">
          ${links.map(l => `<li><a href="${l.href}"${path === l.href ? ' class="active"' : ''}>${l.label}</a></li>`).join('\n          ')}
        </ul>
      </nav>
    `;
  }
}

customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <a href="mailto:gracegormley@gmail.com">gracegormley@gmail.com</a>
        &nbsp;&mdash;&nbsp;
        <a href="https://www.linkedin.com/in/grace-gormley/" target="_blank" rel="noopener">LinkedIn</a>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
