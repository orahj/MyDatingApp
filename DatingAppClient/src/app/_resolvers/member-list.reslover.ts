import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { User } from 'src/app/_models/user';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService,
        private router: Router, private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.erorr('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
