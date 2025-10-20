// Classe que herda a classe error para um novo handle
export class UserAlreadyExistsError extends Error {
  constructor() {
    // Chamo o construtor da classe Error
    super('E-mail já existe');
  }
}
