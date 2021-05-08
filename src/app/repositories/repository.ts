import { AppHttpClient } from '../services/app-http-client.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Repository {
  protected baseUrl: string = 'assets/data';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    protected httpClient: AppHttpClient,
    protected http: HttpClient,
  ) {}
}
