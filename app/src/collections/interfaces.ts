interface Collection {
  _id: string;
  toObject: Function;
}

export interface User {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface SavedUser extends Collection, User {}

export interface Atteendee {
  class_id: string;
  username: string;
  name: string;
}

export interface SavedAttendee extends Collection, Atteendee {}

export interface ClassI {
  classname: string;
  description: string;
  location: string;
  date: Date;
  no_of_places: number;
  created_by: string;
  created_by_name: string;
  attendees?: string[];
}

export interface SavedClass extends Collection, ClassI {
  created_date: Date;
}

export interface JwtPayload {
  user_id: string;
  email: string;
  iat: number;
  exp: number;
}
