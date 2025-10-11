export type Author = {
  id: string;
  name: string;
  reputation: number;
  avatar: string | null;
};

export type Stats = {
  comments: number;
  answers: number;
  votes: number;
};

export interface ProfileType extends Author {
  tagsHistory: string[];
  interest: QuestionPreviewType[];
}

export type QuestionPreviewType = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  author: Author;
  stats: Stats;
  createdAt: string;
  updatedAt: string;
};

export type CommentType = {
  id: string;
  body: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
};
export type AnswerType = {
  id: string;
  body: string;
  votes: number;
  author: Author;
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
};

export type QuestionType = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  author: Author;
  stats: Stats;
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  answers: AnswerType[];
};