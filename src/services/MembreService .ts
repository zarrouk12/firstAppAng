import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from 'src/models/Member';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
// le decorateur injectable permet d'injecter le service dans les composants ou les services
export class MembreService {
  constructor(private httpClient: HttpClient) {}
  GetAllMembers(): Observable<Member[]> {
    //envoyer une requete en mode GET vers le backend

    return this.httpClient.get<Member[]>('http://localhost:3000/members');
  }
 AddMembers(m: Member): Observable<void> {
        
    return this.httpClient.post<void>('http://localhost:3000/members',m);
  }
}