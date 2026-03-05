import { Injectable } from '@angular/core';
import { Observable, Subject, EMPTY, throwError, timer } from 'rxjs';
import { IUser } from '../users/user.model';

// providedIn tells Angular where to inject the service
// if root is available for the entire application
// makes the service a singleton - only one instance of the service
// - other option is 'platform' if multiple Angular applications are using the service, but isn't common
// - previous options were 'any'
// - could provide a module, but it has been deprecated
// - if providedIn not set, when a component specifies a service as a provider it gets its own
//   copy of the service
@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  currentUser: IUser | null = null;

  constructor() { }

  saveUser(user: IUser): Observable<any> {
    let classes = user.classes || [];
    this.currentUser = {...user, classes: [...classes]};

    return timer(1000);
  }

  enroll(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Already enrolled'));

    // concat returns a new array
    // {...   } returns a new object
    this.currentUser = {
      ...this.currentUser, 
      classes: this.currentUser.classes.concat(classId)
    };

    return timer(1000);
  }

  drop(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (!this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Not enrolled'));

    this.currentUser = {
      ...this.currentUser, 
      classes: this.currentUser.classes.filter((c: string) => c !== classId) 
    };

    return timer(1000);
  }

  signIn(credentials: any): Observable<any> {
    //Never, ever check credentials in client-side code.
    //This code is only here to supply a fake endpoint for signing in.
    if (credentials.email !== 'me@whitebeards.edu' || credentials.password !== 'super-secret')
      return throwError(() => new Error('Invalid login'));

    this.currentUser = {
      userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
      firstName: 'Jim',
      lastName: 'Cooper',
      email: 'me@whitebeards.edu',
      classes: []
    };

    return EMPTY;
  }
}

