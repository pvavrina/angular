export interface Album {
  id: number;
  documentId: string;
  title: string;
  mbid?: string;
  release_date?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse {
  data: Album[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}