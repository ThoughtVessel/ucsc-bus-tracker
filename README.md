# UCSC Bus Tracker

A real-time bus tracking application for the University of California, Santa Cruz (UCSC) campus shuttle system. This web application provides students, faculty, and visitors with up-to-date information about bus arrivals and departures across the UCSC campus.

## Live Demo

You can see a live version of the UCSC Bus Tracker at: https://gigatransit.com/

## Features

- Real-time bus arrival predictions for all major UCSC bus stops
- Organized stop groupings by campus area (Upper Campus, Central Campus, Lower Campus, West Campus)
- Clean, modern interface with responsive design
- Automatic data refresh to ensure accurate arrival times
- Error handling and fallback to cached data when API requests fail

## Technical Overview

The UCSC Bus Tracker is built using:

- **Next.js** - React framework for server-rendered applications
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For modern, responsive styling
- **SC Metro API** - For real-time bus tracking data

The application fetches bus arrival predictions from the SC Metro API and organizes them by stop groups. It implements caching to reduce API calls and handle potential service interruptions gracefully.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Core business logic and data handling
│   ├── data.ts      # API integration and data processing
│   ├── busConfig.ts # Bus stop and route configurations
│   └── debug.ts     # Debugging utilities
└── types/           # TypeScript type definitions
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ucsc-bus-tracker.git
   cd ucsc-bus-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your SC Metro API key:
   ```
   API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UCSC Transportation and Parking Services (TAPS)
- SC Metro for providing the bus tracking API
- The Next.js team for their excellent framework
