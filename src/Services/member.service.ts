import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Models/Member';

// @Injectable permet d'injecter ce service dans d'autres composants ou services
@Injectable({
  // 'root' signifie que le service est disponible dans toute l'application
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }
  // Observable est un flux de données asynchrone
  GetAllMembers(): Observable<Member[]> {
    // Envoyer une requete en mode GET vers le backend pour recuperer un tableau de membres
    return this.httpClient.get<Member[]>('http://localhost:3000/members');
  }
  
  postMember(newMember: Member): Observable<Member> {
    return this.httpClient.post<Member>('http://localhost:3000/members', newMember);
  }

  deleteMember(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/members/${id}`);
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`http://localhost:3000/members/${id}`);
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClient.put<Member>(`http://localhost:3000/members/${member.id}`, member);
  }
  
}