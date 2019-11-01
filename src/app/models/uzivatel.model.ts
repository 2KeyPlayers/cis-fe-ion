export class IUzivatel {
  id: number;
  prezyvka: string;
  titul?: string;
  meno: string;
  priezvisko: string;
  email?: string;
  veduci: boolean;

  token?: string;
}

export class Uzivatel {
  id: number;
  prezyvka: string;
  titul?: string;
  meno: string;
  priezvisko: string;
  email?: string;
  veduci: boolean;

  token?: string;

  constructor(uzivatel: IUzivatel) {
    this.id = uzivatel.id;
    this.prezyvka = uzivatel.prezyvka;
    this.titul = uzivatel.titul;
    this.meno = uzivatel.meno;
    this.priezvisko = uzivatel.priezvisko;
    this.email = uzivatel.email;
    this.veduci = uzivatel.veduci;

    this.token = uzivatel.token;
  }

  get celeMeno(): string {
    return `${this.meno} ${this.priezvisko}`;
  }

  get celeMenoPlusTitul(): string {
    return `${this.titul ? this.titul : ''} ${this.meno} ${this.priezvisko}`;
  }
}
