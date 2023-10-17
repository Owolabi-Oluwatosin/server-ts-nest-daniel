export type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CreatePostType = {
  content: string;
  image: string;
  video: string;
  audio: string;
  author: string;
};

export type SigninUserType = {
  email: string;
  password: string;
};

export type AllUserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LikeType = {
  postId: string;
};

export type UserPayload = {
  id: string;
  role: string;
};
