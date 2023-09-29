import { Pipe, PipeTransform } from '@angular/core';
import { clone } from 'src/app/services/ngx-ez/ez-functions/src/public-api';

@Pipe({
  name: 'clone',
})
export class ClonePipe<T> implements PipeTransform {
  transform(value: T): T {
    return clone(value);
  }
}
