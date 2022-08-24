import { client } from './client';

export const CommentApi = {
  getList: ({ _page, _limit, _sort, _order }) => client.get('/comments', { params: { _page, _limit, _sort, _order } }),
  getListPaging: ({ page, limit }) => client.get('/comments/paging', { params: { page, limit } }),
  getDetail: ({ commentId }) => client.get(`/comments/${commentId}`),
  createComment: ({ profile_url, author, content, createdAt }) =>
    client.post('/comments', { profile_url, content, author, createdAt }),
  modifyComment: ({ commentId, profile_url, content, createdAt, author }) =>
    client.put(`/comments/${commentId}`, { profile_url, content, createdAt, author }),
  deleteComment: ({ commentId }) => client.delete(`/comments/${commentId}`),
};
