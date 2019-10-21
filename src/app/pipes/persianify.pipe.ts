import { Pipe, PipeTransform } from '@angular/core';

const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

@Pipe({
  name: 'persianify'
})
export class PersianifyPipe implements PipeTransform {

  transform(input: string): string {
    const len = input.length;
    let res = '';
    let pos;
    let i = 0;
    for (; i < len; i++) {
      if (pos = persianNumbers[input.charAt(i)]) {
        res += pos;
      } else {
        res += input.charAt(i);
      }
    }

    return res;
  }

}
