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

// About счётчик

document.querySelectorAll('.advantages__item--count span').forEach(el => {
  const target = parseInt(el.textContent, 10);
  const duration = 3000;

  const observer = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;

    const start = performance.now();
    el.textContent = '0';

    function animate(time) {
      const progress = Math.min((time - start) / duration, 1);
      el.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(animate);
    observer.disconnect();
  });

  observer.observe(el);
});
