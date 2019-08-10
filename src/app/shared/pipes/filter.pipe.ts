import { Pipe, PipeTransform } from '@angular/core';
import {Student} from '../models/student.model';
import {last} from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Student[], searchText: string): any {

    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {
      const fullname = it.fname + ' ' + it.lname;
      return fullname.toLocaleLowerCase().includes(searchText) || it.username.toLocaleLowerCase().includes(searchText);
    });
  }

}
