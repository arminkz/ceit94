import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../../models/student.model';
import {delay} from 'rxjs/operators';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.scss']
})
export class UserSearchComponent implements OnInit {

  @Input() voteName: string;
  @Output() selectedUser = new EventEmitter<Student>();

  isLoaded = false;

  searchText: string;
  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.isLoaded = true;
    });
  }

  selectStudent(s: Student) {
    this.selectedUser.emit(s);
  }

}