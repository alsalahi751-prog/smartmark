// ---------- مصفوفات البيانات ----------
let items = [];
let folders = [];

// ---------- إضافة محتوى ----------
function addItem() {
  const title = document.getElementById("titleInput").value.trim();
  const link = document.getElementById("linkInput").value.trim();

  if (!title || !link) {
    alert("يرجى ملء جميع الحقول");
    return;
  }

  items.push({ title, link });
  saveData();
  alert("تم حفظ المحتوى بنجاح");
  renderContents();
}

// ---------- عرض المحتوى ----------
function renderContents() {
  const list = document.getElementById("itemList");
  if (!list) return;

  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<li class='empty-message'>لا يوجد محتوى محفوظ</li>";
    return;
  }

  const header = document.createElement("li");
  header.style.fontWeight = "bold";
  header.style.marginBottom = "10px";
  header.textContent = "📌 المحتوى المحفوظ:";
  list.appendChild(header);

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ${item.link}`;

    // زر الحذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
        items.splice(index, 1);
        saveData();
        renderContents();
      }
    };
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// ---------- حفظ البيانات في localStorage ----------
function saveData() {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("folders", JSON.stringify(folders));
}

// ---------- تحميل البيانات عند بدء التطبيق ----------
function loadData() {
  const savedItems = JSON.parse(localStorage.getItem("items"));
  const savedFolders = JSON.parse(localStorage.getItem("folders"));

  if (savedItems) items = savedItems;
  if (savedFolders) folders = savedFolders;

  renderContents();
  renderFolders();
}

// ---------- إضافة مجلد ----------
function toggleFolderInput() {
  const input = document.getElementById("folderInput");
  input.style.display = input.style.display === "none" ? "block" : "none";
}

function addFolder() {
  const input = document.getElementById("folderInput");
  const name = input.value.trim();
  if (!name) return;
  folders.push(name);
  input.value = "";
  input.style.display = "none";
  saveData();
  renderFolders();
}

// ---------- عرض المجلدات ----------
function renderFolders() {
  const list = document.getElementById("folderList");
  if (!list) return;
  list.innerHTML = "";
  if (folders.length === 0) return;

  folders.forEach((folder, index) => {
    const li = document.createElement("li");
    li.textContent = folder;

    // زر الحذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المجلد؟")) {
        folders.splice(index, 1);
        saveData();
        renderFolders();
      }
    };
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// ---------- تفعيل عند تحميل الصفحة ----------
window.onload = () => {
  loadData();
};
