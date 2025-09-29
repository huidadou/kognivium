// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status';
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        formStatus.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      }, 1000);
    });
  }

  // Add scroll effect to header
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add intersection observer for section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.primary-nav a');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${activeId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
  .primary-nav a.active {
    color: #2563eb;
    font-weight: 600;
  }
  
  .site-header {
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);
