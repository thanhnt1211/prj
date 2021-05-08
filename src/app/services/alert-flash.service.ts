import { isArray } from 'util';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AlertFlashModel, AlertFlashType } from '../models/alert-flash.model';

@Injectable({ providedIn: 'root' })
export class AlertFlashService {
  private subject = new Subject<AlertFlashModel>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<AlertFlashModel> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: any, options?: any) {
    this.alert(new AlertFlashModel({ ...options, type: AlertFlashType.Success, message }));
  }

  error(arrayErrors: any, options?: any) {
    let message = [];
    console.log(arrayErrors);
    if (arrayErrors.error.code !== 200) {
      const errors = arrayErrors.error.message;
      if (errors !== null && errors !== undefined) {
        Object.keys(errors).forEach((key) => {
          message.push(errors[key]);
        });
      }
      if (message.length === 0) {
        message.push('message.unknow_error');
      }
    } else {
      message.push(arrayErrors.error.header.message);
    }
    if (arrayErrors.isArray) {
      this.alert(new AlertFlashModel({ ...options, type: AlertFlashType.Error, message: arrayErrors }));
    } else {
      this.alert(new AlertFlashModel({ ...options, type: AlertFlashType.Error, message }));
    }


  }

  info(message: [string], options?: any) {
    this.alert(new AlertFlashModel({ ...options, type: AlertFlashType.Info, message }));
  }

  warn(message: [string], options?: any) {
    this.alert(new AlertFlashModel({ ...options, type: AlertFlashType.Warning, message }));
  }

  // main alert method
  alert(alert: AlertFlashModel) {
    setTimeout(() => {
      alert.id = alert.id || this.defaultId;
      this.subject.next(alert);
      window.scrollTo(0, 0);
    }, 100);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new AlertFlashModel({ id }));
  }
}
