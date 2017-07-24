import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComponentInteractionService {
    private logged: any;
    private subject: Subject<any> = new Subject<any>();
    setLogged(logged: any): void {
      this.logged = logged;
      this.subject.next(logged);
    }

    getLogged(): Observable<any> {
      return this.subject.asObservable();
    }
}
