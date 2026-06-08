# TMDB Proxy

A lightweight node app to proxy the [TMDB API](https://developer.themoviedb.org/). This app is designed as to not expose your **API Key**.
Any request is forwarded to TMDB using the same path and query string, with your API Read Access Token injected server-side.

## Features

- Proxies the **entire** TMDB read API
- Easy **Vercel** deployment
- Your **API Keys** stay secure (server-side)

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
    TMDB_READ_ACCESS_TOKEN=<READ_ACCESS_TOKEN>
    ```

5. Run:
    ```sh
    npm run dev
    ```

## Deployment

1. Fork this repository.

2. Import the github repository in [Vercel](https://vercel.com/).

3. Add the environment variables:
    - `TMDB_READ_ACCESS_TOKEN`  
    under **Vercel** -> **Settings** -> **Environment Variables**

4. Deploy!

5. Your API is now live under your vercel domain.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE.txt) for details.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
