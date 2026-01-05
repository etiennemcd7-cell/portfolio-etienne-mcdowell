// Image transitions for multi-image gallery items - automatic cycling with offset
document.addEventListener('DOMContentLoaded', function() {
  const multiImageItems = document.querySelectorAll('.item-multi-image');
  
  multiImageItems.forEach((item, itemIndex) => {
    const images = item.querySelectorAll('.stack-image');
    if (images.length < 2) return;
    
    let currentIndex = 0;
    let transitionTimer = null;
    
    // Change to next image
    function nextImage() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }
    
    // Start automatic cycling with random offset
    // Random offset between 0 and 2500ms to desynchronize transitions
    const randomOffset = Math.random() * 2500;
    
    setTimeout(function() {
      // Start the first transition after the offset
      nextImage();
      
      // Then continue cycling every 3 seconds
      transitionTimer = setInterval(function() {
        nextImage();
      }, 3000);
    }, randomOffset);
  });
});

