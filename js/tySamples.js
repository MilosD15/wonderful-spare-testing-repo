// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort, getCSSPropertyValueFromRoot } from "./additional-func.js";

if (document.querySelector("[data-ty-samples-section]")) {
  // DOM elements
  const tySamplesSection = document.querySelector("[data-ty-samples-section]");
  const tySamplesAirplanePilotContainer = tySamplesSection.querySelector("[data-ty-samples-airplane-pilot-container]");
  const tySamplesPilotArm = tySamplesSection.querySelector("[data-ty-samples-pilot-arm]");
  const tySamplesPassingCloud = tySamplesSection.querySelector("[data-ty-samples-passing-cloud]");

  // variables
  const tySamplesAirplaneTransitionDuration = parseInt(getCSSPropertyValueFromRoot("--TY-SAMPLES-SEC-airplane-transition-duration"));
  const tySamplesPilotArmAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--TY-SAMPLES-SEC-pilot-arm-animation-duration"));
  const tySamplesPassingCloudAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--TY-SAMPLES-SEC-passing-cloud-animation-duration"));
  const delayBetweenPilotArmMovingSequences = 2000;
  const delayBetweenPassingCloudAnimationSequences = 3000;

  // animate airplane and pilot
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      tySamplesAirplanePilotContainer.classList.add("load-transition");

      setInterval(() => {
        animatePassingCloud();
      }, delayBetweenPassingCloudAnimationSequences);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.8 });
  observer.observe(tySamplesSection);

  function animatePassingCloud() {
    if (!isSectionInViewPort(tySamplesSection)) return;

    const randomTopPosition = getRandomNumber(1, 5);

    tySamplesPassingCloud.classList.add("animate");
    tySamplesPassingCloud.classList.add(`position-${randomTopPosition}`);

    setTimeout(() => {
      tySamplesPassingCloud.classList.remove("animate");
      tySamplesPassingCloud.classList.remove(`position-${randomTopPosition}`);
    }, tySamplesPassingCloudAnimationDuration);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // control pilot arm moving
  animatePilotArm();
  setInterval(animatePilotArm, delayBetweenPilotArmMovingSequences + tySamplesPilotArmAnimationDuration);

  function animatePilotArm() {
    if (!isSectionInViewPort(tySamplesSection)) return;

    tySamplesPilotArm.classList.add("animate");

    setTimeout(() => {
      tySamplesPilotArm.classList.remove("animate");
    }, tySamplesPilotArmAnimationDuration);
  }

  // MOVING PILOT'S ARM CAN BE ACHIEVED WITH requestAnimationFrame AS WELL
  // let lastTime = null;
  // let isAnimating = false;

  // function animatePilotArm(time) {
  //   if (!isSectionInViewPort(tySamplesSection)) {
  //     requestAnimationFrame(animatePilotArm);
  //     return;
  //   }

  //   if (!lastTime) lastTime = time;

  //   const elapsed = time - lastTime;

  //   if (isAnimating) {
  //     if (elapsed > tySamplesPilotArmAnimationDuration) {
  //       isAnimating = false;
  //       tySamplesPilotArm.classList.remove("animate");
  //       lastTime = time + delayBetweenPilotArmMovingSequences;
  //     }
  //   } else if (elapsed > delayBetweenPilotArmMovingSequences) {
  //     isAnimating = true;
  //     tySamplesPilotArm.classList.add("animate");
  //     lastTime = time;
  //   }

  //   requestAnimationFrame(animatePilotArm);
  // }

  // requestAnimationFrame(animatePilotArm);
}