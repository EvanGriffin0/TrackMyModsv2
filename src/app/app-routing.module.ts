import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule) },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'account-recovery', loadChildren: () => import('./pages/account-recovery/account-recovery.module').then(m => m.AccountRecoveryPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
  { path: 'garage', loadChildren: () => import('./pages/garage/garage.module').then(m => m.GaragePageModule) },
  { path: 'modifications', loadChildren: () => import('./pages/modifications/modifications.module').then(m => m.ModificationsPageModule) },
  { path: 'track-finder', loadChildren: () => import('./pages/track-finder/track-finder.module').then(m => m.TrackFinderPageModule) },
  { path: 'track-mode', loadChildren: () => import('./pages/track-mode/track-mode.module').then(m => m.TrackModePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
