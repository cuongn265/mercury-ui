import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from './user';
import { Comment } from '../comment';
import { Article } from '../article/article';
import { Observable } from "rxjs/Observable";
import { SocketIOService } from "../socket.io/socket-io.service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private apiUrl: string = process.env.apiUrl;

    public usersList: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string
    }[] = [];
    constructor(private http: Http, private socketService: SocketIOService) { }

    getUserAccounts(): Promise<User[]> {
        let userToken = localStorage.getItem('id_token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', userToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiUrl + 'users', options).toPromise().then(response => response.json()).catch(this.handleError);
    }

    getUserAccount(userId: number): Promise<User> {
        return this.http.get(this.apiUrl + 'users/' + userId).toPromise().then(response => response.json()).catch(this.handleError);
        
    }

    getUserProfileImage(userId: string): Promise<string> {
        return this.http.get(this.apiUrl + 'users/' + userId + '/image').toPromise().then((imageURL) => imageURL.text()).catch(this.handleError);
    }

    toggleStatus(userId: string) {
        let putUrl = this.apiUrl + 'users/' + userId + '/toggleStatus';
        let userToken = localStorage.getItem('id_token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', userToken);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(putUrl, {}, options).toPromise().then(response => response).catch(this.handleError);
    }

    unlockUser(userId: string) {
        let putUrl = this.apiUrl + 'users/' + userId + '/unlock';
        return this.http.put(putUrl, {}).toPromise().then(response => response).catch(this.handleError);
    }

    markAllNotificationAsSeen(userId: string) {
        let postUrl = this.apiUrl + 'notifications/users/' + userId + '/seenAll';
        let userToken = localStorage.getItem('id_token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', userToken);
        let options = new RequestOptions({ headers: headers });
        this.http.post(postUrl, {}, options).toPromise().then(response => response).catch(this.handleError);
    }

    markNotificationAsRead(userId: string, notificationId: string) {
        let putUrl = this.apiUrl + 'notifications/' + notificationId + '/markAsRead';
        this.http.put(putUrl, {}).toPromise().then(response => {
            this.socketService.markNotificationAsRead(userId);
        }).catch(this.handleError);
    }
    // '/:userId/articles/:articleId/toggleBookmark'
    toggleBookmark(userId: string, articleId: string) {
        let url = this.apiUrl + 'users/' + userId + '/articles/' + articleId + '/toggleBookmark';
        return this.http.put(url, {}).toPromise().then(res => res).catch(this.handleError);
    }

    getBookmarks(userId: string): Promise<Article[]> {
        let url = this.apiUrl + 'users/' + userId + '/articles/bookmarks';
        return this.http.get(url).toPromise().then(res => res.json()).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
