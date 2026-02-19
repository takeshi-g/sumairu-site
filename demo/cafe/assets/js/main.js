document.addEventListener("DOMContentLoaded", () => {
  // 🎨 1. テーマカラーの変更処理
  // グローバルに呼び出せるよう window オブジェクトに登録
  window.changeTheme = function (mainColor, accentColor) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.documentElement.style.setProperty("--accent-color", accentColor);
  };

  // 🔀 2. セクション切り替え処理の共通関数
  // (スイッチのID, 表示エリアAのID, 表示エリアBのID, スクロール先セクションのID)
  function setupToggle(switchId, elementA_Id, elementB_Id, sectionId) {
    const toggleSwitch = document.getElementById(switchId);
    const elA = document.getElementById(elementA_Id);
    const elB = document.getElementById(elementB_Id);

    if (!toggleSwitch || !elA || !elB) return;

    toggleSwitch.addEventListener("change", function () {
      if (this.checked) {
        // スイッチON: パターンBを表示
        elA.classList.add("d-none");
        elB.classList.remove("d-none");
      } else {
        // スイッチOFF: パターンAを表示
        elA.classList.remove("d-none");
        elB.classList.add("d-none");
      }

      // 切り替えたセクションへスムーズにスクロールして変化を見せる（上部ナビゲーションの被りを防ぐため少しずらす）
      const section = document.getElementById(sectionId);
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  // 各スイッチのイベント設定を実行
  setupToggle("toggleHero", "hero-video", "hero-carousel", "hero-section");
  setupToggle("toggleNews", "news-manual", "news-note", "news-section");
  setupToggle(
    "toggleCal",
    "schedule-table",
    "schedule-gcal",
    "schedule-section",
  );
  // --- 透過ヘッダーのスクロール検知 ---
  const navbar = document.getElementById("mainNav");

  // スクロールイベントを監視
  window.addEventListener("scroll", () => {
    // 50px以上スクロールしたら 'nav-scrolled' クラスを付与
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled");
    } else {
      // 一番上に戻ったらクラスを外して透明に戻す
      navbar.classList.remove("nav-scrolled");
    }
  });

  // --- 🪄 GSAP ヒーローエリアのアニメーション ---
  // .gsap-hero-item というクラスがついた要素を順番に下からフワッと表示させます
  if (typeof gsap !== "undefined") {
    gsap.from(".gsap-hero-item", {
      y: 40, // 40px下からスタート
      opacity: 0, // 透明からスタート
      duration: 1.2, // 1.2秒かけてアニメーション
      stagger: 0.3, // 0.3秒ずつズラして表示（これがプロっぽさの秘訣です）
      ease: "power3.out", // 滑らかな減速のイージング
      delay: 0.5, // 画面読み込み後、0.5秒待ってから開始
    });
  }
});
