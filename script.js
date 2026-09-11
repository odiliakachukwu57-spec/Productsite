const accentColors = ['#3452FF', '#FF6B4A', '#15181C', '#3452FF', '#FF6B4A'];

function getInitials(title) {
  return title
    .split(' ')
    .filter(word => word.length > 0)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();

  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const color = accentColors[index % accentColors.length];

    const thumbHTML = product.image
      ? `<img src="${product.image}" alt="${product.title}" class="product-thumb-img">`
      : `<div class="product-thumb" style="background:${color}">${getInitials(product.title)}</div>`;

    card.innerHTML = `
      ${thumbHTML}
      <div class="product-body">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span class="price">$${product.price}</span>
          <span class="tag">${product.platform}</span>
        </div>
      </div>
      <a href="${product.link}" target="_blank" rel="noopener" class="buy-link">View on ${product.platform}</a>
    `;

    grid.appendChild(card);
  });
}

loadProducts();
