// js/common-loader.js (更新版)
document.addEventListener("DOMContentLoaded", function () {
  // ヘッダーの読み込み
  loadPart("header-placeholder", "parts/header.html", initScrollEffect);

  // フッターの読み込み
  loadPart("footer-placeholder", "parts/footer.html");
});

// 共通パーツ読み込み用関数
function loadPart(elementId, filePath, callback) {
  const placeholder = document.getElementById(elementId);
  if (placeholder) {
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => {
        placeholder.innerHTML = data;
        if (callback) callback();
      });
  }
}

function initScrollEffect() {
  window.addEventListener("scroll", function () {
    const nav = document.getElementById("main-nav");
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }
  });
  window.addEventListener("scroll", function () {
    const nav = document.getElementById("main-nav");
    // 50px以上スクロールしたら .scrolled クラスを付与
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}
