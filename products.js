// Function to load and display products
function loadProducts(productsData) {
  const productsGrid = document.getElementById("productsGrid");
  const loading = document.getElementById("loading");

  loading.style.display = "none";

  // Loop through products and create cards
  productsData.products.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Fetch products from external JSON file
fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    loadProducts(data);
  })
  .catch((error) => {
    console.error("Error loading products:", error);
    document.getElementById("loading").textContent =
      "Error loading products. Please make sure products.json is in the same directory.";
  });

// Function to create a product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${
    product.name
  }" onerror="this.parentElement.innerHTML='📦'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">${product.price.toFixed(2)}</div>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart" data-id="${
                      product.id
                    }">Add to Cart</button>
                </div>
            `;

  return card;
}

// Add to cart functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const button = e.target;
    const productId = button.getAttribute("data-id");
    const productName = button
      .closest(".product-card")
      .querySelector(".product-name").textContent;

    button.textContent = "Added!";
    button.style.background = "#4a7c2c";

    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.background = "#2d5016";
    }, 2000);

    console.log(`Added to cart: ${productName} (ID: ${productId})`);
  }
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background =
      "linear-gradient(135deg, #1a3a0f 0%, #2d5016 100%)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)";
  }
});
