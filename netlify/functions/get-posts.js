import { neon } from '@neondatabase/serverless';

export default async (req, context) => {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const posts = await sql`
      SELECT id, title, date, excerpt, content, created_at
      FROM blog_posts
      ORDER BY created_at DESC
    `;

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const config = {
  path: '/api/posts',
};
