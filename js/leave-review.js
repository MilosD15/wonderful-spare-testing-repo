if (document.querySelector("[data-leave-review-section]")) {
  const leaveReviewSection = document.querySelector("[data-leave-review-section]");
  const leaveReviewStarsRadioButtons = leaveReviewSection.querySelectorAll("[data-star-radio-btn]");
  const howCanWeImproveDialog = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog]");
  const howCanWeImproveDialogForm = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog-form]");
  const howCanWeImproveDialogTextArea = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog-textarea]");

  leaveReviewStarsRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      const checkedRadioButton = leaveReviewSection.querySelector("[data-star-radio-btn]:checked");
      const checkedRadioButtonValue = parseInt(checkedRadioButton.value);

      if (checkedRadioButtonValue < 4) {
        howCanWeImproveDialog.showModal();
        howCanWeImproveDialogTextArea.focus();
      }
    });
  });

  howCanWeImproveDialogForm.addEventListener("submit", e => { e.preventDefault(); });
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-how-can-we-improve-dialog-close-btn]")) return;

    howCanWeImproveDialog.close();
  });
}