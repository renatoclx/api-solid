import { hash } from 'bcryptjs';
import type { UsersRepository } from 'src/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import type { RegisterServiceRequestDTO } from './dto/RegisterServiceRequestDTO';
import type { RegisterServiceResponseDTO } from './dto/RegisterServiceRequestDTO';

// D - Dependency Inversion Principle
// Ao invés da minha classe instanciar as dependências que ela precisa, ela vai
// receber as dependências como parâmetro
export class RegisterService {
  // Colocar o modificador de acesso direto no parâmetro elimina a necessidade de
  // declarar o atributo
  constructor(private usersRepository: UsersRepository) {}

  // Como é uma função assíncrona e retorna um user, ela foi tipada com o DTO que
  // define um usuário no DTO(response)
  async execute({ name, email, password }: RegisterServiceRequestDTO): Promise<RegisterServiceResponseDTO> {
    // Aqui. passo a string da senha e faço 6 salts, onde ele criptografa senha
    // a depender da quantidade de salts. O ideal para web é 6 saults
    const password_hash = await hash(password, 6);

    // Faço referência a instância da classe  do constructor, pois o usersRepository
    // não é uma variável local de função, é um atributo de classe

    // LEMBRAR de usar await quando a function for uma Promise
    const sameEmail = await this.usersRepository.findByEmail(email);

    if (sameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({ name, email, password_hash });

    return { user };
  }
}
