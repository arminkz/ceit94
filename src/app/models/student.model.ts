import {Music} from './music.model';
import {TimelinePicture} from './timeline.model';

export class Student {
  username: string;
  profile_pic?: string;
  std_number: string;
  firstname: string;
  lastname: string;
  fav_color: number;
  is_alumni: boolean;
  bio?: string;
  quote?: string;
  faculty?: string;
  fav_music?: Music;
  birthday?: number;
  link_twitter?: string;
  link_github?: string;
  link_instagram?: string;
  link_linkedin?: string;
  skills?: string[];
  timeline_pics?: TimelinePicture[];
}
