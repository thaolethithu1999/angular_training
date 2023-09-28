import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/services/model/user';
import { ApiService } from 'src/app/services/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.less']
})
export class AddOrEditUserDialogComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef<any>;
  @Input() user: User;
  @Input() editUser: boolean;
  @Input() users: User[];

  @Output() message = new EventEmitter<string>();

  errorMsg: string;
  updateUser = new Subject<void>();
  addUser = new Subject<void>();
  userForm: FormGroup;

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log({changes});
      this.user = changes['user'] ? changes['user'].currentValue : {};
      this.editUser = changes['editUser'] ? changes['editUser'].currentValue : this.editUser;
      this.users = changes['users'] ? changes['users'].currentValue : {};
      this.updateValueUserForm();
  }

  ngOnInit(): void {
    this.updateValueUserForm();
  }

  ngOnDestroy(): void {
    this.updateUser.next();
    this.addUser.next();

    this.updateUser.complete();
    this.addUser.complete();
  }

  updateValueUserForm(): void {
    if(this.editUser) {
      this.userForm.setValue({
        id: this.user.id,
        age: this.user.age,
        name: this.user.name,
        gender: this.user.gender,
        company: this.user.company,
        email: this.user.email
      });
    } else {
      console.log(this.users);
      
      this.userForm.setValue({
        id: this.user ? this.users.length + 1 : 0,
        age: 0,
        name: '',
        gender: 'male',
        company: '',
        email: ''
      });
    }
  }

  handleUpdateUserInfo(): void {
    // console.log(this.user);
    console.log(this.userForm.value);
    
    const data: User = this.userForm.value;
    // console.log({data});
    
    // if(this.editUser) {
    //   this.apiService.updateUser(data).pipe(takeUntil(this.updateUser)).subscribe(() => {
    //     this.message.emit("Updated succesfully!");
    //   });
    // } else {
    //   this.apiService.addUser(data).pipe(takeUntil(this.addUser)).subscribe(() => {
    //     this.message.emit("Added succesfully!");
    //   });
    // }
    // this.closeModal.nativeElement.click();
  }




}
