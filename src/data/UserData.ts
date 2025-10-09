import connection from "../dbConnection";

export class UserData {
  async getUserById(userId: number) {
    try {
      const user = await connection("users").where({ id: userId }).first();
      return user;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await connection("users").select("*");
      return users;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await connection("users").where({ email }).first();
      return user;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async createUser(name: string, email: string) {
    try {
      const result = await connection("users").insert({ name, email }).returning("*");
      
     
      if (Array.isArray(result) && result.length > 0) {
        return result[0]; 
      }
      
     const user = await connection("users").where({ email }).first();
      return user;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateUser(userId: number, name: string, email: string) {
    try {
      await connection("users").where({ id: userId }).update({ name, email });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async deleteUser(userId: number) {
    try {
      await connection("users").where({ id: userId }).delete();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getPetsByUserId(userId: number) {
    try {
      const pets = await connection("pets").where({ user_id: userId });
      return pets;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}