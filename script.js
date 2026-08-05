const WA_NUMBER = "573045768869";

function money(n) {
  return "$" + n.toLocaleString("es-CO");
}

function waLink(model, color) {
  const text = `Hola, quiero pedir el modelo ${model} color ${color}. ¿Está disponible?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const waIcon = `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.03 3C9.4 3 4 8.4 4 15.03c0 2.23.6 4.3 1.66 6.1L4 29l8.06-2.1a11.9 11.9 0 0 0 3.97.68c6.63 0 12.03-5.4 12.03-12.03C28.06 8.4 22.66 3 16.03 3zm0 21.8c-1.9 0-3.7-.55-5.2-1.5l-.37-.22-3.68.96.98-3.6-.24-.37a9.6 9.6 0 0 1-1.5-5.14c0-5.3 4.3-9.6 9.6-9.6s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm5.3-7.2c-.3-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.2.28-.75.93-.92 1.13-.17.2-.34.22-.63.08-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.6.13-.14.3-.34.44-.5.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.14-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5h-.56c-.2 0-.5.07-.77.37-.26.3-1 1-1 2.42 0 1.43 1.03 2.8 1.18 3 .14.2 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6.69.22 1.32.19 1.82.12.55-.08 1.7-.7 1.95-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.2-.56-.34z"/></svg>`;

function cardHTML(p) {
  return `
    <article class="card">
      <div class="card__imgwrap">
        <img src="${p.image}" alt="${p.model} color ${p.color}" loading="lazy">
      </div>
      <div class="card__body">
        <p class="card__color">${p.color}</p>
        <div class="card__bottom">
          <span class="tag">${money(p.price)}</span>
          <a class="card__wa" href="${waLink(p.model, p.color)}" target="_blank" rel="noopener" aria-label="Pedir ${p.model} ${p.color} por WhatsApp">${waIcon}</a>
        </div>
      </div>
    </article>
  `;
}

async function init() {
  const res = await fetch("data/products.json");
  const products = await res.json();

  const byModel = {};
  for (const p of products) {
    (byModel[p.model] = byModel[p.model] || []).push(p);
  }

  const modelOrder = Object.keys(byModel);
  const nav = document.getElementById("modelNav");
  const main = document.getElementById("catalog");

  for (const model of modelOrder) {
    const items = byModel[model];

    nav.innerHTML += `<a href="#${model}">${model}</a>`;

    const materials = [...new Set(items.map(i => i.material))];
    const mixed = materials.length > 1 && materials.some(m => m);

    let groupsHTML = "";
    if (mixed) {
      for (const mat of materials) {
        const matItems = items.filter(i => i.material === mat);
        groupsHTML += `
          <p class="matgroup__label">${mat} — ${money(matItems[0].price)}</p>
          <div class="grid">${matItems.map(cardHTML).join("")}</div>
        `;
      }
    } else {
      groupsHTML = `<div class="grid">${items.map(cardHTML).join("")}</div>`;
    }

    main.innerHTML += `
      <section class="section" id="${model}">
        <div class="section__head">
          <h2 class="section__model">${model}</h2>
          <span class="section__count">${items.length} ${items.length === 1 ? "color" : "colores"} · desde ${money(Math.min(...items.map(i => i.price)))}</span>
        </div>
        <div class="stitch"></div>
        ${groupsHTML}
      </section>
    `;
  }
}

init();

// mobile: tap "Modelos" to reveal/scroll the pill nav
document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("modelNav").scrollIntoView({ behavior: "smooth" });
});
