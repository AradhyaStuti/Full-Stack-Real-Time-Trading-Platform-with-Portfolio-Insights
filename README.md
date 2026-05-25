# Broking.Ltd

A trading platform I built to play with real-time data and websockets. There's a fake market running on the backend that ticks every two seconds, and a dashboard that updates as prices move — holdings, P&L, watchlist, all of it.

No real money, no real exchange. Just a stock-broker UI that actually feels alive.

## What's in the repo

Three separate apps:

- **backend/** — the API. Node, Express, MongoDB, Socket.io for the live feed, Passport for sessions.
- **frontend/** — the marketing site. Where you sign up and log in.
- **dashboard/** — the actual trading UI. Watchlist, holdings, orders, positions, charts.

Sign up on the landing site, and it punts you over to the dashboard once you're authenticated.

## Running it

You'll need three terminals. Sorry — that's just the cost of three separate apps.

### Step 1 — set up the backend env

Create a file at `backend/.env`:

```
PORT=3002
MONGO_URL=mongodb://localhost:27017/trading-platform
SESSION_SECRET=replace-with-a-long-random-string
CLIENT_URL_FRONTEND=http://localhost:3000
CLIENT_URL_DASHBOARD=http://localhost:3001
```

If you don't have Mongo running locally, grab a free Atlas URI and paste it in. The backend will refuse to start without `MONGO_URL` and `SESSION_SECRET` — that's intentional.

### Step 2 — install (one time)

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../dashboard && npm install
```

### Step 3 — start everything

Three terminals, one app each.

**Backend** — port 3002:

```bash
cd backend
npm run dev
```

**Landing site** — port 3000:

```bash
cd frontend
npm start
```

**Dashboard** — port 3001 (have to override `PORT` so it doesn't fight the landing site):

```bash
# bash / zsh
PORT=3001 npm start

# PowerShell
$env:PORT="3001"; npm start

# Windows cmd
set PORT=3001 && npm start
```

Then open `http://localhost:3000` and sign up. You'll land on the dashboard at `:3001`.

If your backend ends up on a different host, the React apps read `REACT_APP_API_URL` and `REACT_APP_WS_URL` to find it.

## What the backend exposes

REST under `/api` — auth, holdings, orders, positions. Swagger docs at `/api/docs` once it's running. All routes (except signup/login) are session-protected. Joi validates every request body.

The websocket pushes two events:

- `market:prices` — the full price snapshot when you connect
- `market:update` — small price changes, every 2 seconds

The "market" itself is just a list of stocks in `backend/socket/index.js` with a random-walk price generator. Good enough to make the UI feel real without needing an actual exchange feed.

## Tests

```bash
cd backend
npm test
```

39 tests, all integration-style. They spin up an in-memory Mongo (`mongodb-memory-server`) so you don't need a real database. Covers signup/login, order creation and pagination, holdings totals, user isolation, the request-id and helmet middleware, and the health endpoint.

## Known limitations

A few things this project deliberately doesn't do, so they're not surprises in review:

- Prices are simulated. There's a random walk in `backend/socket/index.js` — no real exchange feed.
- Order settlement is single-step. A BUY upserts into holdings and recomputes a weighted average; a SELL decrements (or deletes the row at zero). No FIFO lots, no clearing-house ledger.
- Sessions live in process memory. Fine for one dev box; in production you'd swap in `connect-redis` or similar.
- No CSRF tokens. Session cookies only. For a public deployment I'd add `csurf` or a double-submit pattern.
- The landing site's copy and product names borrow heavily from Zerodha — it was built to practice React/Bootstrap layout, not as original marketing.

## A few things worth knowing

- Every record (holdings, orders, positions) is keyed by `userId`, so two accounts in the same database never see each other's data. The tests check for this.
- Orders hit the rate limiter before validation — that way spammed requests get rejected cheaply without touching the validator or the DB.
- The dashboard uses a small context (`GeneralContext`) for the buy-window state and a `refreshKey` counter. After a successful order, that counter bumps, and any screen with `refreshKey` in its `useEffect` deps refetches. Avoids prop drilling.
- All errors flow into one error-handler middleware. It knows about Mongo's `CastError`, duplicate-key (11000), and `ValidationError` and turns them into clean 4xx responses with a consistent shape.
