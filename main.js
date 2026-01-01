// ====== التخزين ======
let items = JSON.parse(localStorage.getItem("items")) || [];
let folders = JSON.parse(localStorage.getItem("folders")) || [];

// ====== حفظ البيانات ======
function saveData() {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("folders", JSON.stringify(folders));
}

// ====== إضافة محتوى ======
function addItem() {
  const title = document.getElementById("titleInput").value.trim();
  const link = document.getElementById("linkInput").value.trim();

  if (!title || !link) {
    alert("يرجى إدخال العنوان والرابط");
    return;
  }

  items.push({
    title,
    link,
    folder: null
  });

  saveData();
  renderItems();

  document.getElementById("titleInput").value = "";
  document.getElementById("linkInput").value = "";
}

// ====== عرض المحتوى المحفوظ ======
function renderContents() {
  renderItems();
}

// ====== رسم المحتويات ======
function renderItems() {
  const list = document.getElementById("itemList");
  if (!list) return;

  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<li>لا يوجد محتوى محفوظ</li>";
    return;
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.title}</strong><br>
      <a href="${item.link}" target="_blank">${item.link}</a><br>
      <button onclick="deleteItem(${index})">🗑 حذف</button>
    `;

    list.appendChild(li);
  });
}

// ====== حذف محتوى ======
function deleteItem(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;

  items.splice(index, 1);
  saveData();
  renderItems();
}

// ====== المجلدات ======
function toggleFolderInput() {
  const input = document.getElementById("folderInput");
  input.style.display = input.style.display === "none" ? "block" : "none";
}

function addFolder() {
  const name = document.getElementById("folderInput").value.trim();
  if (!name) return;

  folders.push(name);
  saveData();
  renderFolders();

  document.getElementById("folderInput").value = "";
  document.getElementById("folderInput").style.display = "none";
}

function renderFolders() {
  const list = document.getElementById("folderList");
  if (!list) return;

  list.innerHTML = "";

  folders.forEach((folder, index) => {
    const li = document.createElement("li");
    li.textContent = folder;
    list.appendChild(li);
  });
}

// ====== تحميل أولي ======
document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  renderFolders();
});
