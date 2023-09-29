import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/services';
import { User } from 'src/app/services/model/user';
import { cloneDeep } from 'lodash';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  @ViewChild('closeDeleteUserModal') closeDeleteUserModal: ElementRef<any>;
  initialUsersList: any;
  users: User[];
  user: User;
  editUser: boolean;
  addUser: boolean;
  message: string;
  errorMsg: string;
  destroy$: Subject<void> = new Subject();
  numberOfPages: number = 1;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  pages: number[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUsers(): void {
    this.apiService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.initialUsersList = res;
      this.users = res;
      this.editUser = false;
      this.numberOfPages = Math.ceil(this.users.length / this.itemsPerPage);
      this.pages = this.range(1, this.numberOfPages);
      this.processPaging();
    });
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  processPaging(pageNumber?: number): void {
    this.currentPage = pageNumber ? pageNumber : this.currentPage;
    this.users = this.initialUsersList.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
  }

  previousPage(): void {
    if(this.currentPage != 1) {
      this.processPaging(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if(this.currentPage != this.pages.length) {
      this.processPaging(this.currentPage + 1);
    }
  }

  onChangeSearchText(e: any) {
    let searchString = e.target.value;

    if(searchString) {
      let resultList: User[] = [];
      this.users = this.initialUsersList.forEach((user: User) => {
        if(user.age.toString().includes(searchString) || user.name.toLowerCase().includes(searchString) ||
          user.gender.toLowerCase().includes(searchString) || user.company.toLowerCase().includes(searchString) ||
          user.email.toLowerCase().includes(searchString) || user.id.toString().includes(searchString)) {
            resultList.push(user);
        }
      }); 
      this.users = resultList;
    } else {
      this.users = this.initialUsersList;
      this.processPaging();
    }
  }

  getMessage(): void {
    this.apiService.getMessage().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      console.log({res});
      if(res) {
        this.message = res;
        this.getUsers();
      }
    });
  }

  deleteUser(user: User) {
    this.user = user;
  }

  handleDeleteUser(): void {
    const params = this.user.id;
    this.apiService.deleteUser(params).subscribe((res) => {
      this.message = 'Deleted successfully!';
      this.closeDeleteUserModal.nativeElement.click();
      this.getUsers();
    })
  }
}
