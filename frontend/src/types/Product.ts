export interface ProductType {
  id: number;
  title: string;
  bio: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  chapters?: ChapterType[];
  reviews?: ReviewType[];
  details?: DetailsType;
  updated: string;
  members_count: number;
  rate: number;
  teachers: TeacherType[];
}

export interface ChapterType {
  id: number;
  title: string;
  duration_Chapter: number;
  lesson_total: number;
  lessons?: LessonType[];
}

export interface LessonType {
  id: number;
  title: string;
  duration: number;
}

interface ReviewType {
  id: number;
  name: string;
  description: string;
}

export interface DetailsType {
  progress: number;
  status: string;
  duration: string;
  support: string;
  requirement: string;
}

export interface TeacherType {
  id: number;
  name: string;
  title: string;
  image: string;
}
