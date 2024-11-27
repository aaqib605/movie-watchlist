**Movie Watchlist App**

The **Movie Watchlist App** is a simple web application that lets users search for movies, view detailed information about them, and add them to their personal watchlist. This app leverages the OMDB API to fetch movie data and allows a smooth user experience for managing their movie preferences.

**Features**

- **Search for Movies**: Search for movies by title using the OMDB API.

- **View Movie Details**: Get detailed information about the selected movie, including its plot, ratings, and other key information.

- **Watchlist**: Add and manage movies in your personal watchlist for easy reference.

**Prerequisites**

Before you begin, make sure you have the following installed on your local machine:

- **Node.js** (version 14 or higher)

- **npm** (Node package manager)

You will also need a **OMDB API Key** to fetch movie data.

**Setup Instructions**

**1\. Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/aaqib605/movie-watchlist.git

cd movie-watchlist-app
```

**2\. Install Dependencies**

Next, install the required npm packages by running:

```bash
npm install
```

**3\. Configure the OMDB API Key**

Create a .env file in the root of your project directory, and add your OMDB API key like so:

```bash
VITE_OMDB_API_KEY=your-omdb-api-key
```

You can get your OMDB API key from [OMDB API](http://www.omdbapi.com/apikey.aspx).

**4\. Start the Development Server**

To start the development server and run the application, use the following command:

```bash
npm run dev
```

Once the server starts, open your browser and visit http://localhost:5173 to see the app in action.

**Usage**

- **Search for Movies**: Enter a movie title in the search bar, and the app will fetch matching results from the OMDB API.

- **View Movie Details**: Click on any movie from the search results to view more details like its plot, ratings, release date, etc.

- **Add to Watchlist**: Movies can be added to the watchlist by clicking a button when viewing the movie details. These movies will be saved in your local storage for easy access later.

**Technologies Used**

- **React**: Front-end library for building the user interface.

- **Vite**: A fast development server for React applications.

- **OMDB API**: Used to fetch movie data.

- **LocalStorage**: Used to persist watchlist data on the client side.

**License**

This project is open-source and available under the MIT License.

Feel free to contribute to this project by opening issues or submitting pull requests. Enjoy exploring movies with your personal watchlist!
