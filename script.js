// JavaScript for hamburger menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
//----------------slider js
// Get the elements needed for the slider
(function () {
    const slides = document.querySelectorAll('.slide');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const dots = document.querySelectorAll('.dot');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        const offset = -index * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    next.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prev.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(i);
            resetAutoPlay();
        });
    });

    function autoPlay() {
        autoPlayInterval = setInterval(nextSlide, 9000); // Change slide every 5 seconds
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlay(); // Restart autoplay
    }

    // Start autoplay when the page loads
    document.addEventListener('DOMContentLoaded', function () {
        showSlide(currentSlide);
        autoPlay();
    });
})();
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        slides[0].classList.add('active'); // Make the first slide active
    }
});
//animation js for the heading and the paragraph starts here
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const totalSlideTime = 9000; // Total time for each slide
const animationDuration = 7000; // Total duration for the animations
const holdTime = totalSlideTime - animationDuration; // Time to hold text before fading out

function activateSlide(slide) {
    const headings = slide.querySelectorAll('.animated-heading');
    const paragraph = slide.querySelector('.animated-paragraph');

    // Reset animations for all headings and paragraph in the slide
    headings.forEach(heading => {
        heading.style.animation = 'none';
        heading.style.opacity = 1; // Ensure they are visible
    });
    paragraph.style.animation = 'none';
    paragraph.style.opacity = 1; // Ensure paragraph is visible

    // Trigger reflow to restart animations
    headings.forEach(heading => heading.offsetHeight); 
    paragraph.offsetHeight;

    // Set animations for all headings
    headings.forEach((heading, index) => {
        heading.style.animation = `slideUp ${animationDuration}ms forwards`;
        heading.style.animationDelay = `${1 + index * 1}s`; // Staggered delay for each heading
    });

    // Set animation for the paragraph
    paragraph.style.animation = `slideIn ${animationDuration}ms forwards`;
    paragraph.style.animationDelay = `${1 + headings.length * 1}s`; // Delay after all headings

    // Start fading out after the hold time
    setTimeout(() => {
        headings.forEach(heading => {
            heading.style.opacity = 0; // Fade out
        });
        paragraph.style.opacity = 0; // Fade out
    }, holdTime); // Start fading out after hold time
}

// Start the animation cycle
function startAnimationCycle() {
    activateSlide(slides[currentSlide]); // Activate the current slide

    setInterval(() => {
        // Move to the next slide
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
        activateSlide(slides[currentSlide]); // Activate the next slide
    }, totalSlideTime); // Use total slide time for consistent timing
}

// Start the animation cycle
startAnimationCycle();

// Call nextSlide() whenever the slider moves to a different slide

//-------------------------card slider js ends here
console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		nextBgImageEl.classList.remove("next--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("next--card");
			nextCardEl.classList.add("current--card");

			currentBgImageEl.classList.add("previous--image");
			previousBgImageEl.classList.add("next--image");
			nextBgImageEl.classList.add("current--image");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("previous--card");

			currentBgImageEl.classList.add("next--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("previous--image");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? nextInfoEl.querySelectorAll(".text")
		: previousInfoEl.querySelectorAll(".text"),
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			previousInfoEl.classList.add("next--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("previous--info");
			previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0.8,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();

//-------------------------card slider js ends here
//----------------------popular destination section js starts here------------//
(function () {
    const container = document.querySelector('.destination-container');
    const cards = document.querySelectorAll('.destination-card');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    let currentIndex = 0;
    const visibleCards = 4; // Number of cards to show at once

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // Get the width of a single card including margin
        container.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Initialize the slider
    updateSlider();
})();
//----------------------popular destination section js ends here------------//
$('.testimonials-container').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:2000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left></i>",
            "<i class='fa-solid fa-arrow-right></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        800:{
            items:2
        },
        1000:{
            items:3
        }
    }
});
//----------------------about section js stats here--------------------//
function showContent(tab) {
	// Remove 'active' class from all tabs
	var tabs = document.querySelectorAll('.tab');
	tabs.forEach(function(tabElement) {
	  tabElement.classList.remove('active');
	});

	// Hide all content sections
	var contents = document.querySelectorAll('.content');
	contents.forEach(function(contentElement) {
	  contentElement.classList.remove('active');
	});

	// Show selected content and highlight corresponding tab
	document.querySelector('#' + tab).classList.add('active');
	document.querySelector('.tab[onclick="showContent(\'' + tab + '\')"]').classList.add('active');
  }
//----------------------about section js ends here--------------------//
// -----------------------contact form connection with whatsapp number js starts here
function sendWhatsAppMessage(event) {
	event.preventDefault(); // Prevent the form from submitting normally
	
	// Get the input values
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const subject = document.getElementById('subject').value;
	const message = document.getElementById('message').value;

	// Create the WhatsApp message
	const whatsappMessage = `*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
	const whatsappNumber = '9831092098';
	const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

	// Open WhatsApp
	window.open(whatsappURL, '_blank');
}
// -----------------------contact form connection with whatsapp number js ends here

