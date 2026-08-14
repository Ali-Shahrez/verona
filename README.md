# Verona — Front-End Redesign

A front-end redesign concept for [Verona](https://www.veronacleckheaton.com/home), an Italian restaurant in Cleckheaton, West Yorkshire. This is a static demo built to showcase a modern visual direction for the existing site — same content and business info, new layout, styling, and interactions.

**Live demo:** [ali-shahrez.github.io/verona](https://ali-shahrez.github.io/verona/)

> This is a design demo, not a production site. Booking, voucher, and job application forms are front-end only and are not connected to a live backend.

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
- Demo booking, gift voucher, and job application forms with front-end validation and confirmation states
- Careers page with role-specific "Apply for This Role" buttons that pre-select the relevant role in the application form
- Smooth scroll navigation and scroll-triggered nav bar

## Tech Stack

Plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks, no dependencies beyond Google Fonts.

- **Fonts:** [Italiana](https://fonts.google.com/specimen/Italiana) (display) & [Jost](https://fonts.google.com/specimen/Jost) (body), loaded via Google Fonts
- **Styling:** a single `styles.css`, organised by section/page with CSS custom properties for the colour palette
- **Scripting:** a single `script.js` handling nav behaviour, the menu carousel, dropdowns, and demo form submissions

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

## Notes

- Content (menus, hours, pricing, job listings) is sourced from the live Verona Cleckheaton site and is used here for demo purposes only.
- This project is not affiliated with or endorsed by Verona, Cleckheaton.
