let items = [];
let folders = [];
let currentFolder = "عام";

function addItem() {
  const title = document.getElementById("titleInput").value.trim();
  const link = document.getElementById("linkInput").value.trim();

  if (!title || !link) {
    alert("الرجاء إدخال عنوان ورابط المحتوى.");
    return;
  }

  items.push({ title, link, folder: "عام" });
  saveData();
  alert("تم حفظ المحتوى بنجاح");
  renderContents();

  document.getElementById("titleInput").value = "";
  document.getElementById("linkInput").value = "";
}

function renderContents() {
  const list = document.getElementById("itemList");
  if (!list) return;

  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = '<li class="empty-message">لا يوجد محتوى محفوظ</li>';
    return;
  }

  items
  .filter(item => item.folder === "عام")
  .forEach((item, index) => {
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

function saveData() {
  localStorage.setItem("smartmark_items", JSON.stringify(items));
  localStorage.setItem("smartmark_folders", JSON.stringify(folders));
}

function loadData() {
  const savedItems = JSON.parse(localStorage.getItem("smartmark_items"));
  const savedFolders = JSON.parse(localStorage.getItem("smartmark_folders"));
  if (savedItems) {
  items = savedItems.map(item => ({
    ...item,
    folder: item.folder || "عام"
  }));
}
  if (savedFolders) folders = savedFolders;
  renderFolders(); // نعرض المجلدات فقط عند التحميل
}

function toggleFolderInput() {
  const input = document.getElementById("folderInput");

  input.style.display = "block";
  input.focus();

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      addFolder();
    }
  };
}

// ---------- إضافة مجلد ----------
function addFolder() {
  const input = document.getElementById("folderInput");
  const name = input.value.trim();
  if (!name) {
    alert("الرجاء إدخال اسم المجلد.");
    return;
  }

  // أضف المجلد للمصفوفة
  folders.push(name);

  // حفظ البيانات محليًا
  saveData();

  // عرض المجلدات المحدثة
  renderFolders();

  // مسح الحقل بعد الإضافة
  input.value = "";
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
    li.appendChild(select);
    list.appendChild(li);
  });
}
// ---------- إخفاء/إظهار المحتوى ----------
function toggleFolderInput() {
  const controls = document.getElementById("folderControls");
  if (!controls) return;
  controls.style.display = controls.style.display === "none" ? "block" : "none";
  document.getElementById("folderInput").focus();
}
// إخفاء محتوى القسم عند تحميل الصفحة
window.addEventListener("load", () => {
  const contentSection = document.getElementById("contentSection");
  if (contentSection) contentSection.style.display = "none";
});
window.onload = loadData;
// ---------- إظهار / إخفاء المحتوى ----------
function toggleContentView() {
  const section = document.getElementById("contentSection");
  if (!section) return;

  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}
