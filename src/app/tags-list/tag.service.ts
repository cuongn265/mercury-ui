import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Tag } from '../article/tag';
@Injectable()
export class TagService {
  private apiUrl: string = process.env.apiUrl;
  constructor(private http: Http) { }

  getTagsList() {
    return this.http.get(this.apiUrl + 'articles/tags').toPromise().then(res => res.json()).catch(this.handleError);
  }

  addTag(tag: Tag) {
    let body = JSON.stringify(tag);
    let userToken = localStorage.getItem('id_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', userToken);
    return this.http.post(this.apiUrl + 'articles/tags', body, { headers: headers }).toPromise().then(res => res).catch(this.handleError);
  }

  deleteTag(id: string) {
    let userToken = localStorage.getItem('id_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', userToken);
    return this.http.delete(this.apiUrl + 'articles/tags/' + id, {headers: headers}).toPromise().then(res => res).catch(this.handleError);
  }

  updateTag(tag: Tag) {
    let body = JSON.stringify(tag);
    let userToken = localStorage.getItem('id_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', userToken);
    return this.http.put(this.apiUrl + 'articles/tags/' + tag._id, body, { headers: headers }).toPromise().then(res => res).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
