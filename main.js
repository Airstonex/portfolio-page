const scrollWatcher = document.createElement("div");

const header = document.querySelector(".primary-header");

const logo = document.querySelector(".logo");

const scrollButton = document.querySelector(".btn--scroll-top");

const faders = document.querySelectorAll(".fade-in");

const sliders = document.querySelectorAll(".slide-in");

const lazyImages = document.querySelectorAll(".lazy-img");

// Header

scrollWatcher.setAttribute("data-scroll-watcher", "");

header.before(scrollWatcher);

const headerObserver = new IntersectionObserver(
  (entries) => {
    console.log(entries);

    // Toggle header color and box-shadow

    header.classList.toggle("sticky", !entries[0].isIntersecting);
    header.classList.toggle("box-shadow-1", !entries[0].isIntersecting);
    logo.classList.toggle("z-index-100", !entries[0].isIntersecting);
  },
  { rootMargin: "200px 0px 0px 0px" }
);

headerObserver.observe(scrollWatcher);

// Scroll top button

const scrollButtonObserver = new IntersectionObserver(
  (entries) => {
    console.log(entries);

    // Toggle scrollButton visibility

    scrollButton.classList.toggle("visible", !entries[0].isIntersecting);

    scrollButton.addEventListener("click", () => {
      scrollTop();
    });

    function scrollTop() {
      document.body.scrollTop = 0; // Safari
      document.documentElement.scrollTop = 0; // Firefox, Chrome, Opera
    }
  },
  { rootMargin: "2000px 0px 0px 0px" }
);

scrollButtonObserver.observe(scrollWatcher);

// Fade in

const appearOptions = {
  threshold: 0,
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Slide in

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

// Nav events

const navcontainer = document.querySelector(".primary-navigation-container");

const nav = document.querySelector(".primary-navigation");

const hamburger = document.querySelector(".btn--hamburger");

const navlinks = document.body.querySelectorAll(".primary-navigation a");

function openNav() {
  hamburger.setAttribute("data-state", "opened");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeNav() {
  hamburger.setAttribute("data-state", "closed");
  hamburger.setAttribute("aria-expanded", "false");
}

function showNav() {
  navcontainer.setAttribute("data-visible", "true");
  nav.setAttribute("data-visible", "true");
}

function hideNav() {
  navcontainer.setAttribute("data-visible", "false");
  nav.setAttribute("data-visible", "false");
}

hamburger.addEventListener("click", () => {
  const currentState = hamburger.getAttribute("data-state");
  const visibility =
    nav.getAttribute("data-visible") &&
    navcontainer.getAttribute("data-visible");

  if (!currentState || currentState === "closed") {
    openNav();
  } else {
    closeNav();
  }

  if (visibility === "false") {
    showNav();
  } else {
    hideNav();
  }
});

for (var i = 0; i < navlinks.length; i++) {
  navlinks[i].addEventListener("click", () => {
    if (window.innerWidth < 960) {
      closeNav();
      hideNav();
    }
  });
}

// Form events

document
  .querySelectorAll("input[required], textarea[required]")
  .forEach((e) => {
    e.addEventListener("focusout", () => {
      e.style.borderColor = !!e.value
        ? "var(--clr-neutral-100)"
        : "var(--clr-primary-300)";
    });
  });

document.querySelectorAll("input[type='email']").forEach((e) => {
  e.addEventListener("focusout", () => {
    e.style.borderColor = !!e.value.includes("@")
      ? "var(--clr-neutral-100)"
      : "var(--clr-primary-300)";
  });
});

// Slider

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "flex";
  setTimeout(showSlides, 5000);
}
