# Annapurna — Agricultural Aggregation & Distribution Network

[![Deploy to GitHub Pages](https://github.com/actions/workflows/deploy.yml/badge.svg)](https://github.com)
[![Smart India Hackathon](https://img.shields.io/badge/SIH-2026-brightgreen.svg)](https://www.sih.gov.in)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)

An integrated, end-to-end digital agricultural logistics and trading platform designed for **Smart India Hackathon (SIH 2026)**. Annapurna bridges the gap between rural farmers/FPOs, commercial buyers, and regional transport fleets to reduce middle layers, minimize post-harvest loss, and ensure guaranteed payouts via automated escrow.

---

## 🚀 Key Features & Modules

### 1. 🌾 Farmer / FPO Hub
- **Harvest Batch Registration**: Direct-to-network crop listing with customized grading, volume, pricing, and certified soil test records.
- **Dynamic Marketplace Publishing**: Newly added produce immediately publishes to the live buyer procurement catalog.
- **Collection Node Scheduling**: Book scheduled pickup slots with local aggregation centers.
- **Escrow Payout Tracking**: Real-time visibility into secured escrow funds and bank disbursements.

### 2. 🛒 Commercial Buyer Marketplace
- **Bulk Supply Discovery**: Verified produce lots with transparent grading, moisture levels, and minimum order requirements.
- **Smart Escrow Checkout**: Automated calculation of produce subtotals, cold-chain transport logistics fees, and assaying charges.
- **Instant Dispatch**: Placing an order decrements available stock and assigns a transit tracking ID (`APN-TRK-XXXXX`).

### 3. 🚚 Transport Fleet & Legal Hub
- **Multi-Tier Fleet Register**: 3-Wheelers (500kg), 4-Wheeler Mini-trucks (1.5T), Heavy Multi-Wheelers (8T+), and Refrigerated Cold-Chain Reefers.
- **Digital RTO Compliance KYC**: In-app inspection and approval of Vahan RC, commercial cargo insurance, and annual fitness certificates.
- **Corridor Assignment**: Routing along major agricultural expressways (Nashik-Mumbai, Pune-Nagpur, etc.).

### 4. 🛡️ Command Center & Live Telemetry
- **Corridor Telematics Map**: Simulated GPS tracking of vehicles in transit with hub checkpoints.
- **Real-Time Audit Stream**: Cross-platform event stream logging every harvest listing, order deposit, and dispatch.
- **Cold Storage IoT Monitors**: Live temperature & humidity telemetry gauges for warehouse cold rooms.

### 5. 🔍 Digital Provenance Passport
- Interactive lot traceability modal providing farm origin, N-P-K soil analysis, FSSAI compliance certification, and cold-chain temperature logs.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Agricultural Design System Tokens)
- **Icons**: Inline SVG Vector Component Engine (`Icon.jsx`)
- **State Management**: Centralized React Context with `localStorage` persistence
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) for automated deployment to GitHub Pages

---

## 💻 Local Development

```bash
# Clone the repository
git clone <your-github-repo-url>
cd web_app

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and publish your site at `https://<username>.github.io/<repo-name>/`.
