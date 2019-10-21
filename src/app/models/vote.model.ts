import {Student} from './student.model';

export class Vote {
  id: string;
  name: string;
  voted_to?: Student;
}
