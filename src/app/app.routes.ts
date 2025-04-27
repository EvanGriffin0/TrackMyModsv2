import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'splash',
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
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'garage',
    loadComponent: () => import('./pages/garage/garage.page').then( m => m.GaragePage)
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
    path: 'view-garage',
    loadComponent: () => import('./pages/view-garage/view-garage.page').then( m => m.ViewGaragePage)
  },
];