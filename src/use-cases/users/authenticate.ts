import { UserRepository } from '@/repositories/UserRepository';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  user: User;
}

export class Authenticate {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
