import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  translations = {
    SECOND: 'Segundos',
    MINUTE: 'Minutos',
    DAYS: 'Dias',
    HOURS: 'Horas',
    YEARLY: 'Anos',
    DAILY: 'Dias',
    MONTHLY: 'Meses',
  };

  transform(value: string, ...args: unknown[]): string {
    //@ts-ignore
    return this.translations[value];
  }
}
