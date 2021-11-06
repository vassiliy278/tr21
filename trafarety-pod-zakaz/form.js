let chat_id = -4898;
let token = "1674920857:AAHy";
const nameInput = document.getElementById("name");
let submitBtn = document.getElementById("submit_btn");
const subformButton = document.querySelector(".for_button");
const form = document.forms.send_form;
let textObject = {};
const textData = new FormData();
const fileData = new FormData();
const setInputFn = (e) => {
  textObject[e.target.name] = e.target.value;
  if (textObject.name && textObject.tel) {
    submitBtn.removeAttribute("disabled");
  }
};
// nameInput.addEventListener("input", setInputFn);
document.querySelectorAll("input[type=text], textarea").forEach((e) => {
  e.oninput = setInputFn;
});

document.querySelector("input[type=file]").addEventListener("change", (e) => {
  if (e.target.files[0]) {
    fileData.set("document", e.target.files[0]);
    fileData.set("chat_id", chat_id + window.localStorage.getItem("c"));
  } else {
    fileData.delete("document");
  }

  // for (file of fileData.entries()) {
  //   console.log(file.includes("document"));
  // }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const resultString = `<b>Время:</b> ${new Date().toDateString()} \n<b>Имя:</b> ${
    textObject.name
  } \n<b>Тел:</b> ${textObject.tel} \n<b>Коммент:</b> ${textObject.comment} \n`;

  textData.set("text", resultString);
  textData.set("parse_mode", "HTML");
  textData.set("chat_id", chat_id + window.localStorage.getItem("c"));

  subformButton.innerHTML = '<div class="loader"></div>';

  fetch(
    `https://api.telegram.org/bot${
      token + window.localStorage.getItem("t")
    }/sendMessage`,
    {
      method: "POST",
      body: textData,
    }
  )
    .then((e) => {
      submitBtn.setAttribute("disabled", "true");
      if (e.status >= 200 && e.status < 300) {
        if (fileData.has("document")) {
          fetch(
            `https://api.telegram.org/bot${
              token + window.localStorage.getItem("t")
            }/sendDocument`,
            {
              method: "POST",
              body: fileData,
            }
          )
            .then((e) => {
              submitBtn.setAttribute("disabled", "true");
              if (e.status >= 200 && e.status < 300) {
                subformButton.innerHTML = `
                  <p class="link_mail">
                  <a onclick="location.reload()">Сенкс!</a>
                </p>`;
                setTimeout(() => location.reload(), 2000);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          subformButton.innerHTML = `
          <p class="link_mail">
          <a onclick="location.reload()">Сенкс!</a>
        </p>`;
          setTimeout(() => location.reload(), 2000);
        }
      } else {
        subformButton.innerText = `Problem! ${e.statusText}.`;
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      form.reset();
    });
});
