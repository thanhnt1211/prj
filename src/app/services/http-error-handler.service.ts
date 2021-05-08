import { HttpException } from './../interfaces/exception.interface';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from './storage.service';

export class UnauthenticatedException implements HttpException {
    code = '401';
    message = 'Unauthenticated';
}

@Injectable()
export class HttpErrorHandler {

    /**
     * HttpErrorHandler Constructor.
     */
    constructor(
        private router: Router,
        private storageService: LocalStorageService,
    ) { }

    /**
     * Handle http request error.
     */
    public handle(response: HttpErrorResponse) {
        const body = this.parseJson(response.error);

        if (response.status === 401) {
            this.storageService.unset('access_token');
            // this.storageService.unset('');
            this.router.navigate(['/login']);
        }

        if (response.status === 403) {
            const message = 'No permission';
        }

        if (response.status === 404) {
            const message = 'Api 404';
        }

        if (body) {
            const message = body.message || "unknow error";
        }

        return throwError(response);
    }

    /**
     * Parse JSON without throwing errors.
     */
    private parseJson(json: string): { message?: string } {
        if (typeof json !== 'string') {
            return json;
        }

        try {
            return JSON.parse(json);
        } catch (e) {
            return {};
        }
    }
}
