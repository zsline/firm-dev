const heroSlider = new Swiper('.hero__slider', {
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
});
heroSlider.el.addEventListener('mouseenter', () => {
  heroSlider.autoplay.stop();
});

heroSlider.el.addEventListener('mouseleave', () => {
  heroSlider.autoplay.start();
});


const servicesSlider = new Swiper('.services__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
});

if (window.innerWidth <= 716) {
  servicesSlider.params.centeredSlides = true;
  servicesSlider.params.autoplay = {
    delay: 2500,
    disableOnInteraction: false,
  };

  servicesSlider.update();
  servicesSlider.autoplay.start();
}


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

// ===== Services ======

const video = document.querySelector('.services__bg video');

if (video) {
  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      video.currentTime = 0;
      video.play();
      const stopAt = video.duration / 2;
      const checkTime = () => {
        if (video.currentTime >= stopAt) {
          video.pause();
          video.removeEventListener('timeupdate', checkTime);
        }
      };
      video.addEventListener('timeupdate', checkTime);
      // observer.disconnect();
    }
  }, {
    threshold: 0.1
  });
  observer.observe(video);
}

// ===== Reviews Slider ======
const reviewsSlider = new Swiper('.reviews__slider', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.reviews__pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

// ===== FAQ Accordion ======
document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq__item');
    const isActive = item.classList.contains('is-active');

    // Close all other items
    document.querySelectorAll('.faq__item').forEach(otherItem => {
      otherItem.classList.remove('is-active');
      const otherAnswer = otherItem.querySelector('.faq__answer');
      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    if (!isActive) {
      item.classList.add('is-active');
      const answer = item.querySelector('.faq__answer');
      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    }
  });
});
