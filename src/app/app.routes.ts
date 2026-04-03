import { Routes } from '@angular/router';
import { Mainlayout } from './layout/mainlayout/mainlayout';
import { MainPage } from './mainpage/main-page/main-page';
import { Login } from './login/login/login';
import { Registration } from './registration/registration/registration';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
    {
        path: '',
        component: Mainlayout,
        children: [
            {path: '', component: MainPage},
            {path: 'login', component: Login, canActivate: [guestGuard]},
            {path: 'registration', component: Registration, canActivate: [guestGuard]}
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
