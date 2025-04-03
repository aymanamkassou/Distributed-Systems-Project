# Fullstack Unsplash App

A complete dockerized application that fetches and displays images from Unsplash API with three microservices.

## Architecture

The application consists of three services:

1. **Frontend Service** (Next.js) - Port 3000
   - Displays images fetched from the Image Service
   - Performance optimized with useMemo
   - Responsive UI

2. **Image Service** (Node.js/Express) - Port 3001
   - Fetches images from Unsplash API
   - Stores images in MongoDB
   - RESTful API

3. **Gallery Service** (Next.js) - Port 3002
   - Displays images from MongoDB
   - Allows syncing from Unsplash to MongoDB
   - Responsive UI

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- Unsplash API access key

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fullstack-unsplash-app.git
cd fullstack-unsplash-app
```

2. Set your Unsplash API key:

Create a `.env` file in the root directory:

```
UNSPLASH_ACCESS_KEY=your_unsplash_api_key_here
```

3. Start the application with Docker Compose:

```bash
docker-compose up -d
```

4. Access the services:
   - Frontend: http://localhost:3000
   - Image Service API: http://localhost:3001/api/images
   - Gallery: http://localhost:3002

## Development

Each service can be developed independently:

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Image Service
```bash
cd image-service
npm install
npm run dev
```

### Gallery Service
```bash
cd gallery-service
npm install
npm run dev
```

## License

MIT 