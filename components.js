// components.js — SiteNav and SiteFooter web components

class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.split('/').pop() || 'index.html';

    const links = [
      { href: 'index.html',   label: 'About' },
      { href: 'clips.html',   label: 'Clips' },
      { href: 'photos.html',  label: 'Photography' },
      { href: 'video.html',   label: 'Video' },
      {
        label: 'Data Science',
        href: 'data-science.html',
        activeOn: ['data-science.html', 'knight-lab.html'],
        children: [
          { href: 'knight-lab.html', label: 'EIS Archives' },
        ]
      },
      {
        label: 'Service',
        href: 'service.html',
        activeOn: ['service.html', 'suso-camp.html'],
        children: [
          { href: 'suso-camp.html', label: 'SUSO Camp' },
        ]
      },
      { href: 'awards.html',  label: 'Awards' },
    ];

    const renderLink = l => {
      if (l.children) {
        const isActive = (l.activeOn || [l.href]).includes(path);
        return `<li class="nav-dropdown">
            <a href="${l.href}"${isActive ? ' class="active"' : ''}>${l.label}<span class="nav-dropdown__caret" aria-hidden="true">▾</span></a>
            <ul class="nav-dropdown__menu">
              ${l.children.map(c =>
                `<li><a href="${c.href}"${path === c.href ? ' class="active-child"' : ''}>${c.label}</a></li>`
              ).join('\n              ')}
            </ul>
          </li>`;
      }
      return `<li><a href="${l.href}"${path === l.href ? ' class="active"' : ''}>${l.label}</a></li>`;
    };

    this.innerHTML = `
      <nav class="site-nav">
        <div class="site-nav__brand"><a href="index.html">Grace Gormley</a></div>
        <ul class="site-nav__links">
          ${links.map(renderLink).join('\n          ')}
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
