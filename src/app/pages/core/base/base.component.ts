import {ComponentService} from './../../../services/component.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {

    constructor(protected service: ComponentService) {
    }

    protected get router() {
        return this.service.router;
    }

    public get activatedRoute(): ActivatedRoute {
        let route = this.router.routerState.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

    protected get queryParams() {
        return this.activatedRoute.queryParams;
    }

    protected get routeParams(): Params {
        return this.activatedRoute.snapshot.params;
    }

    optionsAlert = {
        autoClose: true,
        keepAfterRouteChange: true
    };

    ngOnInit(): void {

    }

    public handleError(error) {
        const arrayErrors = [];
        if (error.error) {
            const errors = error.error.errors;
            this.optionsAlert.autoClose = false;
            if (errors !== null && errors !== undefined) {
                Object.keys(errors).forEach((key) => {
                    for (let i = 0; i < errors[key].length; i++) {
                        arrayErrors.push(errors[key][i].toString());
                    }
                });
            }
        }
        // if (arrayErrors.length === 0) {
        //     this.service.alertFlashService.error(['message.unknow_error'], this.optionsAlert);
        // } else {
        //     this.service.alertFlashService.error(arrayErrors, this.optionsAlert);
        // }
    }

    public trans(message: string, data?: any): string {
        return '';
        /* this.translate.get([message], data).subscribe((text: string) => {
             console.log(text,"121212");
         });
         if (data) {
             return this.translate.instant(message, data);
         }
         console.log(this.translate.instant(message) ,"44444")
         return this.translate.instant(message);
         return '';*/
    }

    protected redirect(path: any, queryParams?: any, replaceUrl = false) {
        const commands = path instanceof Array ? path : [path];
        this.router.navigate(commands, {queryParams, replaceUrl});
    }

}
