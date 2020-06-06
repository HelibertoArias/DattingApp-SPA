import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseUrl = environment.apiUrl + "auth/";

  jwtHelper = new JwtHelperService();

  decodedToken: any;
  currentUser: User;

  private photoUrlSubject = new BehaviorSubject<string>('../../assets/user.png');
  photoUrl$ = this.photoUrlSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(`${this.baseUrl}login`, model)
          .pipe(
                map((reponse: any) => {
                  const user = reponse;

                  if (user) {
                    localStorage.setItem("token", user.token);
                    localStorage.setItem('user', JSON.stringify(user.user));

                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                    this.currentUser = user.user;

                    this.changeMemberPhoto(this.currentUser.photoUrl);

                  }
            })
    );
  }

  register(user: User){
    return this.http.post( `${this.baseUrl}register`, user);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  changeMemberPhoto(photoUrl: string) : void{
    this.photoUrlSubject.next(photoUrl);
  }
}
