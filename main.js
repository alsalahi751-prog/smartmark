// ===== SmartMark Core Storage =====

// هيكل البيانات الأساسي
let data = {
  folders: {
    "الرئيسية": []
  },
  activeFolder: "الرئيسية"
};

// تحميل البيانات من التخزين المحلي
function loadData() {
  const saved = localStorage.getItem("smartmark-data");
  if (saved) {
    data = JSON.parse(saved);
  }
}

// حفظ البيانات
function saveData() {
  localStorage.setItem("smartmark-data", JSON.stringify(data));
}

// إضافة محتوى جديد
function addContent() {
  const title = prompt("أدخل عنوان المحتوى");
  const url = prompt("أدخل الرابط");

  if (!title || !url) return;

  data.folders[data.activeFolder].push({
    title,
    url
  });

  saveData();
  alert("تم حفظ المحتوى بنجاح");
  renderContent();
}

// عرض المحتوى
function renderContent() {
  const container = document.getElementById("contentList");
  if (!container) return;

  container.innerHTML = "";

  data.folders[data.activeFolder].forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "content-item";

    div.innerHTML = `
      <strong>${item.title}</strong><br>
      <a href="${item.url}" target="_blank">فتح الرابط</a><br>
      <button onclick="deleteContent(${index})">حذف</button>
    `;

    container.appendChild(div);
  });
}

// حذف محتوى مع تأكيد
function deleteContent(index) {
  const ok = confirm("هل أنت متأكد من حذف هذا المحتوى؟");
  if (!ok) return;

  data.folders[data.activeFolder].splice(index, 1);
  saveData();
  renderContent();
}

// تشغيل أولي
loadData();
document.addEventListener("DOMContentLoaded", renderContent);
