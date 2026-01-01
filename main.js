// ======== عناصر الإدخال ========
const titleInput = document.getElementById("titleInput");
const linkInput = document.getElementById("linkInput");
const folderNameInput = document.getElementById("folderInput");
const folderList = document.getElementById("folderList");
const contentList = document.getElementById("contentList");

// ======== تخزين البيانات ========
let contents = [];
let folders = [];

// ======== إضافة محتوى ========
function addItem() {
  const title = titleInput.value.trim();
  const link = linkInput.value.trim();

  if (!title || !link) {
    alert("يرجى إدخال عنوان ورابط المحتوى");
    return;
  }

  contents.push({ title, link });
  saveData();
  alert("تم حفظ المحتوى بنجاح");
  renderContents();

  // تفريغ الحقول
  titleInput.value = "";
  linkInput.value = "";
}

// ======== عرض المحتوى ========
function renderContents() {
  if (!contentList) return;
  contentList.innerHTML = "";

  if (contents.length === 0) {
    contentList.innerHTML = "<p>لا يوجد محتوى محفوظ</p>";
    return;
  }

  contents.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "content-item";
    div.innerHTML = `
      <strong>${item.title}</strong> - <a href="${item.link}" target="_blank">${item.link}</a>
      <button onclick="deleteItem(${index})">حذف</button>
    `;
    contentList.appendChild(div);
  });
}

// ======== حذف محتوى ========
function deleteItem(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;
  contents.splice(index, 1);
  saveData();
  renderContents();
}

// ======== إضافة مجلد جديد ========
function toggleFolderInput() {
  if (folderNameInput.style.display === "none") {
    folderNameInput.style.display = "inline-block";
    folderNameInput.focus();
  } else {
    folderNameInput.style.display = "none";
  }
}

function addFolder() {
  const name = folderNameInput.value.trim();
  if (!name) return alert("يرجى إدخال اسم المجلد");
  folders.push(name);
  saveData();
  renderFolders();
  folderNameInput.value = "";
  folderNameInput.style.display = "none";
}

// ======== عرض المجلدات ========
function renderFolders() {
  if (!folderList) return;
  folderList.innerHTML = "";

  if (folders.length === 0) {
    folderList.innerHTML = "<p>لا توجد مجلدات</p>";
    return;
  }

  folders.forEach((folder, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${folder} 
      <button onclick="deleteFolder(${index})">حذف</button>
    `;
    folderList.appendChild(li);
  });
}

// ======== حذف مجلد ========
function deleteFolder(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المجلد؟")) return;
  folders.splice(index, 1);
  saveData();
  renderFolders();
}

// ======== حفظ البيانات في LocalStorage ========
function saveData() {
  localStorage.setItem("smartmarkContents", JSON.stringify(contents));
  localStorage.setItem("smartmarkFolders", JSON.stringify(folders));
}

// ======== استرجاع البيانات عند التحميل ========
function loadData() {
  const savedContents = JSON.parse(localStorage.getItem("smartmarkContents") || "[]");
  const savedFolders = JSON.parse(localStorage.getItem("smartmarkFolders") || "[]");

  contents = savedContents;
  folders = savedFolders;

  renderContents();
  renderFolders();
}

// ======== عند تحميل الصفحة ========
window.onload = loadData;
