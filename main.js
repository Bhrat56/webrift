// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                // Close navbar on link click for mobile
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });

        // Intersection Observer for animations
        const sections = document.querySelectorAll('.section, .hero-section');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(element => {
                        element.classList.add('animated');
                    });
                } else {
                    // Optional: remove 'animated' class if you want animations to replay on scroll back
                    // entry.target.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(element => {
                    //     element.classList.remove('animated');
                    // });
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

        sections.forEach(section => {
            observer.observe(section);
        });