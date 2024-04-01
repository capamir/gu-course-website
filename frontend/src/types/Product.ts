export interface ProductType {
  id: number;
  title: string;
  bio: string;
  description: string;
  price: number;
  image: string;
  chapters?: ChapterType[];
  reviews?: ReviewType[];
}

interface ChapterType {
  id: number;
  title: string;
  lessons?: LessonType[];
}

interface LessonType {
  id: number;
  title: string;
}

interface ReviewType {
  id: number;
  name: string;
  description: string;
}
