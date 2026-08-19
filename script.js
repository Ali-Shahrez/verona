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

// ---------- Web3Forms submission handler (shared by all site forms) ----------
function setupWeb3Form(formId, confirmId, messages){
  const form = document.getElementById(formId);
  const confirm = document.getElementById(confirmId);
  if(!form || !confirm) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(submitBtn){
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending\u2026';
    }
    confirm.classList.remove('show', 'error');

    try{
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if(result.success){
        confirm.textContent = messages.success;
        confirm.classList.add('show');
        form.reset();
      } else {
        confirm.textContent = messages.error;
        confirm.classList.add('show', 'error');
      }
    } catch(err){
      confirm.textContent = messages.error;
      confirm.classList.add('show', 'error');
    } finally {
      if(submitBtn){
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

setupWeb3Form('bookingForm', 'confirmMsg', {
  success: 'Thank you \u2014 your booking request has been sent. We\u2019ll be in touch shortly to confirm.',
  error: 'Something went wrong sending your request. Please call us on 01274 043495.'
});

setupWeb3Form('voucherForm', 'voucherConfirmMsg', {
  success: 'Thank you \u2014 your voucher request has been sent. We\u2019ll be in touch shortly.',
  error: 'Something went wrong sending your request. Please call us on 01274 043495.'
});

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

setupWeb3Form('careersForm', 'careersConfirmMsg', {
  success: 'Thank you \u2014 your application has been sent. We\u2019ll be in touch if there\u2019s a good fit.',
  error: 'Something went wrong sending your application. Please call us on 01274 043495.'
});
