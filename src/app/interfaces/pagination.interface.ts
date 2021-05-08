import { Observable } from 'rxjs';
import {Validators} from '@angular/forms';

export interface PaginateOption {
  orderBy?: string;
  sort?: string;
  page?: number;
  pageSize: number;
}
