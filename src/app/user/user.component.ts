import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../category.service';
import { UserService } from "./user.service";
import { ArticleService } from "../article/article.service";
import { Article } from "../article/article";
import { SocketIOService } from "../socket.io/socket-io.service";
import { Category } from '../category';
import { User } from './user';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MdMenuTrigger } from '@angular/material'
import {ComponentInteractionService } from "../component-interaction.service";
/// <reference types="aws-sdk" />
declare var AWS: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CategoryService, AuthService, UserService, ArticleService],
  animations: [
  trigger(
    'enterAnimation', [
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('500ms', style({transform: 'translateX(0)'}))
      ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate('500ms', style({transform: 'translateX(100%)'}))
      ])
    ]
    ),
  trigger(
    'searchAnimation', [
    transition(':enter', [
      style({transform: 'scale(0)'}),
      animate('200ms 500ms', style({transform: 'scale(1)'}))
      ]),
    transition(':leave', [
      style({transform: 'scale(1)'}),
      animate('0ms', style({transform: 'scale(0)'}))
      ])
    ]
    )]
})
export class UserComponent implements OnInit {
  categoryList: Category[];
  user: User;
  isSearching: string = 'hide';
  searchedArticles: Article[];
  timeout = null;

  private notifications: any[];
  private totalNotSeenNotifications: number = 0;

  constructor(private categoryService: CategoryService, private userService: UserService, private auth: AuthService, private socketService: SocketIOService, private articleService: ArticleService, private sharedService: ComponentInteractionService) {
    let ec2 = new AWS.EC2();
  }

  ngOnInit() {
    let s3 = new AWS.S3({ params: {bucket: ''}});
    let ec2 = new AWS.EC2();

    this.socketService.initializeSocketInstance();
    this.socketService.listenToNotification().subscribe((notifications) => {
      this.notifications = notifications;
      this.totalNotSeenNotifications = this.countNotSeenNotification(this.notifications);
    });
    this.categoryService.getCategories().then(
      (response) => {
        this.categoryList = response;
      }
      );
    if (this.auth.authenticated()) {
      if (this.checkProfile()) {
        let userId = this.user.identities[0].user_id;
        /* Subscribe to notification event */

        this.socketService.subscribeUser(userId);
      }
    }

    this.sharedService.getLogged().subscribe(
      (Logged: any) => {
        console.log(Logged);
      }
    )
  }

  checkProfile() {
    let profile = localStorage.getItem('profile');
    if (profile) {
      this.user = JSON.parse(profile);
      return true;
    }
    return false;
  }

  countNotSeenNotification(notifications: any[]) {
    this.totalNotSeenNotifications = notifications.length;
    for (let notification of notifications) {
      if (notification.seen == true)
        this.totalNotSeenNotifications--;
    }
    return this.totalNotSeenNotifications;
  }

  markAllAsSeen() {
    if (this.auth.authenticated()) {
      if (this.checkProfile()) {
        let userId = this.user.identities[0].user_id;
        this.userService.markAllNotificationAsSeen(userId);
        this.totalNotSeenNotifications = 0;
      }
    }
  }

  markNotificationAsRead(notificationId: any) {
    if (this.auth.authenticated()) {
      if (this.checkProfile()) {
        let userId = this.user.identities[0].user_id;
        this.userService.markNotificationAsRead(userId, notificationId);
      }
    }
  }

  onSearch() {
    this.isSearching = (this.isSearching === 'show' ? 'hide' : 'show');
  }

  onSearching(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.articleService.getSearchedArticles(event.target.value).then((res) => {this.searchedArticles = res;});
    }, 500);
  }
}
