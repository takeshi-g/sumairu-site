// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーとフッター読み込み
  fetch("partials/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // ヘッダー読み込み後にアニメーション設定（ロゴテキスト）
      gsap.from(".animate-logo", {
        duration: 1.2,
        y: -30,
        opacity: 0,
        ease: "power2.out",
      });
    });

  fetch("partials/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

  // 事業カードのアニメーション（下からふわっと出現）
  gsap.from(".business-card", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });
});
