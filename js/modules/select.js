const selects = document.querySelectorAll(".c-select");

selects.forEach((select) => {
  const button = select.querySelector(".c-select__button");
  const picker = select.querySelector(".c-select__picker");
  const options = picker.querySelectorAll(".c-select__option");
  const selected = select.querySelector(".c-select__selected");

  let focusedIndex = -1;

  const openPicker = () => {
    select.classList.add("c-select--open");
    picker.classList.add("c-select__picker--open");

    options.forEach((o) =>
      o.classList.remove("c-select__picker__option--focused")
    );
    const selectedOption = picker.querySelector(
      ".c-select__picker__option--selected"
    );

    if (selectedOption) {
      selectedOption.classList.add("c-select__picker__option--focused");
      focusedIndex = Array.from(options).indexOf(selectedOption);
      selectedOption.focus();
    } else {
      focusedIndex = 0;
      options[0].classList.add("c-select__picker__option--focused");
      options[0].focus();
    }
  };

  const closePicker = () => {
    select.classList.remove("c-select--open");
    picker.classList.remove("c-select__picker--open");
    options.forEach((o) =>
      o.classList.remove("c-select__picker__option--focused")
    );
    focusedIndex = -1;
  };

  button.addEventListener("click", () => {
    select.classList.contains("c-select--open") ? closePicker() : openPicker();
  });

  options.forEach((option, index) => {
    option.addEventListener("click", () => {
      options.forEach((o) =>
        o.classList.remove("c-select__picker__option--selected")
      );
      option.classList.add("c-select__picker__option--selected");
      selected.textContent =
        option.querySelector(".c-select__label").textContent;
      closePicker();
      button.focus();
    });

    option.setAttribute("tabindex", "-1");

    option.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        options[focusedIndex].classList.remove(
          "c-select__picker__option--focused"
        );
        focusedIndex = (focusedIndex + 1) % options.length;
        options[focusedIndex].classList.add(
          "c-select__picker__option--focused"
        );
        options[focusedIndex].focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        options[focusedIndex].classList.remove(
          "c-select__picker__option--focused"
        );
        focusedIndex = (focusedIndex - 1 + options.length) % options.length;
        options[focusedIndex].classList.add(
          "c-select__picker__option--focused"
        );
        options[focusedIndex].focus();
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        options[focusedIndex].click();
      }
      if (e.key === "Escape") {
        closePicker();
        button.focus();
      }
    });
  });

  button.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openPicker();
    }
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) closePicker();
  });
});
