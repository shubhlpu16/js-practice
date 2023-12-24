const slides = document.querySelectorAll(".slide");

slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${100 * index}%)`;
});

let currSlide = 0;

document.querySelector(".btn-next").addEventListener("click", handleNext);
document.querySelector(".btn-prev").addEventListener("click", handlePrev);

// requestAnimationFrame(()=>setInterval(handleNext,2000));
function handleNext() {
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currSlide)}%)`;
  });
}

function handlePrev() {
  if (currSlide === 0) {
    currSlide = slides.length - 1;
  } else {
    currSlide--;
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currSlide)}%)`;
  });
}
