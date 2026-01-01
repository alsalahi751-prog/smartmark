// ====== إعداد المتغيرات ======
let contents = JSON.parse(localStorage.getItem("contents") || "[]");
let folders = JSON.parse(localStorage.getItem("folders") || "[]");
const FREE_LIMIT = 50; // حد النسخة المجانية

// ====== إضافة محتوى ======
function addContent() {
  const titleInput = document.getElementById("contentTitle");
  const urlInput = document.getElementById("contentURL");

  if (!titleInput.value || !urlInput.value) {
    alert("يرجى ملء العنوان والرابط");
    return;
  }

  // تحقق من النسخة المدفوعة
  if (contents.length >= FREE_LIMIT) {
    alert("لقد وصلت لحد النسخة المجانية، يرجى الترقية للنسخة المدفوعة.");
    return;
  }

  contents.push({ title: titleInput.value, url: urlInput.value });
  saveData();
  alert("تم حفظ المحتوى بنجاح");

  titleInput.value = "";
  urlInput.value = "";

  renderContents();
}

// ====== حفظ البيانات في التخزين المحلي ======
function saveData() {
  localStorage.setItem("contents", JSON.stringify(contents));
  localStorage.setItem("folders", JSON.stringify(folders));
}

// ====== عرض المحتوى ======
function renderContents() {
  const container = document.getElementById("contentList");
  if (!container) return;

  container.innerHTML = ""; // مسح أي محتوى سابق

  if (contents.length === 0) {
    container.innerHTML = "<p>لا يوجد محتوى محفوظ.</p>";
    return;
  }

  contents.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "content-item";
    div.innerHTML = `
      <strong>${item.title}</strong><br>
      <a href="${item.url}" target="_blank">${item.url}</a>
      <button onclick="deleteContent(${index})" style="margin-left:10px;">حذف</button>
    `;
    container.appendChild(div);
  });
}

// ====== حذف محتوى ======
function deleteContent(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;
  contents.splice(index, 1);
  saveData();
  renderContents();
}

// ====== إضافة مجلد جديد ======
function addFolder() {
  const folderNameInput = document.getElementById("newFolderName");
  const folderName = folderNameInput.value.trim();
  if (!folderName) {
    alert("يرجى إدخال اسم المجلد");
    return;
  }
  folders.push(folderName);
  saveData();
  folderNameInput.value = "";
  renderFolders();
}

// ====== عرض المجلدات ======
function renderFolders() {
  const container = document.getElementById("folderList");
  if (!container) return;

  container.innerHTML = "";
  if (folders.length === 0) {
    container.innerHTML = "<p>لا توجد مجلدات بعد.</p>";
    return;
  }

  folders.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "folder-item";
    div.innerHTML = `
      ${name} 
      <button onclick="deleteFolder(${index})" style="margin-left:10px;">حذف</button>
    `;
    container.appendChild(div);
  });
}

// ====== حذف مجلد ======
function deleteFolder(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المجلد؟")) return;
  folders.splice(index, 1);
  saveData();
  renderFolders();
}

// ====== عند التحميل ======
window.onload = function() {
  renderContents();
  renderFolders();
};
