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

  // スクロール時のふわっと表示（タイトルなどの単体要素用）
  const fadeUpItems = gsap.utils.toArray(".gsap-fade-up");
  fadeUpItems.forEach(function (elem) {
    gsap.fromTo(
      elem,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
    );
  });

  // 【追加】カード3枚を順番に滑らかに出す処理（stagger）
  gsap.fromTo(
    ".gsap-card",
    { y: 50, opacity: 0 },
    {
      scrollTrigger: {
        trigger: ".features-row", // 3つのカードを囲む行が画面に入ったら発火
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2, // 0.2秒間隔で順番にアニメーションさせる
      ease: "power3.out", // 摩擦を感じるような自然な減速カーブ
    },
  );
});
