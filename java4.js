const list = document.querySelector(".list");
const input = document.querySelector("input");
const addBtn = document.querySelector(".create-btnn");
const empty = document.querySelector(".wholegraypart");
const buttons = document.querySelectorAll(".chooserbuttons button");
let content = [];
let type = "All";
let id = 1;
const ListItem = (item) => {
  return `
    <div class="item">
      <input class="checkbox" type="checkbox" data-id="${item.id}" ${
    item.isDone ? "checked" : ""
  } />
      <p class="kkk">${item.text}</p>
      <button class="delete-btn">Delete</button>
    </div>
  `;
};
addBtn.addEventListener("click", () => {
  content.push({
    id: id,
    text: input.value,
    isDone: false,
  });

  id++;
  input.value = "";
  console.log(content);

  render();
});

buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("chosen");
    });

    btn.classList.add("chosen");

    if (i === 0) {
      type = "All";
    } else if (i === 1) {
      type = "Active";
    } else {
      type = "Completed";
    }

    render();
  });
});

const render = () => {
  const elements = content
    .filter((item) => {
      if (type === "All") return true;
      if (type === "Active") return item.isDone === false;
      return item.isDone === true;
    })
    .map((item) => ListItem(item))
    .join("");
  list.innerHTML = elements;
  const completedCount = content.filter((item) => item.isDone).length;
  const totalCount = content.length;
  if (totalCount > 0) {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <div class="footer-row">
      <span>${completedCount} of ${totalCount} tasks completed</span>
      <button class="clear-completed" ${
        completedCount === 0 ? "disabled" : ""
      }>Clear Completed</button>
      </div>
      `
    );
  }
  addlisteners();
  addFooterListeners();
};
const addFooterListeners = () => {
  const clearBtn = document.querySelector(".clear-completed");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      content = content.filter((item) => !item.isDone);
      render();
    });
  }
};
const addlisteners = () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      content = content.filter((item, index) => index !== i);
      render();
    });
  });
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox, i) => {
    checkbox.addEventListener("change", () => {
      const id = Number(checkbox.dataset.id);
      const task = content.find((i) => i.id === id);
      if (task) {
        task.isDone = checkbox.checked;
      }

      render();
    });
  });
};
addBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    empty.style.display = "none";
  }
});
