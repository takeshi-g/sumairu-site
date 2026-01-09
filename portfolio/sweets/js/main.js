document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".btn-outline-gold");
  const productItems = document.querySelectorAll('[class*="category-"]');

  //   「カテゴリフィルター」
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. ボタンの活性状態（見た目）を切り替え
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 2. フィルタリング処理
      const filterValue = button.textContent.trim();

      productItems.forEach((item) => {
        if (filterValue === "すべて") {
          item.style.display = "block";
        } else if (
          item.classList.contains("category-namagashi") &&
          filterValue === "生菓子"
        ) {
          item.style.display = "block";
        } else if (
          item.classList.contains("category-yakigashi") &&
          filterValue === "焼き菓子"
        ) {
          item.style.display = "block";
        } else if (
          item.classList.contains("category-gift") &&
          filterValue === "ギフト"
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
