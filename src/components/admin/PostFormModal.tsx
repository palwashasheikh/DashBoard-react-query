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

export default function PostFormModal({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');

  const isEditing = !!post?.id;

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts${isEditing ? `/${post.id}` : ''}`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body }),
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      onClose();
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        {/* Accessibility title for screen readers */}
        <DialogTitle>{isEditing ? 'Edit Post' : 'Create Post'}</DialogTitle>

        {/* Optional visible heading */}
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit' : 'Create'} Post</h2>

        <Input
          className="mb-4"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill theme="snow" value={body} onChange={setBody} />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
