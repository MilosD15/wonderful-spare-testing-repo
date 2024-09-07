// imports
import ElementParallax from './ElementParallax.js';

if (document.querySelector('[data-quizzes-cta]')) {
  // DOM elements
  const quizzesCTASection = document.querySelector('[data-quizzes-cta]');
  const quizzesCTABgElement = quizzesCTASection.querySelector('[data-quizzes-cta-bg]');

  // parallax
  const quizzesCTABgParallax = new ElementParallax(
    quizzesCTASection,
    quizzesCTABgElement,
    { scale: 1, x: -50, y: -50 },
    0,
    { scale: 1.05, x: -50, y: -50 },
    1.5
  );

  document.addEventListener('DOMContentLoaded', handleParallax);
  window.addEventListener('scroll', handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    quizzesCTABgParallax.apply(currentScroll);
  }
}
