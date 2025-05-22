'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPost,fetchPosts , Post } from '../lib/lib';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PostFormModal from '@/components/admin/PostFormModal';
import AdminPostCard from '@/components/admin/AdminPostCard';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: fetchPosts,
  });

  const openCreateModal = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={openCreateModal}>+ New Post</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load posts.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts?.slice(0, 10).map((post) => (
          <AdminPostCard
            key={post.id}
            post={post}
            onEdit={() => {
              setEditingPost(post);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <PostFormModal
          post={editingPost}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
