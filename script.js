// Painel de controle dos links da Liumini Home.
// Para ativar um canal, preencha "url". Deixe null para manter como "Em breve".
// Para adicionar um produto, inclua um item em "Produtos" com { key, label, url }.
// "primary: true" marca um canal como principal (CTA em destaque). Com "ctaLabel"
// definido, o texto do CTA some assim que "url" for preenchido — sem precisar
// mexer em mais nada.
const SECTIONS = [
  {
    title: "Produtos",
    icon: "box",
    items: [],
    emptyLabel: "Em breve, novos produtos em destaque",
  },
  {
    title: "Lojas",
    icon: "shop",
    items: [
      { key: "mercadolivre", label: "Mercado Livre", url: null },
      { key: "shopee", label: "Shopee", url: null },
      { key: "tiktokshop", label: "TikTok Shop", url: null },
    ],
  },
  {
    title: "Redes Sociais",
    icon: "social",
    items: [
      {
        key: "whatsapp",
        label: "WhatsApp",
        url: null,
        primary: true,
        ctaLabel: "Comprar pelo WhatsApp",
      },
      {
        key: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/liuminihome/",
      },
      { key: "facebook", label: "Facebook", url: null },
      { key: "tiktok", label: "TikTok", url: null },
    ],
  },
];

const ICONS = {
  whatsapp:
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  facebook:
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  mercadolivre:
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  shopee:
    '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  tiktokshop:
    '<path d="M3 9l1-5h16l1 5"/><path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/><path d="M5 9v10h14V9"/><path d="M9 21v-6h6v6"/>',
  tiktok:
    '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  box:
    '<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>',
  social:
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  shop:
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
};

const CHEVRON = '<polyline points="9 18 15 12 9 6"/>';

function svg(inner, extraClass) {
  return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

function renderItem(item) {
  const icon = svg(ICONS[item.key] || "", "");
  const isActive = Boolean(item.url);
  const isPrimary = Boolean(item.primary);

  if (isActive) {
    const label = isPrimary && item.ctaLabel ? item.ctaLabel : item.label;
    const cls = ["link-item", "active", isPrimary ? "primary" : ""].filter(Boolean).join(" ");
    return `
      <a class="${cls}" href="${item.url}" target="_blank" rel="noopener noreferrer" data-key="${item.key}">
        <span class="link-icon">${icon}</span>
        <span class="link-label">${label}</span>
        ${svg(CHEVRON, "link-chevron")}
      </a>`;
  }

  const cls = ["link-item", "disabled", isPrimary ? "primary-pending" : ""].filter(Boolean).join(" ");
  return `
    <div class="${cls}" aria-disabled="true" data-key="${item.key}">
      <span class="link-icon">${icon}</span>
      <span class="link-label">${item.label}</span>
      <span class="badge">Em breve</span>
    </div>`;
}

function renderSection(section) {
  const body = section.items.length
    ? section.items.map(renderItem).join("")
    : `
      <div class="empty-state">
        ${svg(ICONS.box, "")}
        <p>${section.emptyLabel || "Em breve"}</p>
      </div>`;

  return `
    <section class="box section-box">
      <div class="section-box-header">
        <span class="section-icon">${svg(ICONS[section.icon] || "", "")}</span>
        <h2 class="section-title">${section.title}</h2>
      </div>
      <div class="section-items">${body}</div>
    </section>`;
}

function renderLinks() {
  const root = document.getElementById("links-root");
  if (!root) return;
  root.innerHTML = SECTIONS.map(renderSection).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderLinks();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
