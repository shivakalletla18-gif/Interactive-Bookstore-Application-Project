# Margin Bookshop

A responsive bookstore experience built with React, React Router, and React Context. Browse a curated catalog, search by title/author/category, filter by shelf, inspect book details, and manage a cart that persists in local storage. Checkout is a front-end demo and does not collect or process payment information.

## Run locally

Requirements: Node.js 18+ and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL when the server starts.

## Verify

```sh
npm test
npm run build
```

## Project map

- `src/App.jsx` contains the pages, route layout, cart context, and checkout flow.
- `src/catalog.js` contains the book data and pure search/filter/sort/total helpers.
- `src/catalog.test.js` covers the catalog helpers with Vitest.
- `index.css` contains responsive layout and visual styles.

Book-cover and editorial imagery are loaded from Unsplash and require an internet connection. The demo checkout stores no customer details; order confirmation is only shown in the current session. There is no authentication or payment backend.

## GitHub submission

Create a public GitHub repository, then connect it and push this project:

```sh
git remote add origin https://github.com/<your-account>/<repository>.git
git add .
git commit -m "Build interactive Margin bookstore"
git push -u origin main
```

Submit the public repository or deployed app using the assignment's submission form."# Interactive-Bookstore-Application-Project" 
