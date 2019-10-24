import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  postFile(endPoint: string, fileToUpload: File): Observable<boolean | any> {
    const uri = "https://charlesdesgenetez.fr:3001/" + endPoint;

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
