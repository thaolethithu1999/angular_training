import { Component, Input, TemplateRef, ContentChild } from '@angular/core';
import { SortDirection } from '../../../../../../ez-functions/src/lib/multiple-sort';

@Component({
  selector: 'ez-column',
  templateUrl: './ez-column.component.html',
  styleUrls: ['./ez-column.component.less'],
})
export class EzColumnComponent {
  @Input()
  property = '';

  @Input()
  heading?: string;

  @Input()
  id?: string;

  @Input('sortable')
  set sortableSet(val: string | boolean) {
    this.sortable = val !== undefined && val !== false;
  }
  sortable = true;

  @Input()
  compare?: (a: any, b: any) => number;

  @Input()
  display?: (item: any) => string;

  @Input()
  headingClass = '';

  @Input()
  headingId?: string;

  @Input()
  cellClass = '';

  @Input()
  width?: string;

  @Input()
  breakGrouping = true;

  direction?: SortDirection;

  @ContentChild(TemplateRef)
  template?: TemplateRef<any>;
}
