document.addEventListener("DOMContentLoaded", (event) => {
  // GSAPとScrollTriggerの登録
  gsap.registerPlugin(ScrollTrigger);

  // ヒーローセクションのフェードイン（トップページ用）
  const heroItems = document.querySelectorAll(".gsap-hero-item");
  if (heroItems.length > 0) {
    gsap.from(heroItems, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2,
    });
  }

  // スクロール時のふわっと表示（セクション共通）
  const fadeUpItems = gsap.utils.toArray(".gsap-fade-up");
  fadeUpItems.forEach(function (elem) {
    gsap.from(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top 80%", // 要素が画面の80%の位置に来たら発火
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  });
});
