// ---------- البيانات ----------
let items = [];
let folders = [];

// ---------- إضافة محتوى ----------
function addItem() {
  const title = document.getElementById("titleInput").value.trim();
  const link = document.getElementById("linkInput").value.trim();

  if (!title || !link) {
    alert("الرجاء إدخال عنوان ورابط المحتوى.");
    return;
  }

  items.push({ title, link });
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

  if (items.length === 0) {
    list.innerHTML = '<li class="empty-message">لا يوجد محتوى محفوظ</li>';
    return;
  }

  const header = document.createElement("li");
  header.style.fontWeight = "bold";
  header.style.marginBottom = "10px";
  header.textContent = "📌 المحتوى المحفوظ:";
  list.appendChild(header);

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = item.link;
    a.target = "_blank";
    a.textContent = item.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
        items.splice(index, 1);
        saveData();
        renderContents();
      }
    };

    li.appendChild(a);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ---------- حفظ البيانات محليًا ----------
function saveData() {
  localStorage.setItem("smartmark_items", JSON.stringify(items));
  localStorage.setItem("smartmark_folders", JSON.stringify(folders));
}

// ---------- تحميل البيانات ----------
function loadData() {
  const savedItems = JSON.parse(localStorage.getItem("smartmark_items"));
  const savedFolders = JSON.parse(localStorage.getItem("smartmark_folders"));
  if (savedItems) items = savedItems;
  if (savedFolders) folders = savedFolders;
  renderContents();
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
    li.textContent = name;

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.onclick = () => {
      if (confirm("هل تريد حذف هذا المجلد؟")) {
        folders.splice(index, 1);
        saveData();
        renderFolders();
      }
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ---------- تهيئة ----------
window.onload = loadData;
