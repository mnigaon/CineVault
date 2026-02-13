# 🎬 CineVault

> **Discover, Track, and Explore Movies.**
> A modern, high-performance movie discovery platform built with React, TypeScript, and TMDB API.

![CineVault Banner](https://via.placeholder.com/1200x600?text=CineVault+Dashboard)

## ✨ Features

-   **🎥 Dynamic Movie Discovery**: Browse Trending, Popular, and Top Rated movies with infinite scroll.
-   **🔍 Smart Search**: Real-time search with debounce optimization.
-   **⚡ High Performance**: Built with Vite and TanStack Query for caching and optimistic updates.
-   **🔐 Personalization**: Google Authentication via Firebase.
-   **📝 Watchlist**: Save your favorite movies to your personal watchlist (synced via Cloud Firestore).
-   **🎨 Modern UI/UX**: Responsive Glassmorphism design, dark mode, and smooth animations using Framer Motion.
-   **filers Advanced Filtering**: Filter movies by Genre, Year, Rating, and Sort order.

## 🛠 Tech Stack

-   **Frontend**: React 18, TypeScript, Vite
-   **Styling**: Tailwind CSS, Headless UI, Framer Motion
-   **State Management**: TanStack Query (Server state), Zustand (Client state)
-   **Backend / BaaS**: Firebase Authentication, Cloud Firestore
-   **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
-   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   TMDB API Key
-   Firebase Project Credentials

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/cinevault.git
    cd cinevault
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your keys:

    ```env
    VITE_TMDB_API_KEY=your_tmdb_api_key

    # Firebase Config
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 📁 Project Structure

```bash
src/
├── components/      # Reusable UI components (MovieCard, Skeleton, etc.)
├── features/        # Feature-based modules (Home, Search, MovieDetail, Watchlist)
├── hooks/           # Custom React hooks (useMovies, useWatchlist, useInfiniteScroll)
├── lib/             # API clients and Firebase configuration
├── store/           # Global state management (Zustand)
└── types/           # TypeScript interfaces
```

## 🔒 Security Rules (Firestore)

To ensure data security, use the following rules in your Firebase Console:

```go
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
