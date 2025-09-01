# Lightweight React Template for KAVIA

This project provides a minimal React template extended with routing, authentication, an API client, and basic pages to demonstrate an end-to-end flow connecting to an API Gateway.

## Quick Start

1) Copy .env.example to .env and set these variables:
- REACT_APP_SITE_URL=http://localhost:3000
- REACT_APP_API_GATEWAY_URL=http://localhost:8080
- REACT_APP_WS_URL=ws://localhost:8080/ws/notifications

2) Install dependencies
- npm install

3) Start the app
- npm start

## Implemented Features

- Routing with react-router-dom (Home, Hotel Detail, Cart, Checkout, Orders, Login, Register)
- Axios API client reading base URL from env and forwarding the Authorization header
- Auth context for login/register/logout and profile fetching (/auth/login, /auth/register, /auth/me)
- Simple Cart context with add/remove/clear and total calculation
- WebSocket hook for real-time notifications (REACT_APP_WS_URL)
- Minimal functional UI components (Navbar, cards, forms)

## Notes

- Backend API routes expected by this frontend:
  - GET /hotels, GET /hotels/:id, GET /hotels/:id/menu
  - POST /orders, GET /orders (and optionally GET /orders/:id)
  - POST /auth/login, POST /auth/register, GET /auth/me
- Adjust the routes to match your Gateway if they differ.

For more on React, check out the [React documentation](https://reactjs.org/).
