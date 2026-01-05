// ---------- البيانات ----------
let items = [];
let folders = [];
let currentFolder = "عام";

// ---------- إضافة محتوى ----------
function addItem() {
  const title = document.getElementById("titleInput").value.trim();
  const link = document.getElementById("linkInput").value.trim();

  if (!title || !link) {
    alert("الرجاء إدخال عنوان ورابط المحتوى.");
    return;
  }

  items.push({ title, link, folder: currentFolder });
  saveData();
  alert("تم حفظ المحتوى بنجاح");
  renderContents();

  document.getElementById("titleInput").value = "";
  document.getElementById("linkInput").value = "";
}

// ---------- عرض المحتوى ----------
function renderContents() {
  const list = document.getElementById("itemList");
  if (!list) return;

  list.innerHTML = "";

  const filteredItems = currentFolder
    ? items.filter(item => item.folder === currentFolder)
    : items;

  if (filteredItems.length === 0) {
    list.innerHTML = '<li class="empty-message">لا يوجد محتوى في هذا المجلد</li>';
    return;
  }

  filteredItems.forEach((item, index) => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = item.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
        items.splice(items.indexOf(item), 1);
        saveData();
        renderContents();
      }
    };

    const moveBtn = document.createElement("button");
    moveBtn.textContent = "نقل";
    moveBtn.onclick = () => {
      const folderName = prompt("اكتب اسم المجلد:");
      if (!folderName) return;

      if (!folders.includes(folderName)) {
        alert("المجلد غير موجود");
        return;
      }

      item.folder = folderName;
      saveData();
      alert("تم نقل المحتوى بنجاح");
      renderContents();
    };

    li.appendChild(title);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ---------- حفظ / تحميل البيانات ----------
function saveData() {
  localStorage.setItem("smartmark_items", JSON.stringify(items));
  localStorage.setItem("smartmark_folders", JSON.stringify(folders));
}

function loadData() {
  const savedItems = JSON.parse(localStorage.getItem("smartmark_items"));
  const savedFolders = JSON.parse(localStorage.getItem("smartmark_folders"));
  if (savedItems) items = savedItems;
  if (savedFolders) folders = savedFolders;
  renderFolders();
}

// ---------- المجلدات ----------
function toggleFolderInput() {
  const input = document.getElementById("folderInput");
  input.style.display = input.style.display === "none" ? "block" : "none";
  input.focus();
}

function addFolder() {
  const input = document.getElementById("folderInput");
  const name = input.value.trim();
  if (!name) return;
  folders.push(name);
  saveData();
  renderFolders();
  input.value = "";
  input.style.display = "none";
}

function renderFolders() {
  const list = document.getElementById("folderList");
  if (!list) return;

  list.innerHTML = "";

  if (folders.length === 0) {
    list.innerHTML = '<li class="empty-message">لا يوجد مجلدات</li>';
    return;
  }

  folders.forEach((name, index) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    nameSpan.style.cursor = "pointer";
    nameSpan.style.fontWeight = "bold";
    nameSpan.onclick = () => {
      currentFolder = name;
      renderContents();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.onclick = () => {
      if (confirm("هل تريد حذف هذا المجلد؟")) {
        folders.splice(index, 1);
        // حذف كل المحتوى الذي كان في هذا المجلد
        items = items.filter(item => item.folder !== name);
        saveData();
        renderFolders();
        renderContents();
      }
    };

    li.appendChild(nameSpan);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ---------- إخفاء/إظهار محتوى القسم ----------
function toggleContentSection() {
  const section = document.getElementById("contentSection");
  if (!section) return;
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    renderContents();
  } else {
    section.style.display = "none";
  }
}

// إخفاء محتوى القسم عند تحميل الصفحة
window.addEventListener("load", () => {
  const contentSection = document.getElementById("contentSection");
  if (contentSection) contentSection.style.display = "none";
});

// تحميل البيانات عند فتح الصفحة
window.onload = loadData;
