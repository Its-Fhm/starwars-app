export interface Movie {
    episode_id: number;
    title: string;
    opening_crawl: string;
  }
  export interface ListResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
  }