import {Music} from './music.model';

export class Student {
  username: string;
  email?: string;
  profile_pic?: string;
  std_number?: number;
  fname: string;
  lname: string;
  fav_color: number
  bio?: string;
  myquote?: string;
  faculty?: string;
  fav_music?: Music;
  birthday?: number;
  link_twitter?: string;
  link_github?: string;
  link_instagram?: string;
  link_linkedin?: string;
  skills?: string[];
  timeline_pics?: string[];
}
