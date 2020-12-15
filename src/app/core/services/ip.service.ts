import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICharm } from '../interfaces/charm';
import { IIPText } from '../interfaces/ip';

@Injectable()
export class IpService {

  constructor(private http: HttpClient) {}

  getCurrentIP(): Observable<string> {
    return this.http
      .get<{ ip: string }>(environment.urlIP)
      .pipe(map(res => res.ip));
  }

  hasCharm(ip: string): Observable<string> {
    const searchUrl = `?where=${escape(`ip = '${ip}'`)}`;
    const url = environment.backendless.endpoints.ip_addresses + searchUrl;

    return this.http.get<ICharm[]>(url).pipe(
      map((data: ICharm[]) => {
        if (data.length > 0) {
          return data[0].text;
        } else {
          return '';
        }
      })
    );
  }

  addCharm(ip: string, text: string): Observable<IIPText> {
    const url = environment.backendless.endpoints.ip_addresses;
    const charm = {ip, text};

    return this.http.post<IIPText>(url, JSON.stringify(charm));
  }
}
