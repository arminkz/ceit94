import {Music} from './music.model';

export class Student {
  username: string;
  profile_pic?: string;
  fname: string;
  lname: string;
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
