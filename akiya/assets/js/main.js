document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // ① ナビゲーションバーのスクロール時の背景変更
  // ==========================================
  const navbar = document.getElementById("mainNav");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        // スクロールしたら白背景・黒文字に
        navbar.classList.remove("navbar-dark");
        navbar.classList.add("bg-white", "shadow-sm", "navbar-light");
      } else {
        // トップにいるときは透明・白文字に
        navbar.classList.add("navbar-dark");
        navbar.classList.remove("bg-white", "shadow-sm", "navbar-light");
      }
    });
  }

  // ==========================================
  // ② GSAPアニメーションの実行（スクロールの外に出す！）
  // ==========================================
  // GSAPが読み込まれているページでのみ実行
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // gsap-fade-up クラスがついた要素をフワッと出す処理
    gsap.utils.toArray(".gsap-fade-up").forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 80%", // 画面の80%の高さに来たら発火
          },
        },
      );
    });
  }
});
