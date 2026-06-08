# TMDB Proxy

A lightweight node app to proxy the [TMDB API](https://developer.themoviedb.org/). This app is designed as to not expose your **API Key**.

## Features

- Search movies and tv shows
- Easy **Vercel** deployment
- Secure **API Key** storage

## Getting Started

### Prerequisites

- A [TMDB API Key](https://www.themoviedb.org/settings/api)
- A Vercel account

### Running locally

1. Clone the repository:
    ```sh
    git clone https://github.com/VOD-Downloaders/TMDB-Proxy.git
    cd TMDB-Proxy
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create `.env.local` file.

4. Add your **API Keys** to the file:
    ```sh
    TMDB_API_KEY=<APIKEY>
    TMDB_READ_ACCESS_TOKEN=<APIKEY>
    ```

5. Run:
    ```sh
    npm run dev
    ```

## Deployment

1. Fork this repository.

2. Import the github repository in [Vercel](https://vercel.com/).

3. Add the environment variables:
    - `TMDB_API_KEY`
    - `TMDB_READ_ACCESS_TOKEN`  
    under **Vercel** -> **Settings** -> **Environment Variables**

4. Deploy!

5. Your API is now live under your vercel domain.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE.txt) for details.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
