Bus Booking Tracker — Frontend Documentation
Overview
Bus Booking Tracker is a responsive single-page application (SPA) built with React that helps bus contractors track, filter, and analyze bookings from multiple sources: MakeMyTrip, Goibibo, MyBus, and Personal Bookings.
The app consolidates booking data, provides analytical insights, and allows detailed booking management, all while maintaining a clean and mobile-friendly interface
 
Objectives
•	Display consolidated booking data from multiple sources.
•	Provide summary analytics including bookings by source, date, and time.
•	Enable filtering and sorting by passenger, booking ID, date range, source, and fare.
•	Show detailed booking information in a modal or separate view.
•	Maintain responsive, visually polished UI for mobile and desktop users.

Authentication Credentials 
    Live URL: https://bus-tracking-app-seven.vercel.app/
    Source Code: https://github.com/nitin0557/bus-tracking-app
    Project Doc: https://1drv.ms/w/c/c556f3c9cf990180/EeiPg4TfEbNKig2-11rLGg4Bb0TzmKX7ei_M2Qmf48KHAg?e=W2cyew

            
    Email: admin@mail.com
    Password: 123456

    Email: contractor@mail.com
    Password: 123456

Objectives
•	Display consolidated booking data from multiple sources.
•	Provide summary analytics including bookings by source, date, and time.
•	Enable filtering and sorting by passenger, booking ID, date range, source, and fare.
•	Show detailed booking information in a modal or separate view.
•	Maintain a responsive, visually polished UI for mobile and desktop.
•	Enhancements:
o	Seat tracking
o	Authentication
o	Local storage persistence
o	Global state management with Zustand
•	To be Implemented:
o	Dark/Light`ThemeToggle
o	Create Online Bookings through HomePage
o	Webpack



Technical Stack
•	Frontend: React.js, TypeScript
•	Styling: Tailwind CSS, Material UI
•	State Management: Zustand
•	Routing: React Router with Protected Routes
•	Charts: Recharts
•	Animations & Carousel: Framer Motion, React Slick
•	Storage: LocalStorage
•	Deployment: Vite/CRA, Netlify/Vercel
•	Performance Optimisation: Code Splitting and lazy Loading, Memoization techniques like React.memo, useMemo, useCallback


Implemented
•	Display consolidated booking data from multiple sources.
•	Provide summary analytics including bookings by source, date, and time.
•	Enable filtering and sorting by passenger, booking ID, date range, source, and fare.
•	Show detailed booking information in a modal or separate view.
•	Maintain responsive, visually polished UI for mobile and desktop users.
•	Added Enhancement like Seat tracking 
•	Added Zustand as a store 
•	Added Authentication 
•	Added Infinite Scroll


 
Features
1. Dashboard / Home
•	Top-level KPIs:
o	Total bookings (based on selected range)
o	Bookings per source
o	Bookings today
•	Charts:
o	Booking trends over selected date range (line or area chart)
2. Bookings List
•	Table/Card view of bookings with fields:
o	Passenger name, booking ID, origin, destination, date/time, source, seats, fare, status
•	Pagination or Infinite Scroll for performance
•	Filters:
o	By source, date range, time window
•	Search:
o	By passenger name or booking ID
•	Sorting:
o	By date/time or fare
3. Booking Detail
•	Modal or detailed page showing full booking information including:
o	Passenger details
o	Origin & destination
o	Seats booked
o	Timestamp and source
o	Raw booking metadata (for debugging or internal use)
4. Analytics / Reports
•	Charts:
o	Pie/Bar chart showing distribution of bookings by source
o	Histogram/heatmap for time-of-day bookings
•	Export:
o	CSV export of filtered bookings
5. Responsive Design
•	Mobile-first layout
•	Fully functional on desktop and tablet devices
6. Robustness & UX
•	Loading States: Spinner or skeletons while fetching data
•	Empty States: Informative messages when no bookings are available
•	Error Handling: Graceful messages for API or network errors
•	Accessibility: Semantic HTML and keyboard navigation support
 
Technical Stack
•	Frontend: React (CRA or Vite)
•	Styling: Tailwind CSS (or equivalent)
•	State Management: React Context or Redux Toolkit
•	Routing: React Router
•	Charts: Recharts or Chart.js
•	Optional: TypeScript for type safety
 
Data & Mock API
•	Booking Schema:
•	{
•	  id: number;
•	  passengerName: string;
•	  source: 'mmt' | 'goibibo' | 'mybus' | 'personal';
•	  origin: string;
•	  destination: string;
•	  date: string; // YYYY-MM-DD
•	  time: string; // HH:mm
•	  timestamp: number;
•	  seats: number;
•	  fare: number;
•	  status: 'confirmed' | 'cancelled' | 'pending';
•	  raw: object; // Original booking payload
•	}
•	Mock Data: 50+ sample bookings for demo purposes
•	API: Simulated via api.js with functions like getBookings()
 
Suggested Component Structure
/src
 ├─ components/
 │   ├─ Header.jsx
 │   ├─ Sidebar.jsx
 │   ├─ BookingCard.jsx
 │   ├─ BookingTable.jsx
 │   ├─ Filters.jsx
 │   ├─ KPI.jsx
 │   ├─ ChartBookingsBySource.jsx
 ├─ pages/
 │   ├─ Dashboard.jsx
 │   ├─ Bookings.jsx
 │   ├─ BookingDetail.jsx
 ├─ services/
 │   └─ api.js
 ├─ utils/
 │   └─ date.js
 ├─ App.jsx
 └─ main.jsx
 
Acceptance Criteria
•	Correct display of bookings
•	Filtering and sorting work correctly
•	Dashboard displays charts and KPIs
•	Responsive UI across devices
•	Loading, empty, and error states handled gracefully
•	GitHub repository with a README
•	Live deployment link (Netlify/Vercel/GitHub Pages) or video demo if deployment fails
 
Setup & Installation
1.	Clone the repository:
2.	git clone <repo-url>
3.	cd bus-booking-tracker
4.	Install dependencies:
5.	npm install
6.	Run the development server:
7.	npm start
8.	Open http://localhost:3000 in your browser
 
Project Decisions
•	Tailwind CSS for rapid responsive styling
•	Recharts for interactive charts
•	React Context for lightweight state management (Redux optional)
•	SPA structure ensures fast navigation between pages
 

          
