import { Card } from '../models/card.model';
import { map } from 'rxjs/operators';
import { PaginateOption } from './../interfaces/pagination.interface';
import { Repository } from './repository';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CardRepository extends Repository {
    paginate(option: PaginateOption): any {
        return this.httpClient.get('/card/list', option).pipe(
            map((response: any) => {
                const cards = [];
                const res = response.result;
                if (res.data) {
                    for (const item of res.data) {
                        cards.push(this.parseResponse(item));
                    }
                }
                return {
                    data: cards,
                    page: res.current_page || 0,
                    total: res.total
                };
            }),
        );
    }
    createCard(data) {
        return this.httpClient.post('/card/create', data);
    }
    updateCard(data) {
        return this.httpClient.put('/card/edit', data);
    }
    deleteCard(id: Number) {
        return this.httpClient.delete(`/card/delete/${id}`);
    }
    getInfo(id: Number): Observable<Card> {
        return this.httpClient.get(`/card/detail/${id}`).pipe(
            map((res: any) => {
                const card = new Card;
                card.fill(res.result);
                return card;
            })
        );
    }
    parseResponse(data: any): Card {
        let card: Card;
        card = new Card();
        card.fill(data);
        return card;
    }
}
