const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal-close");
const addButton = document.querySelector(".add-button");
const confirmDelete = document.getElementById("confirm-delete-button");
const cancelDelete = document.getElementById("cancel-delete-button");

const onOpen = () => {
  isOpen = true;
  modal.style.display = "block";
};

const onClose = () => {
  isOpen = false;
  modal.style.display = "none";
};

addButton.addEventListener("click", () => onOpen());
modalCloseButton.addEventListener("click", () => onClose());
cancelDelete.addEventListener("click", () => onClose());
