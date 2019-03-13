import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { ApiProvider } from '../shared/services/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';


    constructor(
        private translate: TranslateService,
        public router: Router,
        public api: ApiProvider,
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() { }

    onLoggedin() {
        let data = {
            username: this.username,
            password: this.password
        }
        this.api.loginPost(data).then((result: any) => {
            console.log(result);
            if (result.ResponseCode == "Success") {
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('token',result.token);
                this.router.navigate(['/dashboard']);
            }else{

            }

        });
    }
}
