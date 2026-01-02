/*********************************
 * 1️⃣ Data Layer
 *********************************/
let items = [];
let folders = [];


/*********************************
 * 2️⃣ Storage Layer
 *********************************/
function saveData() {
  localStorage.setItem("smartmark_items", JSON.stringify(items));
  localStorage.setItem("smartmark_folders", JSON.stringify(folders));
}

function loadData() {
  const savedItems = localStorage.getItem("smartmark_items");
  const savedFolders = localStorage.getItem("smartmark_folders");

  items = savedItems ? JSON.parse(savedItems) : [];
  folders = savedFolders ? JSON.parse(savedFolders) : [];
}


/*********************************
 * 3️⃣ Logic Layer
 *********************************/
function addItem() {
  const titleInput = document.getElementById("titleInput");
  const linkInput = document.getElementById("linkInput");

  if (!titleInput || !linkInput) return;

  const title = titleInput.value.trim();
  const link = linkInput.value.trim();

  if (!title) {
    alert("يرجى إدخال عنوان المحتوى");
    return;
  }

  items.push({
    id: Date.now(),
    title,
    link
  });

  titleInput.value = "";
  linkInput.value = "";

  saveData();
  renderItems();
}

function deleteItem(id) {
  if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;

  items = items.filter(item => item.id !== id);
  saveData();
  renderItems();
}

function addFolder() {
  const input = document.getElementById("folderInput");
  if (!input) return;

  const name = input.value.trim();
  if (!name) return;

  folders.push({
    id: Date.now(),
    name
  });

  input.value = "";
  input.style.display = "none";

  saveData();
  renderFolders();
}

function toggleFolderInput() {
  const input = document.getElementById("folderInput");
  if (!input) return;

  input.style.display = input.style.display === "none" ? "block" : "none";
}


/*********************************
 * 4️⃣ Render Layer
 *********************************/
function renderItems() {
  const list = document.getElementById("itemList");
  if (!list) return;

  list.innerHTML = "";

  if (!items || items.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "📭 لا يوجد محتوى محفوظ";
    empty.style.opacity = "0.6";
    list.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "12px";
    li.style.padding = "10px";
    li.style.border = "1px solid #e5e7eb";
    li.style.borderRadius = "8px";

    const title = document.createElement("div");
    title.textContent = item.title || "بدون عنوان";
    title.style.fontWeight = "bold";

    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = item.link;
    link.target = "_blank";
    link.style.display = "block";
    link.style.margin = "6px 0";

    const actions = document.createElement("div");

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑 حذف";
    delBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
        items.splice(index, 1);
        saveData();
        renderItems();
      }
    };

    actions.appendChild(delBtn);

    li.appendChild(title);
    li.appendChild(link);
    li.appendChild(actions);

    list.appendChild(li);
  });
}


  items.forEach(item => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = item.title;

    const actions = document.createElement("span");

    if (item.link) {
      const openBtn = document.createElement("button");
      openBtn.textContent = "فتح";
      openBtn.onclick = () => window.open(item.link, "_blank");
      actions.appendChild(openBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.onclick = () => deleteItem(item.id);
    actions.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function renderFolders() {
  const list = document.getElementById("folderList");
  if (!list) return;

  list.innerHTML = "";

  folders.forEach(folder => {
    const li = document.createElement("li");
    li.textContent = folder.name;
    list.appendChild(li);
  });
}

// زر "عرض المحتوى المحفوظ"
function renderContents() {
  renderItems();
}


/*********************************
 * 5️⃣ Init
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderFolders();
  renderItems();
});
