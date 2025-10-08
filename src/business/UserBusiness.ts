import { UserData } from "../data/UserData";
import { User } from "../types/User";

export class UserBusiness {
  userData = new UserData();

  public async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await this.userData.getUserById(userId);
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userData.getAllUsers();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createUser(name: string, email: string): Promise<User> {
    try {
      const existingUser = await this.userData.getUserByEmail(email);

      if (existingUser) {
        throw new Error("E-mail já cadastrado");
      }

      const id = await this.userData.createUser(name, email);
      
      return { id, name, email };
    } catch (error: any) {
      throw error;
    }
  }

  public async updateUser(userId: number, name: string, email: string): Promise<User> {
    try {
      const user = await this.userData.getUserById(userId);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      await this.userData.updateUser(userId, name, email);

      return { id: userId, name, email };
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      const user = await this.userData.getUserById(userId);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const pets = await this.userData.getPetsByUserId(userId);

      if (pets.length > 0) {
        throw new Error("Não é possível excluir usuário com pets vinculados");
      }

      await this.userData.deleteUser(userId);
    } catch (error: any) {
      throw error;
    }
  }
}