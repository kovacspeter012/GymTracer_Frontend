import { Routes } from '@angular/router';
import { Mainlayout } from './layout/mainlayout/mainlayout';

export const routes: Routes = [
    {
        path: '',
        component: Mainlayout,
        children: [
            
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
