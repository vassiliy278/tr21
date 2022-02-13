let mobileMenuOpen = false;
mobile_menu_btn.addEventListener("click", (e) => {
  // e.preventDefault();
  mobileMenuOpen = !mobileMenuOpen;
  if (mobileMenuOpen) {
    navigation.style = "transform: translateX(0);  z-index:100 ";
    header.style.zIndex = "100";
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<div id="fader" style="width:100%; height:100%; position: fixed; top:0; background-color:rgba(0,0,0,0.7); z-index: 8;"></div>'
    );
    mobile_menu_btn.style = "transform: scale(0.9); transition: 200ms ease";
  } else {
    navigation.style = "transform: translateX(-100%);";
    header.style.zIndex = "-1";
    document.getElementById("fader").remove();
    mobile_menu_btn.style = "transform: scale(1); transition: 200ms ease";
  }
});
const URLPath = document.URL.split("/");
document.querySelectorAll(".nav_link").forEach((e) => {
  const linkPath = e.href.split("/");

  e.classList.remove("active_menu_item");
  if (linkPath[3] == URLPath[3]) {
    e.classList.add("active_menu_item");
  }
});
if (URLPath[3] == "usloviya-vozvrata") {
  document
    .getElementById("navigation")
    .insertAdjacentHTML(
      "beforeend",
      `<a  class="nav_link vozvrat" style="background-color: tomato" title="Немного о нас">возврат</a>`
    );
}
//drag off

// document.body.ondragstart = function () {
//   return false;
// };
const meta = document.querySelector('meta[name="viewport"]');
meta.setAttribute(
  "content",
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
);

// injection gtag script
const gtagScript = document.createElement("script");
gtagScript.async = true;
gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-EE15BCZXXS";
document.body.appendChild(gtagScript);
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-EE15BCZXXS");

window.onload = function () {
  document.getElementById("onloads").remove();
};

//current year for footer
document.getElementById("current_year").innerText = new Date().getFullYear();
