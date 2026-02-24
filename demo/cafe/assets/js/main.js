document.addEventListener("DOMContentLoaded", () => {
  // ====================================================
  // 1. 共通パーツ（ヘッダー・フッター・フローティング）の読み込み処理
  // ====================================================
  async function loadPartials() {
    try {
      // 1-1. ヘッダーの読み込み
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) {
        const response = await fetch("./assets/partials/header.html");
        const html = await response.text();
        headerContainer.innerHTML = html;

        // ヘッダーがHTMLに挿入された「後」にスクロール設定を行う
        setupNavbarScroll();
      }

      // 1-2. フッターの読み込み
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        const response = await fetch("./assets/partials/footer.html");
        const html = await response.text();
        footerContainer.innerHTML = html;
      }

      // 1-3. フローティングボタンの読み込み（今回追加！）
      const floatingContainer = document.getElementById("floating-container");
      if (floatingContainer) {
        const response = await fetch("./assets/partials/floating.html");
        const html = await response.text();
        floatingContainer.innerHTML = html;
      }
    } catch (error) {
      console.error("共通パーツの読み込みに失敗しました:", error);
    }
  }

  // 透過ヘッダーのスクロール検知
  function setupNavbarScroll() {
    const navbar = document.getElementById("mainNav");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
      }
    });
  }

  // パーツ読み込み実行
  loadPartials();

  // ====================================================
  // 2. テーマカラーの変更・保存・復元処理（localStorage対応）
  // ====================================================

  // ① 保存されている色があれば、ページ読み込み時に復元する関数
  function restoreTheme() {
    const savedMain = localStorage.getItem("themeMain");
    const savedSub = localStorage.getItem("themeSub");
    const savedAccent = localStorage.getItem("themeAccent");

    if (savedMain && savedSub && savedAccent) {
      document.documentElement.style.setProperty("--main-color", savedMain);
      document.documentElement.style.setProperty("--sub-color", savedSub);
      document.documentElement.style.setProperty("--accent-color", savedAccent);
    }
  }

  // ページを開いた瞬間に、色の復元を実行する
  restoreTheme();

  // ② 色を変更し、同時にブラウザ（localStorage）に保存する関数
  window.changeTheme = function (mainColor, subColor, accentColor) {
    // 画面の色を変える
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.documentElement.style.setProperty("--sub-color", subColor);
    document.documentElement.style.setProperty("--accent-color", accentColor);

    // 次のページでも使えるように、ブラウザに色を記憶させる
    localStorage.setItem("themeMain", mainColor);
    localStorage.setItem("themeSub", subColor);
    localStorage.setItem("themeAccent", accentColor);
  };

  // ====================================================
  // 3. セクション切り替え処理（営業デモ用トグル）
  // ====================================================
  function setupToggle(switchId, elementA_Id, elementB_Id, sectionId) {
    const toggleSwitch = document.getElementById(switchId);
    const elA = document.getElementById(elementA_Id);
    const elB = document.getElementById(elementB_Id);

    if (!toggleSwitch || !elA || !elB) return;

    toggleSwitch.addEventListener("change", function () {
      if (this.checked) {
        elA.classList.add("d-none");
        elB.classList.remove("d-none");
      } else {
        elA.classList.remove("d-none");
        elB.classList.add("d-none");
      }

      const section = document.getElementById(sectionId);
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  // トグルの実行（※不要になった toggleNews の処理を削除しました）
  setupToggle("toggleHero", "hero-video", "hero-carousel", "hero-section");
  setupToggle(
    "toggleCal",
    "schedule-table",
    "schedule-gcal",
    "schedule-section",
  );

  // ====================================================
  // 4. GSAP アニメーション処理
  // ====================================================
  // ヒーローエリアのフワッとした表示
  if (typeof gsap !== "undefined") {
    gsap.from(".gsap-hero-item", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      delay: 0.5,
    });
  }

  // スクロール連動表示（ScrollTrigger）
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    const scrollItems = document.querySelectorAll(".gsap-scroll-item");
    if (scrollItems.length > 0) {
      gsap.utils.toArray(scrollItems).forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }
  }
});
