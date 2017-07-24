import { Router } from '@angular/router';
import { User } from './../user/user';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService, private router: Router, private _changeDetectionRef : ChangeDetectorRef) { }

  ngOnInit() {
  }

  checkProfile() {
    let profile = localStorage.getItem('profile');
    if (profile) {
      this.user = JSON.parse(profile);
      return true;
    }
    return false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }
}
