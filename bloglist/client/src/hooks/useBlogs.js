import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  // A change to the blogs also changes what the users view shows
  // (each user's blog count), so both lists are marked stale.
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: refresh,
  })

  const likeMutation = useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      }),
    onSuccess: refresh,
  })

  const removeMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: refresh,
  })

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: refresh,
  })

  return {
    blogs: result.data ?? [],
    isPending: result.isPending,
    isError: result.isError,
    // mutateAsync returns a promise, so callers can await and catch errors
    createBlog: (blogObject) => createMutation.mutateAsync(blogObject),
    likeBlog: (blog) => likeMutation.mutateAsync(blog),
    removeBlog: (blog) => removeMutation.mutateAsync(blog),
    addComment: (id, comment) => commentMutation.mutateAsync({ id, comment }),
  }
}
