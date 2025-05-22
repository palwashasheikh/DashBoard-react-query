// app/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPosts , Post } from './lib/lib';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Public Posts</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load posts.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts?.slice(0, 10).map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <Card className="cursor-pointer hover:bg-gray-50 transition">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600 mt-2">
                  {post.body.slice(0, 80)}...
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
