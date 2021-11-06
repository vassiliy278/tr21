document.querySelectorAll(".list_item_wrapper").forEach((e) => {
  e.onclick = () => {
    e.lastElementChild.classList.toggle("showImg");
    e.classList.toggle("active_wrapper");
    // console.dir(e);
  };
});
