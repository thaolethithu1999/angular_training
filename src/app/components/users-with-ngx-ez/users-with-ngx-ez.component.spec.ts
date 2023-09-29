import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithNgxEzComponent } from './users-with-ngx-ez.component';

describe('UsersWithNgxEzComponent', () => {
  let component: UsersWithNgxEzComponent;
  let fixture: ComponentFixture<UsersWithNgxEzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersWithNgxEzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersWithNgxEzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
