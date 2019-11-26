import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twodigit'
})
export class TwoDigitPipe implements PipeTransform {

  transform(input: number): string {
    if (input < 10) { return '0' + input; } else { return '' + input; }
  }

}
