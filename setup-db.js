import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_OyZDAf1BNYP2@ep-sweet-hill-aejubkj0-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function setupDatabase() {
  const sql = neon(DATABASE_URL);

  try {
    console.log('Creating blog_posts table...');

    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Table created successfully!');

    // Insert initial sample posts
    console.log('Inserting sample posts...');

    await sql`
      INSERT INTO blog_posts (title, date, excerpt, content)
      VALUES
        (
          'Getting Started with React',
          'January 15, 2026',
          'Learn the basics of React and start building modern web applications.',
          'React is a powerful JavaScript library for building user interfaces. In this post, we''ll explore the fundamental concepts that make React so popular among developers.

## Why React?

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Key Concepts

- **Components**: Building blocks of React applications
- **Props**: How components communicate
- **State**: Managing dynamic data
- **Hooks**: Modern way to add functionality

Whether you''re building a simple blog or a complex application, React provides the tools you need to succeed.'
        ),
        (
          'Deploying to Netlify',
          'January 14, 2026',
          'A comprehensive guide to deploying your web applications to Netlify.',
          'Netlify is an excellent platform for deploying modern web applications. It offers continuous deployment, serverless functions, and a global CDN.

## Why Netlify?

Netlify simplifies the deployment process with features like:

- **Automatic deployments** from Git
- **Instant rollbacks** to previous versions
- **Custom domains** and HTTPS
- **Edge functions** for dynamic content

## Getting Started

The deployment process is straightforward:

1. Connect your Git repository
2. Configure build settings
3. Deploy with a single click

With Netlify, you can focus on building great applications while they handle the infrastructure.'
        ),
        (
          'Modern CSS Techniques',
          'January 12, 2026',
          'Explore modern CSS features that will improve your web development workflow.',
          'CSS has evolved significantly over the years. Modern CSS provides powerful tools for creating responsive, beautiful designs with less code.

## CSS Grid and Flexbox

These layout systems have revolutionized how we build layouts:

- **Grid**: Perfect for two-dimensional layouts
- **Flexbox**: Ideal for one-dimensional layouts

## Custom Properties

CSS variables make it easy to maintain consistent themes and enable dynamic styling.

## Modern Selectors

New pseudo-classes and selectors give you more control over styling specific elements.

The future of CSS is bright, with new features constantly being added to make web development easier and more powerful.'
        )
      ON CONFLICT DO NOTHING
    `;

    console.log('Sample posts inserted successfully!');
    console.log('Database setup complete!');

  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
