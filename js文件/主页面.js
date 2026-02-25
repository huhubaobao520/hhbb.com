const contentArea = document.getElementById('contentArea');
const actionButtons = document.querySelectorAll('.action-btn');

// 相册图片列表
const albumImgs = [
    "https://picsum.photos/id/237/400/300",
    "https://picsum.photos/id/238/400/300",
    "https://picsum.photos/id/239/400/300"
];

let currentImgIndex = 0;

// 顶部四个按钮
actionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab === 'fans') {
            showFansAlbumMenu();
        } else if (tab === 'schedule') {
            contentArea.innerHTML = `
                活动/日程<br>
                2026.03.01 技术分享会<br>
                2026.03.15 线下聚会
            `;
        } else if (tab === 'album') {
            contentArea.innerHTML = `
                更新公告<br>
                v2.0.0<br>
                1. 新增粉丝群/相册页面<br>
                2. 优化图片切换功能
            `;
        } else if (tab === 'update') {
            contentArea.innerHTML = '其他功能';
        }
    });
});

// 显示粉丝群 / 相册 两个居中按钮
function showFansAlbumMenu() {
    contentArea.innerHTML = `
        <div class="sub-buttons">
            <button id="btnFans">粉丝群</button>
            <button id="btnAlbum">相册</button>
        </div>
    `;

    document.getElementById('btnFans').onclick = showFansPage;
    document.getElementById('btnAlbum').onclick = showAlbumPage;
}

// 粉丝群页面：文字左，图片右
function showFansPage() {
    contentArea.innerHTML = `
        <div class="fans-wrapper">
            <div>
                <h3>粉丝群介绍</h3>
                <p>欢迎大家加入交流~</p>
                <p>群号：123456789</p>
                <p>链接：https://xxx.com</p>
            </div>
            <img src="https://picsum.photos/id/100/140/140" alt="群图片">
        </div>
    `;
}

// 相册页面：图片 + 左右切换
function showAlbumPage() {
    renderAlbum();
}

function renderAlbum() {
    contentArea.innerHTML = `
        <img src="${albumImgs[currentImgIndex]}" width="400">
        <div class="album-controls">
            <button id="prev">&lt; 上一张</button>
            <span>${currentImgIndex + 1} / ${albumImgs.length}</span>
            <button id="next">下一张 &gt;</button>
        </div>
    `;

    document.getElementById('prev').onclick = () => {
        currentImgIndex = (currentImgIndex - 1 + albumImgs.length) % albumImgs.length;
        renderAlbum();
    };

    document.getElementById('next').onclick = () => {
        currentImgIndex = (currentImgIndex + 1) % albumImgs.length;
        renderAlbum();
    };
}
