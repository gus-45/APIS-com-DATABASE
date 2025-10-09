import { PetData } from "../data/PetData";
import { Pet } from "../types/Pet";
import { UserData } from "../data/UserData";

export class PetBusiness {
  petData = new PetData();
  userData = new UserData();

  public async getPetById(petId: number): Promise<Pet | null> {
    try {
      const pet = await this.petData.getPetById(petId);
      return pet;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllPets(): Promise<Pet[]> {
    try {
      const pets = await this.petData.getAllPets();
      return pets;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createPet(name: string, userId: number): Promise<Pet> {
    try {
      const user = await this.userData.getUserById(userId);

      if (!user) {
        throw new Error("user_id inválido");
      }

      const pet = await this.petData.createPet(name, userId);

      return pet;
    } catch (error: any) {
      throw error;
    }
  }

   public async updatePet(petId: number, name: string, userId: number): Promise<Pet> {
    try {
      const pet = await this.petData.getPetById(petId);

      if (!pet) {
        throw new Error("Pet não encontrado");
      }

      const user = await this.userData.getUserById(userId);

      if (!user) {
        throw new Error("user_id inválido");
      }

      await this.petData.updatePet(petId, name, userId);

      return { id: petId, name, user_id: userId };
    } catch (error: any) {
      throw error;
    }
  }

  public async deletePet(petId: number): Promise<void> {
    try {
      const pet = await this.petData.getPetById(petId);

      if (!pet) {
        throw new Error("Pet não encontrado");
      }

      await this.petData.deletePet(petId);
    } catch (error: any) {
      throw error;
    }
  }
}