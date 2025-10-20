// Classe que herda a classe error para um novo handle
export class MaxDistanceError extends Error {
  constructor() {
    // Chamo o construtor da classe Error
    super('Distância entre academias muito grande.');
  }
}
