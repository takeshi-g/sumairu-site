gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".gsap-hero",
  { autoAlpha: 0, y: 30 },
  { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.2 },
);

gsap.utils.toArray(".fade-up").forEach((element) => {
  gsap.fromTo(
    element,
    { autoAlpha: 0, y: 40 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    },
  );
});

gsap.fromTo(
  ".stagger-card",
  { autoAlpha: 0, y: 40 },
  {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#nayami",
      start: "top 80%",
    },
  },
);

// 現在のコードの付近に追加
gsap.registerPlugin(ScrollTrigger);

// 背景画像のズームアウトアニメーション（追加）
gsap.to(".hero-bg", {
  scale: 1, // 1.1 から 1 (元のサイズ) に戻す
  duration: 3, // 3秒かけてじわじわと
  ease: "power2.out",
  delay: 0.2, // テキストのアニメーションと合わせる
});

// テキストのアニメーション（既存）
gsap.fromTo(
  ".gsap-hero",
  { autoAlpha: 0, y: 30 },
  { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.2 },
);

// main.js に追記、またはHTMLの <script> 内に追加
document.addEventListener("DOMContentLoaded", function () {
  const mainNav = document.getElementById("mainNav");

  window.addEventListener("scroll", function () {
    // 50px以上スクロールしたら 'scrolled' クラスを付ける
    if (window.scrollY > 50) {
      mainNav.classList.add("scrolled");
    } else {
      mainNav.classList.remove("scrolled");
    }
  });
});
