class Home {
  constructor() {
    this.container = document.querySelector('#home .home-wrapper');
    this.render();
    this.initCarousel();
    this.initGallery();
    this.addEventListeners();
  }

  render() {
    const context = {
      boxes: [
        {
          class: 'order-box',
          title: 'Order Online',
          description: 'Place an online order and enjoy our delicious pizzas!',
          backgroundImage: 'images/home/pizza-1.jpg',
          showOrderOnlineLabel: true
        },
        {
          class: 'booking-box',
          title: 'Book a Table',
          description: 'Reserve a table and have a great dining experience!',
          backgroundImage: 'images/home/pizza-2.jpg'
        },
        {
          class: 'opening-box',
          title: 'OPENING HOURS',
          description: 'TUE-SUN, 12PM - 12AM',
          backgroundImage: '-'
        }
      ],
      carouselItems: [
        {
          quote: 'Great pizza, amazing service!',
          author: 'John Doe',
          authorImage: 'images/home/man1.jpg',
          authorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque id diam vel quam elementum pulvinar etiam non.',
          active: true,
        },
        {
          quote: 'Amazing service!',
          author: 'Jess Erdem',
          authorImage: 'images/home/man2.jpg',
          authorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque id diam vel quam elementum pulvinar etiam non.',
          active: true,
        },
        {
          quote: 'Great pizza!',
          author: 'Susanna Stan',
          authorImage: 'images/home/woman1.jpg',
          authorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque id diam vel quam elementum pulvinar etiam non.',
          active: true,
        },
      ],
      galleryItems: [
        'images/home/restaurant1.jpg',
        'images/home/restaurant2.jpg',
        'images/home/restaurant3.jpg',
        'images/home/restaurant4.jpg',
        'images/home/restaurant5.jpg',
        'images/home/pizza-4.jpg',
      ],
    };

    const templateSource = document.getElementById('template-home').innerHTML;
    const template = Handlebars.compile(templateSource);
    this.container.innerHTML = template(context);

    this.initCarousel();
  }

  initCarousel() {
    const carouselElement = this.container.querySelector('.carousel');
    // eslint-disable-next-line no-undef
    const flkty = new Flickity(carouselElement, {
      autoPlay: true,
      wrapAround: true,
      prevNextButtons: false,
    });
  
    flkty.on('select', () => {
      const allSlides = carouselElement.querySelectorAll('.carousel-item');
      allSlides.forEach((slide, index) => {
        slide.classList.toggle('carousel-item-hidden', index !== flkty.selectedIndex);
      });
    });
  }

  addEventListeners() {
    const orderBox = this.container.querySelector('.order-box');
    const bookingBox = this.container.querySelector('.booking-box');

    orderBox.addEventListener('click', () => {
      window.location.href = '#/order';
    });

    bookingBox.addEventListener('click', () => {
      window.location.href = '#/booking';
    });

    const galleryItems = this.container.querySelectorAll('.gallery-item');

    galleryItems.forEach((item) => {
      const iconContainer = document.createElement('div');
      iconContainer.classList.add('icon-container');
      item.appendChild(iconContainer);

      const icon1 = document.createElement('i');
      icon1.classList.add('fas', 'fa-heart', 'icon');
      iconContainer.appendChild(icon1);

      const icon2 = document.createElement('i');
      icon2.classList.add('fas', 'fa-share', 'icon');
      iconContainer.appendChild(icon2);

      item.addEventListener('mouseenter', () => {
        item.classList.add('animate');
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('animate');
      });
    });
  }
  
  initGallery() {
    const galleryItems = this.container.querySelectorAll('.gallery-item');

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.changeIconColor(item);
      });

      item.addEventListener('mouseenter', () => {
        this.showIcons(item);
      });

      item.addEventListener('mouseleave', () => {
        this.hideIcons(item);
      });
    });
  }

  changeIconColor(item) {
    const icons = item.querySelectorAll('.icon');
    icons.forEach((icon) => {
      icon.style.color = '#ff0000'; // Kolor czerwony
    });
  }

  // Funkcja pokazująca ikony na zdjęciu w galerii
  showIcons(item) {
    const iconContainer = item.querySelector('.icon-container');
    iconContainer.style.opacity = '1';
  }

  // Funkcja ukrywająca ikony na zdjęciu w galerii
  hideIcons(item) {
    const iconContainer = item.querySelector('.icon-container');
    iconContainer.style.opacity = '0';
  }

}

export default Home;