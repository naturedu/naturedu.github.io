(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  let lang = 'en', expanded = true, topic = 'all', paperLanguage = 'all';
  const papers = [...document.querySelectorAll('.paper')];
  const toast = (message) => { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2600); };
  function applyLanguage(next) {
    lang = next;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[lang]; });
    $('#language-toggle').textContent = lang === 'en' ? '中文' : 'EN';
    $('#language-toggle').setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
    $('#paper-search').placeholder = lang === 'en' ? 'Search articles or methods…' : '搜索论文、期刊或研究方法…';
    $('#paper-search').setAttribute('aria-label', lang === 'en' ? 'Search articles or methods' : '搜索论文、期刊或研究方法');
    $('#copy-email').setAttribute('aria-label', lang === 'en' ? 'Copy email address' : '复制邮箱地址');
    try { localStorage.setItem('sd-language', lang); } catch (_) {}
    filterPapers();
  }
  function filterPapers() {
    const query = $('#paper-search').value.toLowerCase().trim();
    const matches = papers.filter(p => (topic === 'all' || p.dataset.topic === topic) && (paperLanguage === 'all' || p.dataset.language === paperLanguage) && (!query || p.dataset.search.includes(query)));
    const limit = expanded || query || topic !== 'all' || paperLanguage !== 'all' ? Infinity : 3;
    papers.forEach(p => { p.hidden = !matches.includes(p) || matches.indexOf(p) >= limit; });
    $('#no-results').hidden = matches.length > 0;
    $('#show-all').hidden = Boolean(query) || topic !== 'all' || paperLanguage !== 'all';
    $('#show-all').innerHTML = (expanded ? (lang === 'en' ? 'Collapse publication list' : '收起论文列表') : (lang === 'en' ? `View all ${papers.length} publications` : `查看全部${papers.length}篇论文`)) + '<span>' + (expanded ? '↑' : '↓') + '</span>';
    $('#result-count').textContent = lang === 'en' ? `${matches.length} publications match your filters.` : `找到${matches.length}篇匹配论文。`;
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (_) { const el = document.createElement('textarea'); el.value = text; el.style.position = 'fixed'; el.style.opacity = '0'; document.body.append(el); el.select(); const ok = document.execCommand('copy'); el.remove(); return ok; }
  }
  $('#language-toggle').addEventListener('click', () => applyLanguage(lang === 'en' ? 'zh' : 'en'));
  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    $('#theme-toggle').setAttribute('aria-pressed', String(next === 'dark'));
    try { localStorage.setItem('sd-theme', next); } catch (_) {}
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    filterPapers();
  }));
  document.querySelectorAll('[data-paper-language]').forEach(button => button.addEventListener('click', () => {
    paperLanguage = button.dataset.paperLanguage;
    document.querySelectorAll('[data-paper-language]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    filterPapers();
  }));
  $('#paper-search').addEventListener('input', filterPapers);
  $('#show-all').addEventListener('click', () => { expanded = !expanded; filterPapers(); if (!expanded) $('#publications').scrollIntoView({block:'start'}); });
  $('#copy-email').addEventListener('click', async () => toast(await copy('dusixian16@163.com') ? (lang === 'en' ? 'Email address copied' : '邮箱地址已复制') : (lang === 'en' ? 'Please select and copy the email address' : '请选中邮箱地址复制')));
  let activeBib = '';
  document.querySelectorAll('[data-cite]').forEach(button => button.addEventListener('click', () => {
    const p = window.PUBLICATIONS[Number(button.dataset.cite)];
    activeBib = p.bibtex;
    $('#citation-text').textContent = activeBib;
    $('#citation-dialog h2').textContent = lang === 'en' ? 'Citation' : '论文引用';
    $('#copy-citation').textContent = lang === 'en' ? 'Copy BibTeX' : '复制 BibTeX';
    $('#citation-dialog').showModal();
  }));
  $('#close-citation').addEventListener('click', () => $('#citation-dialog').close());
  $('#copy-citation').addEventListener('click', async () => toast(await copy(activeBib) ? (lang === 'en' ? 'BibTeX copied' : 'BibTeX 已复制') : (lang === 'en' ? 'Select the citation to copy it' : '请选中引用内容复制')));
  $('#citation-dialog').addEventListener('click', e => { if (e.target === $('#citation-dialog')) { const r=e.target.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close(); } });
  document.addEventListener('keydown', e => { if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !$('#citation-dialog').open) { e.preventDefault(); $('#paper-search').focus(); } });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('current', a.dataset.nav === e.target.id)); }), {rootMargin:'-12% 0px -62% 0px'});
    document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
  }
  let initialLanguage = 'en';
  try { initialLanguage = localStorage.getItem('sd-language') || 'en'; } catch (_) {}
  applyLanguage(initialLanguage === 'zh' ? 'zh' : 'en');
})();
