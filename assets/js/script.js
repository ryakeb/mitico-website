// Menu filter + carousel
const tags = document.querySelectorAll(".menu-tag");
const cards = document.querySelectorAll(".menu-card");
const carousel = document.getElementById("menuCarousel");
const btnPrev = document.querySelector(".carousel-btn.prev");
const btnNext = document.querySelector(".carousel-btn.next");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

const filterCards = category => {
  tags.forEach(tag => tag.classList.toggle("active", tag.dataset.category === category));
  cards.forEach(card => {
    card.classList.toggle("is-hidden", card.dataset.category !== category);
  });

  if (carousel) {
    carousel.scrollTo({ left: 0, behavior: "smooth" });
    updateButtons();
  }
};

// Navigation du carousel
const getScrollAmount = () => {
  if (!carousel) return 280;
  const visibleCard = carousel.querySelector(".menu-card:not(.is-hidden)");
  return visibleCard ? visibleCard.getBoundingClientRect().width + 18 : 280;
};

const updateButtons = () => {
  if (!carousel || !btnPrev || !btnNext) return;
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  btnPrev.disabled = carousel.scrollLeft <= 0;
  btnNext.disabled = carousel.scrollLeft >= maxScrollLeft - 5;
  carousel.classList.toggle("is-scrolled", carousel.scrollLeft > 12);
};

btnPrev?.addEventListener("click", () => {
  carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
});

btnNext?.addEventListener("click", () => {
  carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
});

carousel?.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateButtons);
});

// Interactions des tags
tags.forEach(tag => {
  tag.addEventListener("click", () => {
    filterCards(tag.dataset.category);
  });
});

// Mobile nav toggle
navToggle?.addEventListener("click", () => {
  navToggle.classList.toggle("is-open");
  mainNav?.classList.toggle("is-open");
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navToggle?.classList.remove("is-open");
    mainNav?.classList.remove("is-open");
  });
});

// Photo carousel
const photoSlides = Array.from(document.querySelectorAll(".photo-slide"));
const photoPrev = document.querySelector(".photo-prev");
const photoNext = document.querySelector(".photo-next");
let photoIndex = 0;

const updatePhotoCarousel = () => {
  photoSlides.forEach((slide, idx) => {
    slide.classList.toggle("is-active", idx === photoIndex);
  });
};

photoPrev?.addEventListener("click", () => {
  photoIndex = (photoIndex - 1 + photoSlides.length) % photoSlides.length;
  updatePhotoCarousel();
});

photoNext?.addEventListener("click", () => {
  photoIndex = (photoIndex + 1) % photoSlides.length;
  updatePhotoCarousel();
});

if (photoSlides.length) {
  updatePhotoCarousel();
}

// Collabs ribbon carousel
const collabTrack = document.getElementById("collabsTrack");
const collabPrev = document.querySelector(".collab-prev");
const collabNext = document.querySelector(".collab-next");
let collabTimer;

const getCollabStep = () => {
  if (!collabTrack) return 220;
  const logo = collabTrack.querySelector(".collab-logo");
  return logo ? logo.getBoundingClientRect().width + 14 : 220;
};

const updateCollabButtons = () => {
  if (!collabTrack || !collabPrev || !collabNext) return;
  const maxScrollLeft = collabTrack.scrollWidth - collabTrack.clientWidth;
  collabPrev.disabled = collabTrack.scrollLeft <= 0;
  collabNext.disabled = collabTrack.scrollLeft >= maxScrollLeft - 5;
};

collabPrev?.addEventListener("click", () => {
  collabTrack?.scrollBy({ left: -getCollabStep(), behavior: "smooth" });
});

collabNext?.addEventListener("click", () => {
  collabTrack?.scrollBy({ left: getCollabStep(), behavior: "smooth" });
});

collabTrack?.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateCollabButtons);
});

const startCollabAuto = () => {
  if (!collabTrack) return;
  clearInterval(collabTimer);
  collabTimer = window.setInterval(() => {
    const maxScrollLeft = collabTrack.scrollWidth - collabTrack.clientWidth;
    const step = getCollabStep() * 0.75;
    if (collabTrack.scrollLeft >= maxScrollLeft - 5) {
      collabTrack.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    collabTrack.scrollBy({ left: step, behavior: "smooth" });
  }, 2600);
};

const stopCollabAuto = () => {
  clearInterval(collabTimer);
};

collabTrack?.addEventListener("mouseenter", stopCollabAuto);
collabTrack?.addEventListener("mouseleave", startCollabAuto);

// Option, on force une catégorie par défaut au chargement
window.addEventListener("DOMContentLoaded", () => {
  const defaultTag = document.querySelector('.menu-tag[data-category="classiques"]');
  if (defaultTag) {
    filterCards(defaultTag.dataset.category);
  }
  updateButtons();
  updateCollabButtons();
  startCollabAuto();
});
