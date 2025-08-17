// 初期化
gsap.registerPlugin(ScrollTrigger);

// 各セクションにアニメーションを設定
gsap.utils.toArray(".about, .menu").forEach((section) => {
  gsap.fromTo(
    section,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // ビューポートの80%地点で開始
        toggleActions: "play none none none",
      },
    }
  );
});
