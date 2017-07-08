import { AuthService } from './../auth.service';
import { Http } from '@angular/http';
import { ArticleService } from './../article/article.service';
import { UserService } from './../user/user.service';
import { User } from './../user/user';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog, MdSnackBar } from '@angular/material';
import { MenuItem, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService, AuthService]
})
export class UsersListComponent implements OnInit {

  users: User[];
  selectedUser: User[];
  articlesList: Article[];
  stacked: boolean;
  items: MenuItem[];
  icon: string;
  visible: boolean = true;

  constructor(private http: Http, private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    // TODO: Fix undefined response when get data via service
    this.getUser();
  }

  getUser() {
    this.userService.getUserAccounts().then((results) => {
      this.users = results;
    });
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  changeState(event: any, user: User) {
    this.userService.toggleStatus(user._id).then((res) => {
      this.refresh(this);
    });
    return true;
  }

  refresh(self: this) {
    setTimeout(function () {
      self.userService.getUserAccounts().then((results) => {
        self.users = results;
      });
    });
  };
}
