// Scroll animation for work gallery items
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.grid .item');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  items.forEach(item => {
    observer.observe(item);
  });
});

