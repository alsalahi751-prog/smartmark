// ---------- تخزين واسترجاع البيانات ----------
let items = JSON.parse(localStorage.getItem("items")) || [];
let folders = JSON.parse(localStorage.getItem("folders")) || [];

// ---------- حفظ المحتوى ----------
function addItem() {
  const titleInput = document.getElementById("titleInput");
  const linkInput = document.getElementById("linkInput");

  const title = titleInput.value.trim();
  const link = linkInput.value.trim();

  if (!title || !link) {
    alert("يرجى إدخال عنوان ورابط المحتوى.");
    return;
  }

  items.push({ title, link });
  saveData();
  renderContents();

  titleInput.value = "";
  linkInput.value = "";
}

// ---------- حفظ البيانات في localStorage ----------
function saveData() {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("folders", JSON.stringify(folders));
}

// ---------- عرض المحتوى ----------
function renderContents() {
  const container = document.getElementById("itemList");
  if (!container) return;

  container.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "لا يوجد محتوى محفوظ";
    empty.className = "empty-message";
    container.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = item.link;
    a.textContent = item.title;
    a.target = "_blank";

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
        items.splice(index, 1);
        saveData();
        renderContents();
      }
    };

    li.appendChild(a);
    li.appendChild(delBtn);
    container.appendChild(li);
  });
}

// ---------- إدارة المجلدات ----------
function toggleFolderInput() {
  const folderInput = document.getElementById("folderInput");
  folderInput.style.display = folderInput.style.display === "none" ? "block" : "none";
  folderInput.focus();
}

function addFolder(name) {
  if (!name) return;
  folders.push(name);
  saveData();
  renderFolders();
}

function renderFolders() {
  const folderList = document.getElementById("folderList");
  if (!folderList) return;

  folderList.innerHTML = "";

  if (folders.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "لا توجد مجلدات";
    empty.className = "empty-message";
    folderList.appendChild(empty);
    return;
  }

  folders.forEach((folder, index) => {
    const li = document.createElement("li");
    li.textContent = folder;

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => {
      if (confirm("هل أنت متأكد من حذف هذا المجلد؟")) {
        folders.splice(index, 1);
        saveData();
        renderFolders();
      }
    };

    li.appendChild(delBtn);
    folderList.appendChild(li);
  });
}

// ---------- إدخال المجلد الجديد ----------
const folderInput = document.getElementById("folderInput");
folderInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const name = folderInput.value.trim();
    if (name) addFolder(name);
    folderInput.value = "";
    folderInput.style.display = "none";
  }
});

// ---------- تهيئة العرض عند تحميل الصفحة ----------
window.onload = () => {
  renderContents();
  renderFolders();
};
