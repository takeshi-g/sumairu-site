window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNav");
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
