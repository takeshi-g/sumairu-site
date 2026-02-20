document.addEventListener("DOMContentLoaded", () => {
  // 🎨 1. テーマカラーの変更処理（3色対応にアップデート）
  window.changeTheme = function (mainColor, subColor, accentColor) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.documentElement.style.setProperty("--sub-color", subColor);
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

  // --- 📝 noteの最新記事を動的に取得するプログラム（キャッシュ完全回避版） ---
  async function loadLatestNote() {
    const noteId = "sumairu_nara";
    const container = document.getElementById("dynamic-note-container");

    if (!container) return;

    // noteのRSS URL（毎秒違うURLになるよう現在時刻を付与）
    const rssUrl = `https://note.com/${noteId}/rss?_=${new Date().getTime()}`;

    // より安定した中継サービス「corsproxy.io」を使用します
    const apiUrl = `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`;

    try {
      const response = await fetch(apiUrl);
      const textData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textData, "application/xml");

      // 記事（item）のリストを取得
      const items = xmlDoc.querySelectorAll("item");

      if (items.length > 0) {
        // 一番新しい記事（0番目）を取得
        const latestItem = items[0];

        const title = latestItem.querySelector("title").textContent;
        const link = latestItem.querySelector("link").textContent;
        const pubDate = latestItem.querySelector("pubDate").textContent;

        // アイキャッチ画像の取得（noteのRSS特有のタグ <media:thumbnail> を探す）
        let thumbnail =
          "https://placehold.co/600x300/f8f9fa/a3a3a3?text=No+Image";
        const mediaNodes = latestItem.getElementsByTagName("media:thumbnail");
        if (mediaNodes.length > 0) {
          thumbnail = mediaNodes[0].textContent;
        }

        // 取得した日付をフォーマット（YYYY.MM.DD）
        const date = new Date(pubDate);
        const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

        // HTMLを生成してコンテナに流し込む
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

  // ページ読み込み時に実行
  loadLatestNote();
});
