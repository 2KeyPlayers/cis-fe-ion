export class Utils {
  static stringToDate(s: string): Date {
    if (!s) {
      return null;
    }
    const date: string[] = s.split('.');
    const day = date[0].padStart(2, '0');
    const month = date[1].padStart(2, '0');
    const year = date[2];
    return new Date(`${year}-${month}-${day}T00:00:00`);
  }
}
