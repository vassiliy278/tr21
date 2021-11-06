let chat_id = -489830179;
let token = "1674920857:AAHy7oOKYbRIfXJWXpbzYv8omGc_XlnadDo";
let formData = new FormData();
formData.append("chat_id", chat_id);
inp.addEventListener("change", (e) => {
  if (e.target.files[0]) {
    formData.append("document", e.target.files[0]);
    btn.removeAttribute("disabled");
    console.dir(formData);
    for (key of formData.entries()) {
      console.log(key);
    }
  } else {
    formData.delete("document");
    btn.setAttribute("disabled", "true");
  }
});
btn.addEventListener("click", () => {
  info.innerHTML = '<div class="loader">Loading...</div>';
  fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: formData,
  })
    .then((e) => {
      btn.setAttribute("disabled", "true");
      if (e.status >= 200 && e.status < 300) {
        info.innerText = "Ready!";
      } else {
        info.innerText = `Problem! ${e.statusText}.`;
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => frm.reset());
});
