export interface SideNavItem {
  title: string;
  link: string;
}

export enum UserType {
  ADMIN,
  USER,
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  mobile: string;
  password: string;
  blocked: boolean;
  active: boolean;
  createdOn: string;
  userType: UserType;
  fine: number;
}

export interface Book {
  id:number;
  titre: string;
  libelle: string;
  subCategory: string;
  price: number;
  available: boolean;
  count?: number;
  auteur: string;
}

export interface CategoryBooks {
  libelle: string;
  subCategory: string;
  books: Book[];
}

export interface Order {
  id:number;
  userId: number;
  user?: string;
  name: string;
  livreId: number;
  livre?: string;
  bookName: string;
  orderedOn: string;
  returned: boolean;
}

export interface Category {
  name: string;
  children?: Category[];
}
