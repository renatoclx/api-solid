export class GymAlreadyExistsError extends Error {
  constructor() {
    super('Academia já existe');
  }
}
