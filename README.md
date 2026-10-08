# Notes App deployment

The app consists of a Vite/React frontend and an Express/MySQL API. Deploy them over HTTPS. Set the frontend's `VITE_API_URL` to the public API URL and set the API's `FRONTEND_ORIGIN` to the exact public frontend URL. Multiple origins may be supplied as a comma-separated list.

## Backend

1. Create a MySQL database and run `Backend/schema.sql`. For an existing database, run `Backend/migrations/001_add_profile_image.sql` as well.
2. Copy `Backend/.env.example` to `Backend/.env`, set every value, and use a long random `SECRET_KEY`.
3. Install and run:

   ```sh
   cd Backend
   npm ci
   npm start
   ```

The API exposes `GET /health` for host health checks. Configure the host to use `npm start`; it honors `PORT`.

## Frontend

1. Copy `Frontend/.env.example` to `Frontend/.env.production` and set `VITE_API_URL`.
2. Build and host the generated static files:

   ```sh
   cd Frontend
   npm ci
   npm run build
   ```

3. Configure the static host to serve `index.html` for unknown paths, so React routes such as `/profile` work on a direct visit.

## Production notes

- Do not commit `.env` files or database/mail credentials.
- Deploy both origins with HTTPS. The API sets `Secure`, `HttpOnly`, cross-origin session cookies in production.
- For Gmail, use an app password rather than your primary account password.
