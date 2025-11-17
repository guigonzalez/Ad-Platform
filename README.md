# Ads Platform - MVP Frontend Prototype

Demo prototype for an ads automation platform with unified dashboard for Google Ads and Meta Ads management.

## 🌍 Internationalization (i18n)

This project supports multiple languages:
- 🇺🇸 English (en)
- 🇧🇷 Português (pt-BR)

### Using i18n in Components

```tsx
import { useTranslation } from "@/lib/i18n/context";

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t.dashboard.title}</h1>
      <p>{t.dashboard.subtitle}</p>
    </div>
  );
}
```

### Changing Language

Users can change language using the LanguageSwitcher component in the header. The selected language is automatically saved to localStorage.

### Adding New Translations

1. Add keys to `lib/i18n/locales/en.ts`
2. Add corresponding translations to `lib/i18n/locales/pt-BR.ts`
3. TypeScript will ensure type safety across all languages

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Features

- ✅ Landing page with language switcher
- ✅ Dashboard with metrics and charts
- ✅ Mock data for 20+ campaigns
- ✅ Platform comparison (Google Ads vs Meta Ads)
- ✅ Responsive design (mobile + desktop)
- ✅ Full i18n support (EN + PT-BR)
- ⏳ Campaigns list page (pending)
- ⏳ Campaign creation wizard (pending)
- ⏳ Automation rules page (pending)
- ⏳ Organization management (pending)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **i18n**: Custom React Context solution

## 📁 Project Structure

```
ads-platform/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout with I18nProvider
│   └── dashboard/         # Dashboard pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   └── ...
├── lib/
│   ├── i18n/              # Internationalization
│   │   ├── locales/       # Translation files
│   │   │   ├── en.ts      # English translations
│   │   │   └── pt-BR.ts   # Portuguese translations
│   │   └── context.tsx    # i18n React Context
│   ├── mock-data.ts       # Mock campaigns data
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Utility functions
└── README.md
```

## 🎨 Design Decisions

- **Mock Data**: All campaign data is mocked for demo purposes
- **No Backend**: This is a frontend-only prototype
- **Local Storage**: Language preference persisted in browser
- **Client Components**: Using "use client" for interactivity

## 📝 Next Steps

1. Implement campaigns list page with filters and actions
2. Create campaign creation wizard (4 steps)
3. Build automation rules management page
4. Add organization/team management
5. Deploy to Vercel

## 🌐 Deployment

```bash
# Deploy to Vercel
vercel deploy
```

## 📄 License

Demo prototype for investor presentation.
