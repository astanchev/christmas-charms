import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICharm } from '../interfaces/charm';
import { IIPText } from '../interfaces/ip';
import { IpService } from './ip.service';

@Injectable()
export class CharmsService {

  constructor(private http: HttpClient, private ipService: IpService) {}

  getCharm(countCharms: number, ip: string): Observable<IIPText> {
    const offset = this.getRandomInt(countCharms);
    const pagingQuery = `?pageSize=1&offset=${offset}`;
    const searchUrl = `&where=${escape(`deleted = false`)}`;
    const urlGet = environment.backendless.endpoints.charm + pagingQuery + searchUrl;

    return this.http.get<ICharm>(urlGet).pipe(
      concatMap(data => {
        const urlPut = environment.backendless.endpoints.charm + `/${data[0].objectId}`;
        return this.http.put<ICharm>(urlPut, JSON.stringify({ deleted: true }));
      }),
      concatMap(data => {
        return this.ipService.addCharm(ip, data.text);
      })
    );
  }

  getCharmsCount(): Observable<number> {
    const countQuery = `&property=Count(text)`;
    const searchUrlCount = `?where=${escape(`deleted = false`)}`;
    const searchUrlUpdate = `?where=${escape(`deleted = true`)}`;
    const urlCount = environment.backendless.endpoints.charm + searchUrlCount + countQuery;
    const urlUpdate = environment.backendless.endpoints.bulkUpdateCharms + searchUrlUpdate;

    return this.http.get<number>(urlCount).pipe(
      switchMap(data => {
        if (data[0].count > 0) {
          return of(data[0].count as number);
        } else {
          return this.http.put<number>(urlUpdate, JSON.stringify({ deleted: false }));
        }
      })
    );
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
