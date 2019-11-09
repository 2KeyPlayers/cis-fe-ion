import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage } from 'src/app/shared/base.page';
import { DataService } from 'src/app/services/data.service';
import { Ucastnik } from 'src/app/models/ucastnik.model';
import { Kruzok } from 'src/app/models/kruzok.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-ucastnik',
  templateUrl: './ucastnik.page.html',
  styleUrls: ['./ucastnik.page.scss']
})
export class UcastnikPage extends BasePage implements OnInit {
  mod: 'normal' | 'tlac' = 'normal';

  ucastnik: Ucastnik;
  kruzky: Kruzok[];
  dostupneKruzky: Kruzok[];

  maxDatum = new Date().toISOString();

  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  ngOnInit() {
    this.loading = true;

    this.formular = new FormGroup({
      id: new FormControl(null),
      cisloRozhodnutia: new FormControl(null, Validators.required),
      pohlavie: new FormControl(null, Validators.required),
      meno: new FormControl(null, Validators.required),
      priezvisko: new FormControl(null, Validators.required),
      datumNarodenia: new FormControl(null, Validators.required),
      adresa: new FormGroup({
        ulica: new FormControl(null),
        cislo: new FormControl(null, Validators.required),
        mesto: new FormControl(null, Validators.required),
        psc: new FormControl(null)
      }),
      kruzky: new FormControl([]),
      uzivatel: new FormControl(this.authService.uzivatel.id)
    });

    this.dataService.getKruzky().subscribe(dostupneKruzky => (this.dostupneKruzky = dostupneKruzky));

    this.route.params.subscribe((params: Params) => {
      const id = +params.id;

      if (id) {
        this.dataService.getUcastnik(id).subscribe((ucastnik: Ucastnik) => {
          this.ucastnik = ucastnik;
          this.kruzky = ucastnik.kruzky;
          this.formular.patchValue({
            id: ucastnik.id,
            cisloRozhodnutia: ucastnik.cisloRozhodnutia,
            pohlavie: ucastnik.pohlavie,
            meno: ucastnik.meno,
            priezvisko: ucastnik.priezvisko,
            datumNarodenia: ucastnik.datumNarodenia,
            adresa: {
              ulica: ucastnik.adresa.ulica,
              cislo: ucastnik.adresa.cislo,
              mesto: ucastnik.adresa.mesto,
              psc: ucastnik.adresa.psc
            },
            kruzky: ucastnik.kruzky ? ucastnik.kruzky.map(k => k.id) : []
          });
          this.loading = false;
        });
      } else {
        this.dataService.getNasledujuceCisloRozhodnutia().subscribe((cislo: number) => {
          this.formular.patchValue({
            cisloRozhodnutia: cislo
          });
          this.loading = false;
        });
      }
    });
  }

  zmenMod() {
    this.mod = this.mod === 'tlac' ? 'normal' : 'tlac';
  }

  get ziadneData(): boolean {
    if (this.ucastnik) {
      // return this.ucastnik.pocetKruzkov === 0;
      return false;
    }
    return true;
  }

  nastavKruzky() {
    if (this.formular.value.kruzky && this.formular.value.kruzky.length > 0) {
      this.kruzky = this.formular.value.kruzky.map((id: number) => this.dostupneKruzky.find(dk => dk.id === id));
      this.kruzky.sort((k1: Kruzok, k2: Kruzok) => k1.nazov.localeCompare(k2.nazov));
    } else {
      this.kruzky = [];
    }
  }

  ulozit() {
    if (this.formular.invalid) {
      return;
    }

    const value = this.formular.value;
    // adapt datumNarodenia
    if (value.datumNarodenia) {
      value.datumNarodenia = value.datumNarodenia.substring(0, 10);
    }
    console.log('hodnoty formulara', value);

    this.dataService.skontrolujUcastnika(value.id, value.cisloRozhodnutia, value.meno, value.priezvisko).subscribe(
      (vysledok: { cisloExistuje: boolean; menoExistuje: boolean }) => {
        if (vysledok.cisloExistuje) {
          this.showToast('Zadané číslo rozhodnutia už existuje!');
          return;
        }
        if (vysledok.menoExistuje) {
          this.showToast('Zadané meno a priezvisko už existuje!');
          return;
        }

        if (this.modPridat) {
          this.dataService.insertUcastnik(value).subscribe(
            () => {
              this.showToast('Účastník úspešne pridaný.', 'success');
              this.formular.reset();
            },
            error => {
              this.showErrorToast(error, 'Chyba pri pridávaní účastníka!');
            }
          );
        } else {
          this.dataService.updateUcastnik(value).subscribe(
            () => {
              this.showToast('Účastník úspešne upravený.', 'success');
            },
            error => {
              this.showErrorToast(error, 'Chyba pri úprave účastníka!');
            }
          );
        }
      },
      error => {
        this.showErrorToast(error, 'Chyba pri kontrole účastníka!');
      }
    );
  }
}
