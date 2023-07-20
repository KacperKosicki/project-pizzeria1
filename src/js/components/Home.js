class Home {
  constructor() {
    this.container = document.querySelector('#home .home-wrapper');
    this.render();
    this.initCarousel();
    this.initGallery();
  }

  render() {
    const context = {
      boxes: [
        {
          class: 'order-box',
          title: 'Order Online',
          description: 'Place an online order and enjoy our delicious pizzas!',
          backgroundImage: 'images/home/pizza-background.jpg',
          showOrderOnlineLabel: true
        },
        {
          class: 'booking-box',
          title: 'Book a Table',
          description: 'Reserve a table and have a great dining experience!',
          backgroundImage: 'images/home/booking-background.jpg'
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
          authorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          active: true,
        },
        {
          quote: 'Amazing service!',
          author: 'Jess Erdem',
          authorImage: 'images/home/man2.jpg',
          authorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          active: true,
        },
        {
          quote: 'Great pizza!',
          author: 'Susanna Stan',
          authorImage: 'images/home/woman1.jpg',
          authorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          active: true,
        },
      ],
      galleryItems: [
        'images/home/restaurant1.jpg',
        'images/home/restaurant2.jpg',
        'images/home/restaurant3.jpg',
        'images/home/restaurant4.jpg',
        'images/home/restaurant5.jpg',
        'images/home/restaurant6.jpg',
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
    const orderBox = document.querySelector('.order-box');
    const bookingBox = document.querySelector('.booking-box');

    orderBox.addEventListener('click', () => {
      window.location.href = 'order.html';
    });

    bookingBox.addEventListener('click', () => {
      window.location.href = 'booking.html';
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
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

  showIcons(item) {
    const icon1 = document.createElement('i');
    icon1.classList.add('fa', 'fa-heart', 'icon');
    icon1.addEventListener('click', () => this.changeIconColor(icon1));

    const icon2 = document.createElement('i');
    icon2.classList.add('fas', 'fa-share', 'icon');
    icon2.addEventListener('click', () => this.changeIconColor(icon2));

    item.appendChild(icon1);
    item.appendChild(icon2);
  }

  hideIcons(item) {
    const icons = item.querySelectorAll('.icon');
    icons.forEach((icon) => {
      item.removeChild(icon);
    });
  }

  changeIconColor(icon) {
    icon.style.color = 'lightcoral';
  }
}

export default Home;