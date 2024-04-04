const playerSliders = [...document.querySelectorAll('.player__slider')];

playerSliders.forEach(slider => {
  slider.addEventListener('input', handleSliderUpdate);
});

function handleSliderUpdate(e) {
  const correspondingProgressBar = e.target.parentElement.querySelector('.player__slider-progress-bar');

  // Get the computed width of the slider and the thumb
  const sliderWidthInPx = e.target.offsetWidth;
  const thumbWidth = 5; // The width of the thumb

  // Adjust the width of the slider to account for the thumb
  const adjustedSliderWidth = sliderWidthInPx - thumbWidth;

  let value = parseFloat(this.value);
  // Calculate the width of the progress bar based on the adjusted width of the slider
  correspondingProgressBar.style.width = `${value / 100 * adjustedSliderWidth + thumbWidth}px`;
}

// Set the volume to 100% on mobile
window.addEventListener('load', function() {
  if (window.innerWidth > 768) return;

  const volumeSlider = document.querySelector('.volume_slider');
  volumeSlider.value = 100;
  const event = new Event('input');
  volumeSlider.dispatchEvent(event);
});