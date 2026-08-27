const heroSliderEl = document.querySelector('.hero__slider');

if (heroSliderEl) {

  const heroSlider = new Swiper(heroSliderEl, {

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

  heroSliderEl.addEventListener('mouseenter', () => {
    heroSlider.autoplay.stop();
  });

  heroSliderEl.addEventListener('mouseleave', () => {
    heroSlider.autoplay.start();
  });

}


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

// ===== Services Slider & Video management in startPageVideos =====

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

// ===== Mobile Menu ======
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__menu a, .header__nav-btn');

if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    document.body.classList.toggle('is_modal');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.classList.remove('is_modal');
    });
  });
}

// ===== Blog Slider ======
const blogSliderEl = document.querySelector('.blog__slider');
if (blogSliderEl) {
  const blogSlider = new Swiper('.blog__slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.blog__pagination',
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
}

// ===== Blog Archive Filter and Search =====
document.addEventListener('DOMContentLoaded', () => {
  const archiveContainer = document.querySelector('.blog-archive');
  if (!archiveContainer) return;

  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const searchInput = document.querySelector('.blog-search__input');
  const blogItems = document.querySelectorAll('.blog-archive__item');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterArticles() {
    blogItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const title = item.querySelector('.blog__card-title').textContent.toLowerCase();
      
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = title.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        item.classList.remove('hide');
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.opacity = '1';
        }, 50);
      } else {
        item.classList.add('hide');
      }
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      filterArticles();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterArticles();
    });
  }
});


// ==================== Preloader & Video Control ====================
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPercent = document.getElementById('preloaderPercent');
  const allVideos = document.querySelectorAll('video');

  // Immediately pause all videos on script execution
  allVideos.forEach(v => {
    try {
      v.pause();
      v.currentTime = 0;
    } catch (e) {}
  });

  document.body.classList.add('preloader-active');

  let progress = 0;
  let isWindowLoaded = false;
  let finished = false;

  function updateDisplay(val) {
    const rounded = Math.min(100, Math.floor(val));
    if (preloaderBar) preloaderBar.style.width = rounded + '%';
    if (preloaderPercent) preloaderPercent.textContent = rounded;
  }

  function finishPreloader() {
    if (finished) return;
    finished = true;

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('is-hidden');
      }
      document.body.classList.remove('preloader-active');

      // Start all videos ONLY after preloader finishes
      startPageVideos();
    }, 250);
  }

  function step() {
    if (!isWindowLoaded) {
      if (progress < 85) {
        progress += (85 - progress) * 0.05 + 0.4;
      }
    } else {
      progress += (100 - progress) * 0.15 + 1.5;
    }

    if (progress >= 99.5) {
      updateDisplay(100);
      finishPreloader();
    } else {
      updateDisplay(progress);
      requestAnimationFrame(step);
    }
  }

  window.addEventListener('load', () => {
    isWindowLoaded = true;
  });

  if (document.readyState === 'complete') {
    isWindowLoaded = true;
  }

  requestAnimationFrame(step);
})();

function startPageVideos() {
  // 1. Hero and Page Services background videos
  const autoplayVideos = document.querySelectorAll('video[data-autoplay], .hero-bg video, .page-services--bg video');
  autoplayVideos.forEach(video => {
    video.play().catch(err => {
      console.log('Video play prevented or paused:', err);
    });
  });

  // 2. Page Services video playback rate behavior
  const videoServices = document.querySelector('.page-services--bg video');
  if (videoServices) {
    videoServices.play().catch(() => {});
    videoServices.addEventListener('timeupdate', () => {
      if (videoServices.duration) {
        const progress = videoServices.currentTime / videoServices.duration;
        if (progress > 0.6) {
          const speed = 1 - ((progress - 0.6) / 0.4) * 0.8;
          videoServices.playbackRate = Math.max(0.2, speed);
        }
      }
    });
  }

  // 3. Services bg video with IntersectionObserver
  const servicesVideo = document.querySelector('.services__bg video');
  if (servicesVideo) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        servicesVideo.currentTime = 0;
        servicesVideo.play().catch(() => {});
        const stopAt = servicesVideo.duration / 2;
        const checkTime = () => {
          if (servicesVideo.duration && servicesVideo.currentTime >= stopAt) {
            servicesVideo.pause();
            servicesVideo.removeEventListener('timeupdate', checkTime);
          }
        };
        servicesVideo.addEventListener('timeupdate', checkTime);
      }
    }, {
      threshold: 0.1
    });
    observer.observe(servicesVideo);
  }
}