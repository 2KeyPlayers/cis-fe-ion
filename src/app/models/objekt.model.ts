export abstract class Objekt {
  potvrditVymazanie = false;

  constructor(public id: number, public vytvoreny?: string, public upraveny?: string, public uzivatel?: number) {}

  vymazat() {
    this.potvrditVymazanie = true;
  }

  zrusit() {
    this.potvrditVymazanie = false;
  }
}
