import { EPohlavie } from './ucastnik.model';
import { Objekt } from './objekt.model';

export class Veduci {
  constructor(public id: number, public meno: string, public priezvisko: string, public titul?: string) {}

  get celeMeno(): string {
    return `${this.meno} ${this.priezvisko}`;
  }
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

  // udaje veduceho
  idveduceho: number;
  menoveduceho: string;
  priezviskoveduceho: string;
  titulveduceho: string;

  // ucastnici
  ucastnici: Array<{
    id: number;
    pohlavie: EPohlavie;
    meno: string;
    priezvisko: string;
    poplatok: number;
    stav: string;
  }>;
  pocetucastnikov: number;

  // uprava
  vytvoreny?: string;
  upraveny?: string;
  uzivatel?: number;
}

export class Kruzok extends Objekt {
  nazov: string;
  veduci: number | Veduci;
  zadarmo: boolean;
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
    super(kruzok.id, kruzok.vytvoreny, kruzok.upraveny, kruzok.uzivatel);

    this.nazov = kruzok.nazov;
    this.veduci = kruzok.veduci;
    if (kruzok.idveduceho) {
      this.veduci = new Veduci(kruzok.idveduceho, kruzok.menoveduceho, kruzok.priezviskoveduceho, kruzok.titulveduceho);
    }
    this.zadarmo = kruzok.zadarmo;

    this.pocetUcastnikov = kruzok.pocetucastnikov;
    if (kruzok.ucastnici) {
      this.ucastnici = kruzok.ucastnici;
      this.pocetUcastnikov = kruzok.ucastnici.length;
    }
  }

  get celeMenoVeduceho(): string {
    if (this.veduci instanceof Veduci) {
      return this.veduci.celeMeno;
    }
    return null;
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
