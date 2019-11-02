import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'prihlasenie', loadChildren: './auth/prihlasenie/prihlasenie.module#PrihlaseniePageModule' },
  { path: 'kruzok', loadChildren: './kruzky/kruzok/kruzok.module#KruzokPageModule' },
  { path: 'ucastnik', loadChildren: './ucastnici/ucastnik/ucastnik.module#UcastnikPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
