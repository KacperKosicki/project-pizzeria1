class Home {
    constructor() {
      this.container = document.querySelector('#home-wrapper');
      this.render();
      this.initCarousel();
      this.addEventListeners();
    }
  
    render() {
        this.renderBoxes();
        this.renderCarousel();
        this.renderGallery();
      }
      
      renderBoxes() {
        const boxesContent = `
          <div class="boxes">
            <div class="box order-box">
              <h2>Order Online</h2>
              <p>Place an online order and enjoy our delicious pizzas!</p>
            </div>
            <div class="box booking-box">
              <h2>Book a Table</h2>
              <p>Reserve a table and have a great dining experience!</p>
            </div>
            <div class="box opening-box">
              <h2>Opening Hours</h2>
              <p>Monday - Friday: 9am - 10pm<br>Saturday - Sunday: 10am - 11pm</p>
            </div>
          </div>
        `;
        this.container.innerHTML = boxesContent;
      }
      
      renderCarousel() {
        const carouselContent = `
          <div class="carousel">
            <div class="carousel-item active">
              <blockquote>
                <p>Great pizza, amazing service!</p>
                <footer>- John Doe</footer>
              </blockquote>
            </div>
            <div class="carousel-item">
              <blockquote>
                <p>Delicious and authentic Italian flavors!</p>
                <footer>- Jane Smith</footer>
              </blockquote>
            </div>
            <div class="carousel-item">
              <blockquote>
                <p>Best pizza in town, hands down!</p>
                <footer>- Mike Johnson</footer>
              </blockquote>
            </div>
          </div>
        `;
        this.container.innerHTML += carouselContent;
      }
      
      renderGallery() {
        const galleryContent = `
          <div class="gallery">
            <div class="gallery-item">
              <div class="overlay">
                <i class="fas fa-search"></i>
              </div>
            </div>
            <div class="gallery-item">
              <div class="overlay">
                <i class="fas fa-search"></i>
              </div>
            </div>
            <div class="gallery-item">
              <div class="overlay">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </div>
        `;
        this.container.innerHTML += galleryContent;
      }
  
    initCarousel() {
      const carouselElement = document.querySelector('.carousel');
      new Flickity(carouselElement, {
        autoPlay: true,
        wrapAround: true,
      });
    }
  
    addEventListeners() {
      const orderBox = document.querySelector('.order-box');
      const bookingBox = document.querySelector('.booking-box');
  
      orderBox.addEventListener('click', () => {
        window.location.href = 'order.html';
      });
  
      bookingBox.addEventListener('click', () => {
        // Redirect to the Booking page
        window.location.href = 'booking.html';
      });
  
      const galleryItems = document.querySelectorAll('.gallery-item');
      galleryItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          // Animate the text on hover
          item.classList.add('animate');
        });
  
        item.addEventListener('mouseleave', () => {
          // Remove the text animation
          item.classList.remove('animate');
        });
      });
    }
  }
  
  // Create an instance of Home class
  const home = new Home();

  export default Home;