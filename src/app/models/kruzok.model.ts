import { EPohlavie } from './ucastnik.model';

export class Veduci {
  constructor(public id: number, public meno: string, public priezvisko: string, public titul?: string) {}
}

export interface Platba {
  suma: number;
  datum: string;
  uzivatel: number; // ID Uzivatela
}

export interface Poplatky {
  ucastnik: number;
  kruzok: number;
  poplatok: number;
  stav: string; // '---------',
  platby: Platba[];
}

export interface IKruzok {
  id: number;
  nazov: string;
  veduci: number | Veduci;
  zadarmo: boolean;
  vytvoreny: string;
  upraveny: string;
  uzivatel: number;
  idveduceho: number;
  menoveduceho: string;
  priezviskoveduceho: string;
  titulveduceho: string;
  ucastnici: Array<{
    id: number;
    pohlavie: EPohlavie;
    meno: string;
    priezvisko: string;
    poplatok: number;
    stav: string;
  }>;
  pocetucastnikov: number;
}

export class Kruzok {
  id: number;
  nazov: string;
  veduci: number | Veduci;
  zadarmo: boolean;
  vytvoreny: string;
  upraveny: string;
  uzivatel: number;
  ucastnici: Array<{
    id: number;
    pohlavie: EPohlavie;
    meno: string;
    priezvisko: string;
    poplatok: number;
    stav: string;
  }>;
  pocetUcastnikov: number;

  platby: Platba[];

  constructor(kruzok: IKruzok) {
    this.id = kruzok.id;
    this.nazov = kruzok.nazov;
    if (kruzok.veduci instanceof Veduci) {
      this.veduci = new Veduci(kruzok.idveduceho, kruzok.menoveduceho, kruzok.priezviskoveduceho, kruzok.titulveduceho);
    } else {
      this.veduci = kruzok.veduci;
    }
    this.zadarmo = kruzok.zadarmo;
    this.vytvoreny = kruzok.vytvoreny;
    this.upraveny = kruzok.upraveny;
    this.uzivatel = kruzok.uzivatel;
    this.pocetUcastnikov = kruzok.pocetucastnikov;
    if (kruzok.ucastnici) {
      this.ucastnici = kruzok.ucastnici;
      this.pocetUcastnikov = kruzok.ucastnici.length;
    }
  }

  // zmenVyskuPoplatu() {
  //   this.vyskaPoplatku = (this.vyskaPoplatku + 3) % 12;
  //   if (this.vyskaPoplatku === 0) {
  //     this.vyskaPoplatku = 3;
  //   }
  // }

  // skontrolujPoplatok(index: number): boolean {
  //   if (index >= 0 && index < Kruzok.BITY.length) {
  //     return (this.poplatky & Kruzok.BITY[index]) === Kruzok.BITY[index];
  //   }
  //   console.log('false');
  //   return false;
  // }

  // zmenPoplatok(index: number) {
  //   if (index >= 0 && index < Kruzok.BITY.length) {
  //     this.poplatky = this.poplatky ^ Kruzok.BITY[index];
  //   }
  // }

  // farbaPoplatku(index: number): string {
  //   return this.skontrolujPoplatok(index) ? 'green' : 'basic';
  // }
}
