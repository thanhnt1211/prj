import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertFlashComponent } from './alert-flash.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertFlashComponent],
    exports: [AlertFlashComponent]
})
export class AlertFlashModule { }
