# Verona — Front-End Redesign

A front-end redesign for [Verona](https://www.veronacleckheaton.com/home), an Italian restaurant in Cleckheaton, West Yorkshire. Same content and business info as the live site, with a new layout, styling, and interactions.

**Live demo:** [ali-shahrez.github.io/verona](https://ali-shahrez.github.io/verona/)

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Main Menu | `main-menu.html` |
| Summer Menu | `summer-menu.html` |
| Specials | `specials.html` |
| Early Bird Menu | `early-bird.html` |
| Children's Menu | `childrens-menu.html` |
| Buffet Menu | `buffet-menu.html` |
| Gift Vouchers | `gift-vouchers.html` |
| Careers | `careers.html` |

## Features

- Fully responsive layout with a mobile nav and dropdown menu
- Auto-playing, swipeable menu carousel on the homepage
- Consistent design system across all pages (typography, spacing, colour tokens)
- Live booking, gift voucher, and job application forms — submitted via [Web3Forms](https://web3forms.com/), with front-end validation, loading state, and success/error confirmation
- Careers page with role-specific "Apply for This Role" buttons that pre-select the relevant role in the application form
- Smooth scroll navigation and scroll-triggered nav bar

## Tech Stack

Plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks.

- **Fonts:** [Italiana](https://fonts.google.com/specimen/Italiana) (display) & [Jost](https://fonts.google.com/specimen/Jost) (body/UI), loaded via Google Fonts
- **Styling:** a single `styles.css`, organised by section/page with CSS custom properties for the colour palette
- **Scripting:** a single `script.js` handling nav behaviour, the menu carousel, dropdowns, and form submissions
- **Forms:** [Web3Forms](https://web3forms.com/) — no backend required; submissions are POSTed directly from the browser and emailed to the configured inbox

## Project Structure

```
verona/
├── index.html
├── main-menu.html
├── summer-menu.html
├── specials.html
├── early-bird.html
├── childrens-menu.html
├── buffet-menu.html
├── gift-vouchers.html
├── careers.html
├── styles.css
├── script.js
└── images/
```

## Running Locally

No build tools required — clone the repo and open `index.html` in a browser, or serve it locally:

```bash
git clone https://github.com/ali-shahrez/verona.git
cd verona
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Forms

All three forms (booking, gift voucher, careers) submit to Web3Forms via `fetch()` from `script.js`. Each form has its own hidden `access_key` and `subject` field, plus a honeypot (`botcheck`) field for spam protection. No server-side code is needed — submissions arrive by email at the address tied to the Web3Forms access key.

## Notes

- Content (menus, hours, pricing, job listings) is sourced from the live Verona Cleckheaton site.
- This project is not affiliated with or endorsed by Verona, Cleckheaton.
