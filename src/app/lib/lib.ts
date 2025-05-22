// lib/api.ts

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Post = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}
