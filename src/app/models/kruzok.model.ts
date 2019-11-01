export interface Veduci {
  meno: string;
  priezvisko: string;
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
  veduci: Veduci;
  zadarmo: boolean;
  vytvoreny: string;
  upraveny: string;
  uzivatel: number;
  menoveduceho: string;
  priezviskoveduceho: string;
  pocetucastnikov: number;
}

export class Kruzok {
  id: number;
  nazov: string;
  veduci: Veduci;
  zadarmo: boolean;
  vytvoreny: string;
  upraveny: string;
  uzivatel: number;
  pocetUcastnikov: number;

  platby: Platba[];

  constructor(kruzok: IKruzok) {
    this.id = kruzok.id;
    this.nazov = kruzok.nazov;
    this.veduci = {
      meno: kruzok.menoveduceho,
      priezvisko: kruzok.priezviskoveduceho
    };
    this.zadarmo = kruzok.zadarmo;
    this.vytvoreny = kruzok.vytvoreny;
    this.upraveny = kruzok.upraveny;
    this.uzivatel = kruzok.uzivatel;
    this.pocetUcastnikov = kruzok.pocetucastnikov;
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
