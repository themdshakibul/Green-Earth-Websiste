const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");

// async function
async function loadCategories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  data.categories.forEach((categories) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full text-xl text-base-content";
    btn.textContent = categories.category_name;
    categoriesContainer.appendChild(btn);
  });
}

async function loadTrees() {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayTrees(data.plants);
}

function displayTrees(trees) {
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 shadow-sm";
    card.innerHTML = `
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Card Title</h2>
          <p class="line-clamp-2">
            A card component has a figure, a body part, and inside body
            there are title and actions parts
          </p>
          <div
            class="badge badge-outline rounded-full text-success px-4"
          >
            NEW
          </div>
          <div class="card-actions items-center flex justify-between">
            <h2 class="font-bold text-xl text-success">$5000</h2>
            <button class="btn btn-primary">Add To Card</button>
          </div>
        </div>
    `;
    treesContainer.appendChild(card);
  });
}

loadCategories();
loadTrees();
