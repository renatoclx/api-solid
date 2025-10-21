export class CheckInValidateHourError extends Error {
  constructor() {
    super('Não pode fazer checkIns após 20 minutos');
  }
}
