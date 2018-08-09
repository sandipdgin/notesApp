import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Note } from './note';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, pipe, of } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //, 'Authorization' : 'auth-token'
    })
  }

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _getUrl = "/api/notes";
  private _postUrl = "/api/note";
  private _putUrl = "/api/note/";
  private _deleteUrl = "/api/note/";
  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this._getUrl)
    .pipe(
      catchError(this.errorHandler('getNotes', []))
      //catchError(this.errorHandler()
    );
    //.catch(this.errorHandler);
    /*.map((response: Response) => response.json());*/
  }

  /*private errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }*/

  private errorHandler<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  private log(message: string) {
    //this.messageService.add(message);
    console.log("log message " + message);
  }
  

  addNotes(note: Note): Observable<Note>{
    return this.http.post<Note>(this._postUrl, note, httpOptions)
    .pipe(catchError(this.errorHandler('addNotes', note)));
  }

  updateNotes(note: Note): Observable<Note>{
    return this.http.put<Note>(this._postUrl +"/"+ note._id, note, httpOptions)
    .pipe(catchError(this.errorHandler('updateNotes', note)));
  }

  deleteNotes(note: Note): Observable<Note>{
    return this.http.delete<Note>(this._deleteUrl + note._id)
    .pipe(catchError(this.errorHandler('deleteNotes', note)));
  }

}
