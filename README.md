HEAD
# E-Commerce Platform for Local Artisans

A static e-commerce marketplace website for Pakistani handicrafts built with HTML, CSS, and JavaScript.

## Overview

E-Commerce Platform for Local Artisans is a comprehensive e-commerce solution designed for local Pakistani artisans and craft enthusiasts. It enables buyers, sellers, and admins to interact in a complete marketplace ecosystem. It is designed to support:

- Buyer product browsing, cart management, and checkout flow
- Seller product submission and inventory management
- Admin approval workflow for sellers and product listings
- Client-side authentication using browser `localStorage`
- Product catalog localized to Pakistani handicrafts with PKR pricing
- Role-based dashboards for different user types

## Features

- Landing page with product categories, quick view, search and sort controls, and cart sidebar
- Dedicated shop page for enhanced product browsing and filtering
- Dedicated contact page for customer inquiries and support
- Buyer registration, login, and account dashboard
- Seller registration and product upload flow with inventory management
- Admin dashboard for approving sellers, managing products, and order status tracking
- Order management with status transitions and revenue analytics
- Local persistence using browser `localStorage`
- Static hosting ready for GitHub Pages, Netlify, or Vercel

## QA and Validation

- Verified project structure and static file placement
- Confirmed script references load from `js/auth.js`, `js/main.js`, and `js/dashboard.js`
- Checked product data is localized to Pakistani artisans and PKR pricing
- Validated seller and buyer workflows
- Tested admin approval and order management features
- Verified cart functionality and checkout flow

## Project Structure

- `index.html` - Home page and main storefront
- `shop.html` - Dedicated shop page with product browsing and filtering
- `contact.html` - Dedicated contact page with customer support form
- `login.html` - Authentication and user registration page
- `pages/admin-dashboard.html` - Admin panel for marketplace management
- `pages/buyer-dashboard.html` - Buyer account and order history
- `pages/seller-dashboard.html` - Seller product and inventory management
- `css/` - Stylesheets for all pages
- `js/` - JavaScript modules for authentication, dashboard, and marketplace functionality

## Deployment

This project is static and can be deployed directly to:

- GitHub Pages
- Netlify
- Vercel

### GitHub Pages

1. Push the repository to GitHub.
2. Enable GitHub Pages in repository settings.
3. Set the source to the `main` branch and root directory.

### Netlify

1. Connect the repository in Netlify.
2. Set build command to `none` (static site).
3. Deploy from the repository root.

## Notes

- Data is stored locally in the browser; refreshing or clearing storage resets demo data.
- This is a prototype/demo project, not a production-ready application.
- The project is tailored for Pakistani users with local pricing in PKR.

## Usage

1. Open `index.html` in a browser.
2. Register or login from `login.html`.
3. Use the dashboard pages to interact as buyer, seller, or admin.

## Default Demo Accounts

- Admin: `admin@artisancraft.pk` / `admin123`
- Seller: `ayesha@artisancraft.pk` / `seller123`
- Buyer: `asad@artisancraft.pk` / `buyer123`

# E-Commerce-Platform-for-Local-Artisans

c4d6819752881a97be54a24f44dd90c3d0940b52
