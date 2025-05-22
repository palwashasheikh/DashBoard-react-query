'use client';
import { fetchPost , Post } from '@/app/lib/lib';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AdminPostCard({
  post,
  onEdit,
}: {
  post: Post;
  onEdit: () => void;
}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    },
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-600 mt-2 mb-4">
        {post.body.slice(0, 60)}...
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
}
