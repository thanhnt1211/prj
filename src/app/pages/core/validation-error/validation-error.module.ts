import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ValidationErrorComponent],
    exports: [ValidationErrorComponent]
})
export class ValidationErrorModule { }
