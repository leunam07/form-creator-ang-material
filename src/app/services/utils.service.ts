import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  toSnakeCase(value: string) {
    return this.removeCharacteresAndTildes(
      value?.toLowerCase().replace(/\s+/g, '_')
    );
  }

  removeCharacteresAndTildes(value: string) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');
  }
}
