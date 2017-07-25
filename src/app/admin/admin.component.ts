import { Router } from '@angular/router';
import { User } from './../user/user';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {ComponentInteractionService } from "../component-interaction.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  user: User;
  userInfo: any = { name: '', email: ''};

  constructor(private auth: AuthService, private router: Router, private _changeDetectionRef : ChangeDetectorRef, private sharedService: ComponentInteractionService  ) { }

  ngOnInit() {
    this.checkProfile();
    this._changeDetectionRef.detectChanges();
  }

  checkProfile() {
    let profile = localStorage.getItem('profile');
    if (profile) {
      this.user = JSON.parse(profile);
    }
  }

  logout() {
    this.router.navigate(['/']);
    this.auth.logout();
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }
}
