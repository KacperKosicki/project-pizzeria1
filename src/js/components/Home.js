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
          title: 'ORDER ONLINE',
          description: 'Place an online order and enjoy our delicious pizzas!',
          backgroundImage: 'images/home/pizza-1.jpg',
          showOrderOnlineLabel: true
        },
        {
          class: 'booking-box',
          title: 'BOOK A TABLE',
          description: 'Reserve a table and have a great dining experience!',
          backgroundImage: 'images/home/pizza-2.jpg'
        },
        {
          class: 'opening-box',
          title: 'OPENING HOURS',
          description: 'TUE-SUN, 12PM - 12AM',
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
        'images/home/pizza-4.jpg',
        'images/home/pizza-5.jpg',
        'images/home/pizza-6.jpg',
        'images/home/pizza-7.jpg',
        'images/home/pizza-8.jpg',
        'images/home/pizza-9.jpg',
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
      item.addEventListener('click', () => {
        this.changeIconColor(item);
      });

      item.addEventListener('mouseenter', () => {
        this.showIcons(item);
      });

      item.addEventListener('mouseleave', () => {
        this.hideIcons(item);
      });

      const iconContainer = item.querySelector('.icon-container');
      const icons = iconContainer.querySelectorAll('.icon');

      icons.forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          this.changeIconColorOnHover(icon);
        });

        icon.addEventListener('mouseleave', () => {
          this.resetIconColor(icon);
        });
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

      const iconContainer = item.querySelector('.icon-container');
      const icons = iconContainer.querySelectorAll('.icon');

      icons.forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          this.changeIconColorOnHover(icon);
        });

        icon.addEventListener('mouseleave', () => {
          this.resetIconColor(icon);
        });
      });
    });
  }

  showIcons(item) {
    const iconContainer = item.querySelector('.icon-container');
    const icons = iconContainer.querySelectorAll('.icon');
    icons.forEach((icon) => {
      icon.style.color = '#ffffff';
    });
  }

  hideIcons(item) {
    const iconContainer = item.querySelector('.icon-container');
    const icons = iconContainer.querySelectorAll('.icon');
    icons.forEach((icon) => {
      icon.style.color = '#ffffff';
    });
  }

  changeIconColorOnHover(icon) {
    icon.style.color = '#ff6b6b';
  }

  resetIconColor(icon) {
    icon.style.color = '#ffffff';
  }
}

export default Home;