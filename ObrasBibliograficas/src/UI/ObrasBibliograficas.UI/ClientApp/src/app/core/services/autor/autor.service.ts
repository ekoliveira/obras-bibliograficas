import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AutorViewModel } from '../../models/autor-view-model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json'
		})
	}

  constructor(
    private httpClient: HttpClient, 
  ) { }

  getAutores(){
    return this.httpClient.get(environment.serverUrl + 'Autor');
  }

  postAutor(autor : AutorViewModel){
    return this.httpClient.post(environment.serverUrl + 'Autor', autor, this.httpOptions);
  }

  putAutor(autor:AutorViewModel){
    return this.httpClient.put(environment.serverUrl + 'Autor', autor, this.httpOptions);
  }

  deleteAutor(id:number){
    return this.httpClient.delete(environment.serverUrl + 'Autor/' + id);
  }
  
}
