/* ================================================
   E-Store Landing Page JavaScript
   Arabic RTL E-Commerce Website
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initCarousel();
    initSmoothScroll();
    initHeaderScroll();
    initProductCards();
});

/* ================================================
   Mobile Menu Toggle
   ================================================ */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.classList.toggle('active');
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
            });
        });
    }
}

/* ================================================
   Product Carousel
   ================================================ */
function initCarousel() {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');

        if (carousel && prevBtn && nextBtn) {
            const scrollAmount = 300;

            // For RTL, we need to invert the scroll direction
            prevBtn.addEventListener('click', function () {
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', function () {
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    });
}

/* ================================================
   Smooth Scroll for Anchor Links
   ================================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const threshold = 30; // Better threshold for clear section entry

                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const scrollPosition = targetPosition - headerHeight - threshold;

                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ================================================
   Header Scroll Effect
   ================================================ */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

/* ================================================
   Product Cards Interactions
   ================================================ */
function initProductCards() {
    // Wishlist button functionality
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            }

            // Visual feedback
            if (this.classList.contains('active')) {
                this.style.color = '#FF5722';
                this.style.borderColor = '#FF5722';
            } else {
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    });

    // Add to cart button functionality
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Get product info
            const card = this.closest('.product-card');
            const productTitle = card ? card.querySelector('.product-title')?.textContent : '';

            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
            this.style.backgroundColor = '#45a049';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
            }, 2000);

            // Update cart badge
            updateCartBadge();
        });
    });
}

/* ================================================
   Update Cart Badge
   ================================================ */
function updateCartBadge() {
    const cartBadge = document.querySelector('.header-action-btn .badge');
    if (cartBadge) {
        let count = parseInt(cartBadge.textContent) || 0;
        count++;
        cartBadge.textContent = count;

        // Animation
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = '';
        }, 200);
    }
}

/* ================================================
   Newsletter Form Submission
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');

            if (emailInput && emailInput.value) {
                // Visual feedback
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'تم الاشتراك ✓';
                submitBtn.style.backgroundColor = '#45a049';
                emailInput.value = '';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
});

/* ================================================
   Search Functionality
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.search-bar');

    if (searchForm) {
        const searchInput = searchForm.querySelector('input');
        const searchBtn = searchForm.querySelector('button');

        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (searchInput && searchInput.value.trim()) {
                    console.log('Searching for:', searchInput.value);
                    // Add search logic here
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (this.value.trim()) {
                        console.log('Searching for:', this.value);
                        // Add search logic here
                    }
                }
            });
        }
    }
});

/* ================================================
   Category Cards Hover Effect
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-0.5rem)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});
