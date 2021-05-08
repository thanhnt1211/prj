import {Repository} from './repository';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminRepository extends Repository {
    login(authInfo: any) {
        return this.httpClient.post('/admin/login', authInfo);
    }

    signup(user: any) {
        return this.httpClient.post('/admin/signup', user);
    }

    me() {
        return this.httpClient.get('/schooladmin/detail', {});
    }

    updateProfile(params: any) {
        return this.httpClient.post('/schooladmin/update', params);
    }

    changePassword(params: any) {
        return this.httpClient.post('/schooladmin/settings/changepassword', params);
    }
}
