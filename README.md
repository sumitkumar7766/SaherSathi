# LNCT Hackathon Dashboard

A comprehensive smart city management dashboard built with Next.js, designed for the Oriental Hackathon. This dashboard serves as a central hub providing access to various municipal services, monitoring systems, and citizen engagement platforms for efficient urban management.

## Features

### Core Dashboard Components
- **Authentication System**: Secure login with admin credentials (username: `admin`, password: `admin123`)
- **Portal Navigation**: Quick access to all integrated services
- **Real-time Statistics**: Overview of active portals, alerts, citizen services, and system uptime
- **Search Functionality**: Filter portals by name or description
- **Responsive Design**: Optimized for desktop and mobile devices

### Integrated Portals
1. **Safai Mitra**
   - **Purpose**: Sanitation Worker Tracking
   - **Features**: Real-time tracking of 248 sanitation workers across 12 zones
   - **Key Metrics**: 94% attendance rate, worker online status
   - **URL**: [http://localhost:3000/](http://localhost:3000/)

2. **Methane Detector**
   - **Purpose**: Smart Waste Detection System
   - **Features**: 56 active sensors monitoring waste levels
   - **Key Metrics**: 3 high-fill zone alerts, 2 pickups due
   - **URL**: [http://localhost:3001/](http://localhost:3001/)

3. **Water Inflow**
   - **Purpose**: Water Supply Management
   - **Features**: Monitoring of 18 active zones with leak detection
   - **Key Metrics**: 82% average tank levels, 0 current leaks
   - **URL**: [http://localhost:3002/](http://localhost:3002/)

4. **Street Lights**
   - **Purpose**: Smart Lighting Grid Management
   - **Features**: Control and monitoring of 4820 street lights
   - **Key Metrics**: 98% lights operational, auto-mode enabled
   - **URL**: [http://localhost:3011/](http://localhost:3011/)

5. **Green Cover**
   - **Purpose**: Parks & Tree Census Management
   - **Features**: Mapping of 142 parks and 38,000 trees
   - **Key Metrics**: Health status monitoring, 12 planned drives
   - **URL**: [http://localhost:3109/](http://localhost:3109/)

6. **Smart CCTV**
   - **Purpose**: City Surveillance Network
   - **Features**: 842 live cameras with AI-powered alerts
   - **Key Metrics**: 6 cameras offline, active AI monitoring
   - **URL**: [http://localhost:3115/](http://localhost:3115/)

7. **Road Repair**
   - **Purpose**: Pothole & Road Status Tracking
   - **Features**: Logging and tracking of road repair issues
   - **Key Metrics**: 23 potholes logged, 8 under repair, 5 completed today
   - **URL**: [http://localhost:5173/](http://localhost:5173/)

8. **Vasundhara**
   - **Purpose**: Environmental Education Platform
   - **Features**: Educational platform for schools and colleges
   - **Key Metrics**: 50 schools logged, 35,000 students enrolled, 20 NGO partnerships
   - **URL**: [http://localhost:3215/](http://localhost:3215/)

## Tech Stack
- **Framework**: Next.js 16.2.4
- **Frontend**: React 19.2.4
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Next.js with Babel
- **Runtime**: Node.js

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation
1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:4000](http://localhost:4000) in your browser.

### Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

## Building for Production
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure
```text
dashboard/
├── src/
│   └── app/
│       ├── globals.css          # Global styles and Tailwind imports
│       ├── layout.js            # Root layout component
│       ├── page.js              # Login page
│       └── dashboard/
│           └── page.js          # Main dashboard page
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── jsconfig.json               # JavaScript configuration
└── README.md                   # This file
```

## Usage
- **Login**: Use the provided admin credentials to access the dashboard.
- **Navigate Portals**: Click on any portal card to access the respective service.
- **Monitor Statistics**: View real-time stats in the top section of the dashboard.
- **Search**: Use the search bar to quickly find specific portals.

## Contributing
This project is part of the Oriental Hackathon. Contributions are welcome! Please ensure all portal URLs are correctly configured and test thoroughly before submitting changes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
