import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'account-recovery',
    loadComponent: () =>
      import('./pages/account-recovery/account-recovery.page').then(
        (m) => m.AccountRecoveryPage
      )
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'garage',
    loadComponent: () => import('./pages/garage/garage.module').then( m => m.GaragePageModule)
  },
  {
    path: 'modifications',
    loadComponent: () => import('./pages/modifications/modifications.page').then( m => m.ModificationsPage)
  },
  {
    path: 'track-finder',
    loadComponent: () => import('./pages/track-finder/track-finder.page').then( m => m.TrackFinderPage)
  },
  {
    path: 'track-mode',
    loadComponent: () => import('./pages/track-mode/track-mode.page').then( m => m.TrackModePage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
