export class ResourceNotFoundError extends Error {
  constructor() {
    // Chamo o construtor da classe Error
    super('Recurso não encontrado');
  }
}
