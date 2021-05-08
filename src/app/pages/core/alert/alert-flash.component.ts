import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs';

import {AlertFlashModel, AlertFlashType} from './../../../models/alert-flash.model';
import {AlertFlashService} from './../../../services/alert-flash.service';


@Component({
    selector: 'app-alert-flash',
    templateUrl: './alert-flash.component.html',
    styleUrls: ['./alert-flash.component.css']
})

export class AlertFlashComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: AlertFlashModel[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertFlashService) {
    }

    ngOnInit() {
        // subscribe to new alert notifications
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // add alert to array
                this.alerts = [];
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: AlertFlashModel) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) {
            return;
        }

        if (this.fade) {
            // fade out alert
            this.alerts.find(x => x === alert).fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClass(alert: AlertFlashModel) {
        if (!alert) {
            return;
        }

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertFlashType.Success]: 'alert alert-success',
            [AlertFlashType.Error]: 'alert alert-danger',
            [AlertFlashType.Info]: 'alert alert-info',
            [AlertFlashType.Warning]: 'alert alert-warning'
        };

        classes.push(alertTypeClass[alert.type]);
        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}
