const btnPicked = document.querySelector(".btn_picked");
const listeColor = document.querySelector(".list");
const btnClear = document.querySelector(".clear");

const colorPickedArray = JSON.parse(
  localStorage.getItem("picked_color") || "[]"
);

const showColor = () => {
  listeColor.innerHTML = colorPickedArray
    .map(
      (color) => ` <li class="item">
                <span class="rec" style="background-color: ${color}; border: 1px solid ${
        color === "#ffffff" ? "#ccc" : color
      }"></span>
                <span class="color_picked" data-color="${color}">${color}</span>
               </li>`
    )
    .join("");

  document.querySelectorAll(".item").forEach((ele) => {
    ele.addEventListener("click", (e) =>
      copiedColor(e.currentTarget.lastElementChild)
    );
  });
};

const copiedColor = (el) => {
  console.log(el);
  navigator.clipboard.writeText(el.dataset.color);
  el.innerText = `Copied 🗸`;
  setTimeout(() => (el.innerText = el.dataset.color), 1000);
};

showColor();

const pickedColor = () => {
//   document.body.style.display = 'none';
  setInterval(async () => {
    try {
      const eyeDropper = new EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      navigator.clipboard.writeText(sRGBHex);

      if (!colorPickedArray.includes(sRGBHex)) {
        colorPickedArray.push(sRGBHex);
        localStorage.setItem("picked_color", JSON.stringify(colorPickedArray));
        showColor();
      }
    } catch (error) {
      console.log("error");
    }
    // document.body.style.display = "block";
  }, 10);
};

btnPicked.addEventListener("click", pickedColor);
btnClear.addEventListener("click", () => {
  colorPickedArray.length = 0;
  localStorage.removeItem("picked_color");
  console.log(colorPickedArray);
  listeColor.innerHTML = "";
});
