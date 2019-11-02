import { LoadingController, AlertController, Platform, ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

import { DataService } from '../services/data.service';

export enum EMod {
  Pridat,
  Upravit
}

export class BasePage {
  loading = false;
  loadingEl: HTMLIonLoadingElement;

  formular: FormGroup;
  mod: EMod;

  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService
  ) {}

  navigateToCVrCek() {
    window.location.href = 'https://cvcmoldava.edu.sk';
  }

  /* Mod */

  get modPridat(): boolean {
    return this.mod === EMod.Pridat;
  }

  get modUpravit(): boolean {
    return this.mod === EMod.Upravit;
  }

  /* Status */

  // get ok(): boolean {
  //   return this.dataService.ok;
  // }

  // get error(): boolean {
  //   return !this.dataService.ok && !this.dataService.loading;
  // }

  // get loading(): boolean {
  //   return this.dataService.loading;
  // }

  // get failed(): boolean {
  //   return this.dataService.failed;
  // }

  /* Platform */

  get isPlatformDesktop(): boolean {
    return this.platform.is('desktop');
  }

  get isPlatformCordova(): boolean {
    return this.platform.is('cordova');
  }

  /* Loader */

  async showLoading() {
    this.loadingEl = await this.loadingCtrl.create({
      message: 'Načítavam...'
    });
    await this.loadingEl.present();
  }

  async hideLoading() {
    await this.loadingEl.dismiss();
    this.loadingEl = null;
  }

  /* Alert */

  async showAlert(header: string, text: string) {
    // hide loader
    if (this.loadingEl) {
      await this.loadingEl.dismiss();
    }

    const alert = await this.alertCtrl.create({
      header,
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }

  /* Confirm */

  async showConfirm(header: string, text: string, yesHandler: () => void, noHandler?: () => void) {
    const confirm = await this.alertCtrl.create({
      header,
      message: text,
      buttons: [
        {
          text: 'Nie',
          handler: () => {
            if (noHandler) {
              noHandler();
            }
          }
        },
        {
          text: 'Áno',
          handler: () => {
            yesHandler();
          }
        }
      ]
    });
    await confirm.present();
  }

  /* Toast */

  async showToast(message: string, color?: string, duration?: number) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color ? color : 'dark',
      showCloseButton: true,
      closeButtonText: 'Zavrieť',
      duration: duration ? duration : 10000
    });
    await toast.present();
  }

  /* Errors */

  showErrorAlert(error: any, header?: string, message?: string) {
    if (header === undefined) {
      header = 'Chyba';
    }
    if (error != null && error._body != null) {
      const body = JSON.parse(error._body);
      if (body.code != null) {
        this.showAlert('???', '???');
      } else {
        this.showAlert(header, message === undefined ? error : message);
      }
    } else {
      this.showAlert(header, message === undefined ? error : message);
    }
  }

  /*handleError(error?: any, message?: string) {
    if (error === undefined) {
      error = this.dataService.getError(false);
    } else if (error != null) {
      this.dataService.setError(error, message);
    }
    if (error != null) {
      // hide loader
      if (this.loading != null) {
        this.loading.dismiss();
      }
      if (this.dataService.isForceUpdateError(error)) {
        // TODO: redirect to the init page
      } else if (this.dataService.isMaintenanceError(error)) {
        // TODO: redirect to the init page
      } else if (this.dataService.isUnauthorizedError(error)) {
        // TODO: redirect to the login page where it will be shown
      } else {
        // clear the last error and show alert
        this.dataService.setError(null);
        this.showErrorAlert(error);
      }
    }
  }*/
}
