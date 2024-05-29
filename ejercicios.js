document.querySelectorAll('.video-carousel').forEach(carousel => {
  const carouselInner = carousel.querySelector('.video-carousel-inner');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');

  prevButton.classList.add('carousel-control', 'prev');
  nextButton.classList.add('carousel-control', 'next');

  prevButton.textContent = '<';
  nextButton.textContent = '>';

  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  let scrollAmount = 0;

  prevButton.addEventListener('click', () => {
    const itemWidth = carousel.querySelector('.video-item').clientWidth + 20; 
    scrollAmount = Math.max(scrollAmount - itemWidth, 0);
    carouselInner.style.transform = `translateX(-${scrollAmount}px)`;
  });

  nextButton.addEventListener('click', () => {
    const itemWidth = carousel.querySelector('.video-item').clientWidth + 20; 
    const maxScroll = carouselInner.scrollWidth - carousel.clientWidth;
    scrollAmount = Math.min(scrollAmount + itemWidth, maxScroll);
    carouselInner.style.transform = `translateX(-${scrollAmount}px)`;
  });
});


