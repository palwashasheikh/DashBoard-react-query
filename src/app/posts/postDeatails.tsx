// app/posts/[id]/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchPost , Post } from '../lib/lib';
import Navbar from '../components/Navbar';


export default function PostDetailsPage() {
  const { id } = useParams();
  const postId = parseInt(id as string, 10);

  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });

  return (
    <>
      <Navbar />
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load post.</p>}

      {post && (
        <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
         
          <p className="text-gray-700 whitespace-pre-line">{post.body}</p>
        </div>
      )}
    </>
  );
}
