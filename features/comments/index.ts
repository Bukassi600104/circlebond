export type CircleComment = {
  id: string;
  announcementId: string | null;
  parentCommentId: string | null;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  body: string | null;
  status: "visible" | "deleted" | "moderated";
  createdAt: string;
  updatedAt: string;
};
