import connection from "../dbConnection";

export class PetData {
  async getPetById(petId: number) {
    try {
      const pet = await connection("pets").where({ id: petId }).first();
      return pet;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getAllPets() {
    try {
      const pets = await connection("pets").select("*");
      return pets;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async createPet(name: string, userId: number) {
    try {
      const result = await connection("pets").insert({ name, user_id: userId }).returning("*");
      
      
      if (Array.isArray(result) && result.length > 0) {
        return result[0]; 
      }
      
      const pet = await connection("pets").where({ name, user_id: userId }).first();
      return pet;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updatePet(petId: number, name: string, userId: number) {
    try {
      await connection("pets")
        .where({ id: petId })
        .update({ name, user_id: userId });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async deletePet(petId: number) {
    try {
      await connection("pets").where({ id: petId }).delete();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}