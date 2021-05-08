import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ERROR_REQUIRED, ERROR_EMAIL, ERROR_MIN_LENGTH, ERROR_MAX_LENGTH, ERROR_PASS_NOT_MATCH, ERROR_PATTERN } from './../../../utils/const';

@Component({
    selector: 'app-validation-error',
    templateUrl: './validation-error.component.html',
    styleUrls: ['./validation-error.component.css'],
})
export class ValidationErrorComponent implements OnInit {
    @Input() control: FormControl;
    @Input() submitted: boolean;
    @Input() field: string;

    constructor() {
    }

    ngOnInit() {
    }

    getMessage() {
        let message = '';
        if (this.control.errors && this.submitted) {
            if (this.control.errors.required) {
                message = `${this.field} ${ERROR_REQUIRED}`;
            }
            if (this.control.errors.email) {
                message = ERROR_EMAIL;
            }
            if (this.control.errors.minLength) {
                message =  `${this.field} ${ERROR_MIN_LENGTH} ${this.control.errors.minLength.requiredLength}`;
            }
            if (this.control.errors.maxlength) {
                message =  `${this.field} ${ERROR_MAX_LENGTH} ${this.control.errors.maxlength.requiredLength}`;
            }
            if (this.control.errors.pattern) {
                message =  `${this.field} ${ERROR_PATTERN}`;
            }
            if (this.control.errors.notSame) {
                message =  `${this.field} ${ERROR_PASS_NOT_MATCH}`;
            }
        }
        return message;
    }
}
