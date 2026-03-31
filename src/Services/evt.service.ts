import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evt } from 'src/Models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  GetAllEvents(): Observable<Evt[]> {
    return this.http.get<Evt[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<Evt> {
    return this.http.get<Evt>(`${this.apiUrl}/${id}`);
  }

  postEvent(evt: Evt): Observable<Evt> {
    return this.http.post<Evt>(this.apiUrl, evt);
  }

  updateEvent(id: string, evt: Evt): Observable<Evt> {
    return this.http.put<Evt>(`${this.apiUrl}/${id}`, evt);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
