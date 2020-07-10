export type VoteType = {
  id: string;
  user: {
    id: string;
  };
};

export type PostedByType = {
  id: string;
  name: string;
};

export type LinkType = {
  id: string;
  description: string;
  url: string;
  createdAt: string;
  postedBy: PostedByType;
  votes: Array<VoteType>;
};

export type LinkListType = {
  history: any;
  location: any;
  match: {
    params: any;
  };
};
