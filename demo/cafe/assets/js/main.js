document.addEventListener("DOMContentLoaded", () => {
  // ====================================================
  // 1. 共通パーツ（ヘッダー・フッター）の読み込み処理
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

      // 1-2. フッターの読み込み（今回追加した部分）
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        const response = await fetch("./assets/partials/footer.html");
        const html = await response.text();
        footerContainer.innerHTML = html;
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

  // トグルの実行
  setupToggle("toggleHero", "hero-video", "hero-carousel", "hero-section");
  setupToggle("toggleNews", "news-manual", "news-note", "news-section");
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

  // ====================================================
  // 5. noteの最新記事 動的取得処理 (corsproxy.io使用)
  // ====================================================
  async function loadLatestNote() {
    const noteId = "sumairu_nara";
    const container = document.getElementById("dynamic-note-container");
    if (!container) return;

    const rssUrl = `https://note.com/${noteId}/rss?_=${new Date().getTime()}`;
    const apiUrl = `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const textData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textData, "application/xml");
      const items = xmlDoc.querySelectorAll("item");

      if (items.length > 0) {
        const latestItem = items[0];
        const title = latestItem.querySelector("title").textContent;
        const link = latestItem.querySelector("link").textContent;
        const pubDate = latestItem.querySelector("pubDate").textContent;

        let thumbnail =
          "https://placehold.co/600x300/f8f9fa/a3a3a3?text=No+Image";
        const mediaNodes = latestItem.getElementsByTagName("media:thumbnail");
        if (mediaNodes.length > 0) {
          thumbnail = mediaNodes[0].textContent;
        }

        const date = new Date(pubDate);
        const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

        container.innerHTML = `
          <a href="${link}" target="_blank" class="text-decoration-none text-dark d-block text-start transition-hover border rounded overflow-hidden">
            <img src="${thumbnail}" class="w-100 object-fit-cover" style="height: 200px;" alt="note thumbnail">
            <div class="p-3">
              <span class="badge bg-secondary mb-2">${formattedDate}</span>
              <h6 class="fw-bold mb-2 line-clamp-2">${title}</h6>
              <p class="text-muted small mb-0">記事を読む <i class="bi bi-chevron-right"></i></p>
            </div>
          </a>
        `;
      } else {
        container.innerHTML =
          '<p class="text-muted">記事が見つかりませんでした。</p>';
      }
    } catch (error) {
      console.error("note記事の取得に失敗しました:", error);
      container.innerHTML =
        '<p class="text-danger small">最新記事の取得に失敗しました。<br>通信環境をご確認ください。</p>';
    }
  }

  // 実行
  loadLatestNote();
});
