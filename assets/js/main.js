const heroSwiper = new Swiper('.hero__slider', {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.hero__pagination',
  },
  navigation: {
    nextEl: '.hero-button-next',
    prevEl: '.hero-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const slider = document.querySelector('.hero__slider');
slider.addEventListener('mouseenter', () => {
  heroSwiper.autoplay.stop();
});
slider.addEventListener('mouseleave', () => {
  heroSwiper.autoplay.start();
});


// главная Hero форма
const heroForm = document.querySelector('.hero__form');
const heroFormButton = document.querySelector('.hero__form--label');

if(heroForm && heroFormButton){
  heroFormButton.addEventListener('click', () => {
    heroForm.classList.toggle('is_open');
    document.body.classList.toggle('is_modal');
  });
document.addEventListener('click', (e) => {
  if (
    heroForm.classList.contains('is_open') &&
    e.target === heroForm
  ) {
    heroForm.classList.remove('is_open');
    document.body.classList.remove('is_modal');
  }
});
}
