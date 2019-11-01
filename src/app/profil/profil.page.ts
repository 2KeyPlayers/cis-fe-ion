import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Uzivatel } from '../models/uzivatel.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage implements OnInit, OnDestroy {
  uzivatel: Uzivatel;
  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.uzivatel = this.authService.uzivatel;
    // this.subscription = this.authService.uzivatelSubscription().subscribe(uzivatel => (this.uzivatel = uzivatel));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  odhlasit() {
    this.authService.odhlasit();
    this.router.navigateByUrl('/prihlasenie');
  }
}
