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

const menuHasSub = document.getElementById('menuHasSub');
menuHasSub.querySelector('a').addEventListener('click', (e) => {
  if(window.innerWidth <= 900){
    e.preventDefault();
    menuHasSub.classList.toggle('open');
  }
});

// close mobile nav after tapping a real link
navLinks.querySelectorAll('a:not([href="#menus"])').forEach(a => {
  a.addEventListener('click', () => {
    if(window.innerWidth <= 900) navLinks.classList.remove('open');
  });
});

// ---------- Reveal menu cards on scroll ----------
const cards = document.querySelectorAll('.menu-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
cards.forEach((c, i) => {
  c.style.transitionDelay = (i % 3) * 0.08 + 's';
  io.observe(c);
});
