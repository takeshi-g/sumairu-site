// 共通パーツを読み込む関数
function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  elements.forEach((el) => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then((response) => {
        if (response.ok) return response.text();
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("data-include"); // 読み込み後は属性を削除
      })
      .catch((error) => console.error("Error loading include:", error));
  });
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", includeHTML);
