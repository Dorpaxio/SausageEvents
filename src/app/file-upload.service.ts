import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

import { BACKEND_URL } from '../assets/config';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public http: HttpClient) { }

  postFile(endPoint: string, fileToUpload: File): Observable<boolean | any> {
    const uri = BACKEND_URL + endPoint;

    const formData: FormData = new FormData();
    formData.append('fichier', fileToUpload, fileToUpload.name);

    return this.http.post(uri, formData).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return of(false);
      })
    );
  }
}
