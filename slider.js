const slider = document.getElementById('gallery-slider');
const images = slider.querySelectorAll('img');
const totalImages = images.length;
let index = 0;
const visible = 3; // tampil 3 gambar per frame
let autoSlide;

// Update slide + animasi fade
function updateSlide() {
  const width = images[0].clientWidth + 10; // +gap
  slider.style.transform = `translateX(${-index * width}px)`;

  // fade in animasi
  images.forEach(img => img.classList.remove('show'));
  for (let i = index; i < index + visible; i++) {
    if (images[i]) images[i].classList.add('show');
  }
}

// Navigasi
function nextSlide() {
  if (index < totalImages - visible) index++;
  else index = 0;
  updateSlide();
}

function prevSlide() {
  if (index > 0) index--;
  else index = totalImages - visible;
  updateSlide();
}

// Auto slide control
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Tombol manual
document.querySelector('.slide-btn.next').addEventListener('click', () => {
  stopAutoSlide(); nextSlide(); startAutoSlide();
});
document.querySelector('.slide-btn.prev').addEventListener('click', () => {
  stopAutoSlide(); prevSlide(); startAutoSlide();
});

// Swipe support (HP)
let startX = 0;
slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slider.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) { stopAutoSlide(); nextSlide(); startAutoSlide(); }
  else if (endX - startX > 50) { stopAutoSlide(); prevSlide(); startAutoSlide(); }
});

// Pause auto saat hover
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

images.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
    stopAutoSlide();
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
  startAutoSlide();
});

// Mulai
updateSlide();
startAutoSlide();
