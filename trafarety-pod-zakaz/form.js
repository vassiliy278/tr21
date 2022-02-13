const nameInput = document.getElementById("name");
let submitBtn = document.getElementById("submit_btn");
const subformButton = document.querySelector(".for_button");
const form = document.forms.send_form;
let textObject = {};
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

// document.querySelector("input[type=file]").addEventListener("change", (e) => {
//   if (e.target.files[0]) {
//     fileData.set("document", e.target.files[0]);
//     console.log(e.target.files[0])
//   } else {
//     fileData.delete("document");
//   }

// });

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  subformButton.innerHTML = '<div class="loader"></div>';
  fetch(
    `http://localhost:3000/trafarettext`,
    {
      method: "POST",
      body: JSON.stringify(textObject),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then((e) => {
      submitBtn.setAttribute("disabled", "true");
      if (e.status === 200) {
        // if (fileData.has("document")) {
        //   fetch(
        //     `http://localhost:3000/trafaretfile`,
        //     {
        //       method: "POST",
        //       body: fileData
        //     }
        //   )
        //     .then((e) => {
        //       submitBtn.setAttribute("disabled", "true");
        //       if (e.status >= 200 && e.status < 300) {
        //         subformButton.innerHTML = `
        //           <p class="link_mail">
        //           <a onclick="form.reset()">Сенкс!</a>
        //         </p>`;
        //         setTimeout(() => form.reset(), 2000);
        //       }
        //     })
        //     .catch((e) => {
        //       console.log(e);
        //     });
        // } else {
          console.log('koks')
          subformButton.innerHTML = `
          <p class="link_mail">
          <a onclick="form.reset()">Сенкс!</a>
        </p>`;
          setTimeout(() => form.reset(), 2000);
        // }
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
