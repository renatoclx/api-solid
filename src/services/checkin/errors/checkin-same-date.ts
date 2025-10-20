export class CheckInOnSameDateError extends Error {
  constructor() {
    super('Não pode fazer 02 checkIns no mesmo dia');
  }
}
