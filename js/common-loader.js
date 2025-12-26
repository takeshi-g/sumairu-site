document.addEventListener("DOMContentLoaded", () => {
  // 読み込みたいパーツと、挿入先のIDを定義
  const parts = [
    { id: "common-header", url: "partials/header.html" },
    { id: "common-footer", url: "partials/footer.html" },
  ];

  parts.forEach((part) => {
    const element = document.getElementById(part.id);
    if (element) {
      fetch(part.url)
        .then((response) => response.text())
        .then((data) => {
          element.innerHTML = data;
        })
        .catch((error) => console.error("Error loading partial:", error));
    }
  });
});
