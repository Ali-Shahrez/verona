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

// ---------- Menus dropdown ----------
const dropdowns = document.querySelectorAll('.has-dropdown');
dropdowns.forEach(li => {
  const toggle = li.querySelector('.nav-drop-toggle');
  if(!toggle) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = li.classList.contains('open');
    dropdowns.forEach(other => {
      other.classList.remove('open');
      const t = other.querySelector('.nav-drop-toggle');
      if(t) t.setAttribute('aria-expanded', 'false');
    });
    if(!isOpen){
      li.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});
document.addEventListener('click', () => {
  dropdowns.forEach(li => {
    li.classList.remove('open');
    const t = li.querySelector('.nav-drop-toggle');
    if(t) t.setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    dropdowns.forEach(li => li.classList.remove('open'));
  }
});

// ---------- Menu carousel (index.html only) ----------
const track = document.getElementById('carouselTrack');
if(track){
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
}

// ---------- Demo booking form ----------
const bookingForm = document.getElementById('bookingForm');
const confirmMsg = document.getElementById('confirmMsg');
if(bookingForm && confirmMsg){
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    confirmMsg.classList.add('show');
    confirmMsg.textContent = 'This is a design demo — booking requests aren\u2019t sent yet. Once connected, you\u2019ll receive a confirmation here.';
  });
}

// ---------- Demo gift voucher request form ----------
const voucherForm = document.getElementById('voucherForm');
const voucherConfirmMsg = document.getElementById('voucherConfirmMsg');
if(voucherForm && voucherConfirmMsg){
  voucherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    voucherConfirmMsg.classList.add('show');
    voucherConfirmMsg.textContent = 'This is a design demo — voucher requests aren\u2019t sent yet. Once connected, you\u2019ll receive a confirmation here.';
  });
}

// ---------- Job card "Apply for This Role" pre-selects role in form ----------
const jobApplyBtns = document.querySelectorAll('.job-apply-btn');
const roleSelect = document.getElementById('crole');
if(jobApplyBtns.length && roleSelect){
  jobApplyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const role = btn.getAttribute('data-role');
      const options = Array.from(roleSelect.options).map(o => o.value || o.textContent);
      if(role && options.includes(role)){
        roleSelect.value = role;
      }
      const nameField = document.getElementById('cname');
      if(nameField){
        setTimeout(() => nameField.focus(), 550);
      }
    });
  });
}

// ---------- Demo careers application form ----------
const careersForm = document.getElementById('careersForm');
const careersConfirmMsg = document.getElementById('careersConfirmMsg');
if(careersForm && careersConfirmMsg){
  careersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    careersConfirmMsg.classList.add('show');
    careersConfirmMsg.textContent = 'This is a design demo — applications aren\u2019t sent yet. Once connected, you\u2019ll receive a confirmation here.';
  });
}
