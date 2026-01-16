# Simon's Blog

A modern blog application built with React and deployed on Netlify with Neon PostgreSQL database.

## Features

- Create and view blog posts
- Persistent storage with Neon PostgreSQL
- Serverless functions via Netlify
- Responsive design with McDonald's color scheme
- Real-time updates

## Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Netlify Functions
- **Database**: Neon PostgreSQL (serverless)
- **Hosting**: Netlify

## Local Development

### Prerequisites

- Node.js 18+ installed
- Netlify CLI installed globally: `npm install -g netlify-cli`
- Neon database account

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hiltronrex/simple-blog.git
   cd simple-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Neon database connection string:
     ```
     DATABASE_URL=postgresql://user:password@host/database?sslmode=require
     ```

4. Run the database setup script (first time only):
   ```bash
   node setup-db.js
   ```

5. Start the development server with Netlify Dev:
   ```bash
   netlify dev
   ```

   This will start both the Vite dev server and the Netlify Functions locally.

6. Open your browser to `http://localhost:8888`

## Deployment

### Deploy to Netlify

1. Push your code to GitHub

2. Connect your repository to Netlify:
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. Configure environment variables in Netlify:
   - Go to Site settings → Environment variables
   - Add `NETLIFY_DATABASE_URL` with your Neon connection string

4. Deploy! Netlify will automatically build and deploy your site.

### Environment Variables

Set these in your Netlify dashboard:

- `NETLIFY_DATABASE_URL`: Your Neon PostgreSQL connection string

For local development, use `DATABASE_URL` in your `.env` file (the functions will check both).

## Project Structure

```
simple-blog/
├── netlify/
│   └── functions/          # Netlify serverless functions
│       ├── get-posts.js    # GET /api/posts
│       └── create-post.js  # POST /api/posts/create
├── src/
│   ├── components/         # React components
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── setup-db.js            # Database initialization script
├── netlify.toml           # Netlify configuration
└── package.json
```

## Database Schema

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## License

ISC
