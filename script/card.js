const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpiner = document.getElementById("loadingSpiner");
const allTreesBtn = document.getElementById("allTreesBtn");

// modal
const treeDetailsModal = document.getElementById("treeDetailsModal");
const modalTitle = document.getElementById("modalTitle");
const modalInage = document.getElementById("modalInage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const totalItem = document.getElementById("totalItem");
const card = [];

function ShowLoading() {
  loadingSpiner.classList.remove("hidden");
  loadingSpiner.classList.add("flex");
  treesContainer.innerHTML = "";
}

function hiddenLoading() {
  loadingSpiner.classList.add("hidden");
}

// Load categories btn
async function loadCategories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  data.categories.forEach((categories) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full text-xl text-base-content";
    btn.textContent = categories.category_name;
    btn.onclick = () => selectCategory(categories.id, btn);
    categoriesContainer.appendChild(btn);
  });
}

async function selectCategory(categoriesId, btn) {
  console.log(categoriesId, btn);
  ShowLoading();
  const allbuttons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesBtn",
  );
  allbuttons.forEach((btn) => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-outline");
  });
  btn.classList.add("btn-success");
  btn.classList.remove("btn-outline");

  fetch(`https://openapi.programming-hero.com/api/category/${categoriesId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayTrees(data.plants);
    });
  hiddenLoading();
}

allTreesBtn.addEventListener("click", () => {
  // update active btn style
  const allbuttons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesBtn",
  );
  console.log(allbuttons);
  allbuttons.forEach((btn) => {
    console.log(btn);
    btn.classList.remove("btn-success");
    btn.classList.add("btn-outline");
  });
  allTreesBtn.classList.add("btn-success");
  allTreesBtn.classList.remove("btn-outline");

  loadTrees();
});

async function loadTrees() {
  ShowLoading();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hiddenLoading();
  displayTrees(data.plants);
}

function displayTrees(trees) {
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 shadow-sm";
    card.innerHTML = `
        <figure>
          <img
            src="${tree.image}"
            alt="${tree.name}"
            title="${tree.name}"
            onclick="openTreeModal(${tree.id})"
            class="cursor-pointer h-40 w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title cursor-pointer" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
          <p class="line-clamp-2">
            ${tree.description}
          </p>
          <div
            class="badge badge-outline rounded-full text-success px-4"
          >
            ${tree.category}
          </div>
          <div class="card-actions items-center flex justify-between">
            <h2 class="font-bold text-xl text-success">$${tree.price}</h2>
            <button class="btn btn-success" onclick="addToCard(${tree.id}, '${tree.name}', '${tree.price}')">Card</button>
          </div>
        </div>
    `;
    treesContainer.appendChild(card);
  });
}

const openTreeModal = (treeId) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`)
    .then((res) => res.json())
    .then((detail) => {
      const plant = detail.plants;

      modalTitle.textContent = plant.name;
      modalInage.src = plant.image;
      modalCategory.textContent = plant.category;
      modalDescription.textContent = plant.description;
      modalPrice.textContent = plant.price;

      treeDetailsModal.showModal();
    });
};

function addToCard(id, name, price) {
  const existingItems = card.find((item) => item.id == id);
  if (existingItems) {
    existingItems.quantity++;
  } else {
    card.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }

  updateCard();
}

function updateCard() {
  cardContainer.innerHTML = "";
  card.forEach((item) => {
    const cardItem = document.createElement("div");
    cardItem.className = "card card-body bg-base-100 shadow-xl";
    cardItem.innerHTML = `
        <div class="flex justify-between items-center">
           <div class="text-xl font-semibold">
             <h2>${item.name}</h2>
             <p>$${item.price} x ${item.quantity}</p>
           </div>
           <button class="btn btn-ghost">X</button>
         </div>
         <p class="font-semibold text-xl text-right">$${item.price * item.quantity}</p>
    `;
    cardContainer.appendChild(cardItem);
  });
}

loadCategories();
loadTrees();
