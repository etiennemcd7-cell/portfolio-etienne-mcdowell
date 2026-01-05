// Lightbox functionality for gallery images with automatic image cycling
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.grid .item-link');
  
  let lightboxCycleTimer = null;
  let lightboxImages = [];
  let lightboxCurrentIndex = 0;

  // Open lightbox on image click (for multi-image items, cycle through images)
  galleryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const multiImageItem = this.querySelector('.item-multi-image');
      if (multiImageItem) {
        e.preventDefault();
        
        // Get all images from the multi-image item
        const stackImages = multiImageItem.querySelectorAll('.stack-image');
        lightboxImages = Array.from(stackImages).map(img => ({
          src: img.src,
          alt: img.alt
        }));
        
        if (lightboxImages.length > 0) {
          lightboxCurrentIndex = 0;
          lightboxImage.src = lightboxImages[0].src;
          lightboxImage.alt = lightboxImages[0].alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Start cycling through images if there are multiple
          if (lightboxImages.length > 1) {
            startLightboxCycling();
          }
        }
      }
    });
  });

  // Cycle through images in lightbox
  function startLightboxCycling() {
    clearInterval(lightboxCycleTimer);
    lightboxCycleTimer = setInterval(function() {
      if (lightboxImages.length > 1) {
        lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
        lightboxImage.src = lightboxImages[lightboxCurrentIndex].src;
        lightboxImage.alt = lightboxImages[lightboxCurrentIndex].alt;
      }
    }, 3000); // Change image every 3 seconds
  }

  // Close lightbox
  function closeLightbox() {
    clearInterval(lightboxCycleTimer);
    lightboxCycleTimer = null;
    lightboxImages = [];
    lightboxCurrentIndex = 0;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});

