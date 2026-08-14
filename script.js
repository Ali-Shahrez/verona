// ---------- Nav pop-in on scroll ----------
const topStrip = document.getElementById('topStrip');
const siteNav = document.getElementById('siteNav');
const threshold = () => window.innerHeight * 0.62;

function onScroll(){
  if(window.scrollY > threshold()){
    siteNav.classList.add('visible');
    topStrip.classList.add('hide');
  } else {
    siteNav.classList.remove('visible');
    topStrip.classList.remove('hide');
  }
}
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('resize', onScroll);
onScroll();

// ---------- Mobile nav toggle ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if(window.innerWidth <= 900) navLinks.classList.remove('open');
  });
});

// ---------- Menu carousel ----------
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const tabs = Array.from(document.querySelectorAll('.tabs button'));
const dots = Array.from(document.querySelectorAll('.carousel-dots span'));
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let index = 0;
let autoplayTimer;

function goTo(i){
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  tabs.forEach((t, ti) => t.classList.toggle('active', ti === index));
  dots.forEach((d, di) => d.classList.toggle('active', di === index));
}
function next(){ goTo(index + 1); }
function prev(){ goTo(index - 1); }

tabs.forEach((t, i) => t.addEventListener('click', () => { goTo(i); restartAutoplay(); }));
nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

function restartAutoplay(){
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(next, 7000);
}
restartAutoplay();

const viewport = document.querySelector('.carousel-viewport');
viewport.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
viewport.addEventListener('mouseleave', restartAutoplay);

goTo(0);

// ---------- Demo booking form ----------
const bookingForm = document.getElementById('bookingForm');
const confirmMsg = document.getElementById('confirmMsg');
if(bookingForm){
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    confirmMsg.classList.add('show');
    confirmMsg.textContent = 'This is a design demo — booking requests aren\u2019t sent yet. Once connected, you\u2019ll receive a confirmation here.';
  });
}
