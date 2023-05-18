import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-leave-review-section]")) {
  const leaveReviewSection = document.querySelector("[data-leave-review-section]");
  const leaveReviewStarsRadioButtons = leaveReviewSection.querySelectorAll("[data-star-radio-btn]");
  const howCanWeImproveDialog = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog]");
  const howCanWeImproveDialogForm = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog-form]");
  const howCanWeImproveDialogEmailField = leaveReviewSection.querySelector("[data-how-can-we-improve-email-field]");
  const leaveReviewLottiePlayer = leaveReviewSection.querySelector("[data-leave-review-lottie]");

  leaveReviewStarsRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      const checkedRadioButton = leaveReviewSection.querySelector("[data-star-radio-btn]:checked");
      const checkedRadioButtonValue = parseInt(checkedRadioButton.value);

      if (checkedRadioButtonValue < 4) {
        howCanWeImproveDialog.showModal();
        howCanWeImproveDialogEmailField.focus();
      }
    });
  });

  howCanWeImproveDialogForm.addEventListener("submit", e => { e.preventDefault(); });
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-how-can-we-improve-dialog-close-btn]")) return;

    howCanWeImproveDialog.close();
  });

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../offices-love-wonderful.lottie');
  
    player.addEventListener('ready', () => {
      player.setSpeed(0.5);
      player.play();
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(leaveReviewSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(leaveReviewLottiePlayer);
    }
    if (!isSectionInViewPort(leaveReviewSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}