import {Student} from './student.model';

export class CommentModel {
  id: string;
  text: string;
  commented_at: number;
  commenter: Student;
  deletable: boolean;
}
