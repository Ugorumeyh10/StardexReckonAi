# StardexReckonAi - AI Reconciliation System

A modern SaaS frontend for automated banking and financial services reconciliation, built with Next.js 15, React 19, and TypeScript.

**Built by Stardex Innovation Limited**

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **File Upload**: React Dropzone

## Features

### Core Functionality
- ✅ Dashboard with real-time statistics and charts
- ✅ File upload with drag-and-drop support
- ✅ Reconciliation job management
- ✅ Exception management with AI explanations
- ✅ Report generation (PDF, Excel, CSV)
- ✅ User management with role-based access
- ✅ Settings configuration

### Key Pages
- `/dashboard` - Main dashboard with stats and overview
- `/upload` - File upload interface
- `/reconciliations` - Reconciliation job list and details
- `/exceptions` - Exception management with AI insights
- `/reports` - Report generation and download
- `/users` - User management
- `/settings` - System configuration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

### Build and Run with Docker

```bash
# Build Docker image
docker build -t stardexreckonai .

# Run container
docker run -p 3000:3000 stardexreckonai

# Or use docker-compose
docker-compose up --build
```

### Test Docker Build

```bash
./scripts/deploy.sh test
```

## Deployment

### Deploy to Vercel (Recommended)

Vercel has native Next.js support - no Docker needed:

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and deploys

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Deploy to Render

Render supports both Docker and native Node.js:

1. Push code to GitHub
2. Create new Web Service in [Render](https://render.com)
3. Choose Docker or Node environment
4. Render auto-deploys on push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy Commands

```bash
# Deploy to Vercel
./scripts/deploy.sh vercel

# Build Docker image
./scripts/deploy.sh docker

# Test Docker build
./scripts/deploy.sh test
```

## Project Structure

```
reckai/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard page
│   ├── upload/            # File upload page
│   ├── reconciliations/   # Reconciliation list page
│   ├── exceptions/        # Exception management page
│   ├── reports/           # Reports page
│   ├── users/             # User management page
│   └── settings/          # Settings page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (Sidebar, Header)
│   ├── dashboard/        # Dashboard-specific components
│   ├── upload/           # Upload components
│   ├── reconciliations/ # Reconciliation components
│   ├── exceptions/       # Exception components
│   ├── reports/          # Report components
│   ├── users/            # User components
│   └── settings/         # Settings components
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Design Philosophy

The UI is designed following modern SaaS dashboard patterns with:
- Clean, professional banking-grade interface
- Consistent spacing and typography
- Accessible components (WCAG compliant)
- Responsive design for mobile and desktop
- Dark mode support (ready for implementation)

## Next Steps

1. **Backend Integration**: Connect to API endpoints
2. **Authentication**: Implement NextAuth.js with MFA
3. **Real-time Updates**: Add WebSocket support for live job progress
4. **Data Tables**: Enhance with TanStack Table for advanced filtering
5. **AI Integration**: Connect to LangChain/LangGraph backend
6. **File Processing**: Implement actual file parsing and normalization
7. **Export Functionality**: Add PDF/Excel generation

## License

Proprietary - Stardex Innovation Limited

