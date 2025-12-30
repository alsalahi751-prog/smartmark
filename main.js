// ====== إعدادات اللغة ======
let currentLang = 'ar';

const langBtn = document.getElementById('langBtn');
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage();
});

function updateLanguage() {
    document.querySelectorAll('[data-ar]').forEach(el => {
        el.textContent = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
    });
}

// ====== إدارة المجلدات ======
let folders = [];
let generalFolder = null;

const addFolderBtn = document.getElementById('addFolderBtn');
const folderNameInput = document.getElementById('folderNameInput');

addFolderBtn.addEventListener('click', () => {
    const name = folderNameInput.value.trim();
    if (name) {
        folders.push({ name, contents: [] });
        folderNameInput.value = '';
        renderFolders();
    }
});

function renderFolders() {
    const folderList = document.getElementById('folderList');
    folderList.innerHTML = '';
    folders.forEach((folder, index) => {
        const li = document.createElement('li');
        li.textContent = folder.name;
        li.addEventListener('click', () => openFolder(index));
        folderList.appendChild(li);
    });
}

// ====== فتح المجلد وعرض المحتوى ======
function openFolder(index) {
    const folder = folders[index];
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = '';
    folder.contents.forEach((item, i) => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.addEventListener('click', () => window.open(item.link, '_blank'));
        const delBtn = document.createElement('button');
        delBtn.textContent = currentLang === 'ar' ? 'حذف' : 'Delete';
        delBtn.addEventListener('click', () => {
            if (confirm(currentLang === 'ar' ? 'هل تريد حذف هذا المحتوى؟' : 'Delete this item?')) {
                folder.contents.splice(i, 1);
                openFolder(index);
            }
        });
        li.appendChild(delBtn);
        contentList.appendChild(li);
    });
}

// ====== إضافة محتوى ======
const addContentBtn = document.getElementById('addContentBtn');
const contentTitleInput = document.getElementById('contentTitle');
const contentLinkInput = document.getElementById('contentLink');

addContentBtn.addEventListener('click', () => {
    const title = contentTitleInput.value.trim();
    const link = contentLinkInput.value.trim();
    if (!title || !link) return alert(currentLang === 'ar' ? 'الرجاء إدخال العنوان والرابط' : 'Enter title and link');
    if (!folders.length) return alert(currentLang === 'ar' ? 'أضف مجلد أولاً' : 'Add a folder first');
    // أضف المحتوى إلى أول مجلد مؤقتاً
    folders[0].contents.push({ title, link });
    contentTitleInput.value = '';
    contentLinkInput.value = '';
    renderFolders();
});

// ====== البحث ======
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const resultsList = document.getElementById('searchResults');
    resultsList.innerHTML = '';
    folders.forEach(folder => {
        folder.contents.forEach(item => {
            if (item.title.toLowerCase().includes(query)) {
                const li = document.createElement('li');
                li.textContent = `${folder.name} -> ${item.title}`;
                li.addEventListener('click', () => window.open(item.link, '_blank'));
                resultsList.appendChild(li);
            }
        });
    });
});

// ====== النسخة الاحتياطية ======
const backupBtn = document.getElementById('backupBtn');
backupBtn.addEventListener('click', () => {
    const data = JSON.stringify({ folders, generalFolder });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.json';
    a.click();
    URL.revokeObjectURL(url);
});

// ====== المجلد العام ======
const setGeneralBtn = document.getElementById('setGeneralBtn');
setGeneralBtn.addEventListener('click', () => {
    const name = prompt(currentLang === 'ar' ? 'أدخل اسم المجلد العام' : 'Enter general folder name');
    if (!name) return;
    generalFolder = { name, contents: [] };
    alert(currentLang === 'ar' ? 'تم تعيين المجلد العام' : 'General folder set');
});
