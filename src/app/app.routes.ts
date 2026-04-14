import { Routes } from '@angular/router';
import { Mainlayout } from './layout/mainlayout/mainlayout';
import { MainPage } from './mainpage/main-page/main-page';
import { Login } from './login/login/login';
import { Registration } from './registration/registration/registration';
import { guestGuard } from './guards/guest-guard';
import { Trainings } from './trainings/trainings/trainings';
import { authGuard } from './guards/auth-guard';
import { TrainingDetails } from './trainingdetails/training-details/training-details';
import { MyTrainingsPage } from './my-trainings/my-trainings/my-trainings';
import { trainerGuard } from './guards/trainer-guard';
import { userModeGuard } from './guards/user-mode-guard';
import { ProfilePage } from './profilepage/profile-page/profile-page';
import { TicketsPage } from './ticketspage/tickets-page/tickets-page';
import { StatisticsPage } from './statisticspage/statistics-page/statistics-page';
import { IncomePage } from './incomepage/income-page/income-page';
import { CardusagePage } from './cardusagepage/cardusage-page/cardusage-page';

export const routes: Routes = [
    {
        path: '',
        component: Mainlayout,
        children: [
            {path: '', component: MainPage},
            {path: 'login', component: Login, canActivate: [guestGuard]},
            {path: 'registration', component: Registration, canActivate: [guestGuard]},
            {path: 'trainings', component: Trainings, canActivate: [authGuard, userModeGuard]},
            {path: 'trainings/:id', component: TrainingDetails, canActivate: [authGuard, userModeGuard]},
            {path: 'my-trainings', component: MyTrainingsPage, canActivate: [authGuard, trainerGuard, userModeGuard]},
            {path: 'profile', component: ProfilePage, canActivate: [authGuard]},
            {path: 'tickets', component: TicketsPage, canActivate: [authGuard]},
            {path: 'statistics', component: StatisticsPage, canActivate: [authGuard]},
            {path: 'income', component: IncomePage, canActivate: [authGuard]},
            {path: 'card-usage', component: CardusagePage, canActivate: [authGuard]}
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
