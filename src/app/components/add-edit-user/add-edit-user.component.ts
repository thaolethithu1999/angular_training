import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/services/model/user';
import { ApiService } from 'src/app/services/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.less']
})
export class AddOrEditUserDialogComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef<any>;
  @Output() message = new EventEmitter<string>();

  editUser: boolean = false;
  errorMsg: string;
  destroy$: Subject<void> = new Subject();
  userForm: FormGroup;
  user: User;

  constructor(private apiService: ApiService,
    private fb: FormBuilder) { 
      this.userForm = this.fb.group({
        id: ['', Validators.required],
        age: ['', Validators.required],
        name: ['', [Validators.required]],
        gender: ['', Validators.required],
        company: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
  }

  openDialog(): void {
    this.userForm.setValue({
      id: this.user?.id,
      age: this.user?.age,
      name: this.user?.name,
      gender: this.user?.gender,
      company: this.user?.company,
      email: this.user?.email
    });
  }

  openAddUser(usersLength: number): void {
    this.editUser = false;
    this.user = {
      id: usersLength + 1,
      age: 0,
      name: '',
      gender: 'male',
      company: '',
      email: ''
    };
    this.userForm.reset();
    this.openDialog();
  }

  openEditUser(user: User): void {
    this.editUser = true;
    this.user = user;
    this.openDialog();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleUpdateUserInfo(): void {
    if (this.userForm.valid) {
      const data: User = this.userForm.value;
      if(this.editUser) {
        this.apiService.updateUser(data).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.apiService.setMessage('Updated succesfully!');
        });
      } else {
        this.apiService.addUser(data).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.apiService.setMessage('Added succesfully!');
        });
      }
      this.closeModal.nativeElement.click();
    } 
  }

}
