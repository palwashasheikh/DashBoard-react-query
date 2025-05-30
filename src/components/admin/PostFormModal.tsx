'use client';

import { Post } from '@/app/lib/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

type PostFormModalProps = {
  post: Post | null;
  onClose: () => void;
};

export default function PostFormModal({ post, onClose }: PostFormModalProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  const isEditing = !!post?.id;

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const endpoint = isEditing && post?.id
          ? `https://jsonplaceholder.typicode.com/posts/${post.id}`
          : `https://jsonplaceholder.typicode.com/posts`;

        const res = await fetch(endpoint, {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body }),
        });

        if (!res.ok) throw new Error('Failed to save post');
        return await res.json();
      } catch (error) {
        console.error('Post mutation failed:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) {
      alert('Title and body are required');
      return;
    }

    mutation.mutate();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>{isEditing ? 'Edit Post' : 'Create Post'}</DialogTitle>
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit' : 'Create'} Post</h2>

        <Input
          className="mb-4"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mb-4">
          <ReactQuill theme="snow" value={body} onChange={setBody} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>

        {mutation.isError && (
          <p className="text-red-500 mt-2">Error: {(mutation.error as Error)?.message}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
