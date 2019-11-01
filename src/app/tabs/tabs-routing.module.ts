import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CvrcekComponent } from '../shared/cvrcek.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivateChild: [AuthGuard],
    component: TabsPage,
    children: [
      {
        path: 'ucastnici',
        children: [
          {
            path: '',
            loadChildren: () => import('../ucastnici/ucastnici.module').then(m => m.UcastniciPageModule)
          }
        ]
      },
      {
        path: 'kruzky',
        children: [
          {
            path: '',
            loadChildren: () => import('../kruzky/kruzky.module').then(m => m.KruzkyPageModule)
          }
        ]
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/ucastnici',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ucastnici',
    pathMatch: 'full'
  },
  {
    path: 'prihlasenie',
    children: [
      {
        path: '',
        loadChildren: () => import('../auth/prihlasenie/prihlasenie.module').then(m => m.PrihlaseniePageModule)
      }
    ]
  },
  {
    path: 'cvrcek',
    component: CvrcekComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
