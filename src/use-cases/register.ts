import { UserRepository } from '@/repositories/UserRepository';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export class Register {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterRequest): Promise<RegisterResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return { user };
  }
}
