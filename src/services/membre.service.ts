import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root',
})
export class MembreService {
  constructor(private httpClient: HttpClient) {}

  GetAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:3000/members');
  }

  AddMember(member: Omit<Member, 'id'>): Observable<Member> {
    return this.httpClient.post<Member>('http://localhost:3000/members', member);
  }
}
