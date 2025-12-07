# TravelTrucks 🚐

A modern web application for camper rental services built with Next.js 15, TypeScript, and Zustand.

## 🌟 Features

- **Home Page** — Hero banner with call-to-action
- **Catalog** — Browse all available campers with advanced filtering
  - Filter by location (text search)
  - Filter by vehicle type (Van, Fully Integrated, Alcove)
  - Filter by equipment (AC, kitchen, TV, bathroom, etc.)
- **Camper Details** — Detailed camper page with:
  - Photo gallery
  - Features & specifications
  - User reviews with star ratings
  - Online booking form
- **Favorites** — Save campers to favorites (persisted in localStorage)
- **Pagination** — Load more campers with server-side pagination
- **Internationalization** — Support for English and Ukrainian languages
- **Responsive Design** — Optimized for desktop and mobile devices

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand (with persist middleware)
- **Data Fetching:** TanStack Query + Axios
- **Styling:** CSS Modules
- **Forms:** Formik + Yup validation
- **i18n:** next-intl
- **Date Picker:** react-datepicker

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/dmode9000/project-campers.git
cd project-campers
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env-example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── catalog/           # Catalog page & camper details
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/
│   ├── api/              # API client functions
│   └── store/            # Zustand stores
├── types/                 # TypeScript type definitions
├── messages/              # i18n translations (en, uk)
└── public/               # Static assets
```

## 🔗 API

The application uses MockAPI backend:
- Base URL: `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io`
- `GET /campers` — Get all campers (with filtering & pagination)
- `GET /campers/:id` — Get camper by ID

## 🌐 Demo

Live demo: [https://project-campers.vercel.app](https://project-campers.vercel.app)

## 👤 Author

**DMD** — [GitHub](https://github.com/dmode9000)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
