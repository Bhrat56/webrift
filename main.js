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

// REMOVE this whole block
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');

  fetch('services.json')
    .then(res => res.json())
    .then(data => {
      const service = data.find(s => s.id === serviceId);
      if (service) {
        document.getElementById('service-title').innerText = service.title;
        document.getElementById('service-description').innerText = service.description;
        document.getElementById('service-image').src = service.image;

        const keywordsList = document.getElementById('service-keywords');
        service.keywords.forEach(keyword => {
          const li = document.createElement('li');
          li.textContent = `• ${keyword}`;
          keywordsList.appendChild(li);
        });
      } else {
        document.getElementById('service-details').innerHTML = '<h2>Service not found.</h2>';
      }
    });
});

