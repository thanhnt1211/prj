// import { DialogService } from './dialog.service';
import { LocalStorageService } from './storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AlertFlashService } from './alert-flash.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  constructor(
      public router: Router,
      public localStorage: LocalStorageService,
      public location: Location,
      public alertFlashService: AlertFlashService
  ) {}
}
