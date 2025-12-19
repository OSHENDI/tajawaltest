document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initCarousel();
    initSmoothScroll();
    initHeaderScroll();
    initProductCards();
    initScrollSpy();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

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

        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
            });
        });
    }
}

function initCarousel() {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');

        if (carousel && prevBtn && nextBtn) {
            const scrollAmount = 300;

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
                    const threshold = 30;
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

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

function initProductCards() {
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

            if (this.classList.contains('active')) {
                this.style.color = '#FF5722';
                this.style.borderColor = '#FF5722';
            } else {
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    });

    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
            this.style.backgroundColor = '#45a049';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
            }, 2000);

            updateCartBadge();
        });
    });
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.header-action-btn .badge');
    if (cartBadge) {
        let count = parseInt(cartBadge.textContent) || 0;
        count++;
        cartBadge.textContent = count;

        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = '';
        }, 200);
    }
}


function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');

            if (emailInput && emailInput.value) {
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

    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input');
        const searchBtn = searchForm.querySelector('button');

        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (searchInput && searchInput.value.trim()) {
                    console.log('Searching for:', searchInput.value);
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (this.value.trim()) {
                        console.log('Searching for:', this.value);
                    }
                }
            });
        }
    }
});
