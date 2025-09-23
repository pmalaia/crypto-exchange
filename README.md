# Crypto Exchange

Test project: a simple SPA built with Vue 3 to display cryptocurrency rates and perform exchanges.  
Supported currencies: **Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Solana (SOL)**.

---

## 🚀 Features

- Fetching live crypto-to-USD rates (via [CoinGecko API](https://www.coingecko.com/en/api)).
- Auto-refresh every 30 seconds (only when the tab is active).
- Exchange form: select From/To currency, input amount, and see converted result instantly.
- Exchange history logging (amount, result, date).
- Minimal responsive UI.

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/) + Composition API
- TypeScript
- Fetch API
- Pinia
- TailwindCSS

---

## 📦 Installation & Run

```bash
# 1. Clone the repo
git clone https://github.com/pmalaia/crypto-exchange.git
cd crypto-exchange

# 2. Install dependencies
npm install

# 3. Run the project
npm run dev

# 4. Open in browser
http://localhost:5173/
```
