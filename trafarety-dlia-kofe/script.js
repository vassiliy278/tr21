const img = document.querySelector(".main_img");
const imgArr = [
  "/img/coffee_01.jpeg",
  "/img/coffee_02.jpeg",
  "/img/coffee_03.jpeg",
  "/img/coffee_04.jpeg",
  "/img/coffee_07.jpeg",
];

setInterval(function () {
  img.setAttribute(
    "src",
    imgArr[Math.round(Math.random() * (imgArr.length - 1))]
  );
}, 5000);
