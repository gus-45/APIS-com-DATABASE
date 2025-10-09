import { Request, Response } from "express";
import { PetBusiness } from "../business/PetBusiness";

export class PetController {
  petBusiness = new PetBusiness();

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          error: "ID do pet é obrigatório e deve ser um número",
        });
      }

      const idNumber = Number(id);
      const pet = await this.petBusiness.getPetById(idNumber);

      if (!pet) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

      res.status(200).send(pet);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const pets = await this.petBusiness.getAllPets();
      res.status(200).send(pets);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { name, user_id } = req.body;

      if (!name || !user_id) {
        return res.status(400).json({ error: "Nome e user_id são obrigatórios" });
      }

      if (typeof name !== "string") {
        return res.status(400).json({ error: "Nome deve ser uma string" });
      }

      if (name.trim() === "") {
        return res.status(400).json({ error: "Nome não pode ser vazio" });
      }

      if (isNaN(Number(user_id))) {
        return res.status(400).json({ error: "user_id deve ser um número" });
      }

      const userIdNumber = Number(user_id);
      const pet = await this.petBusiness.createPet(name, userIdNumber);

      res.status(201).send(pet);
    } catch (error: any) {
      if (error.message === "user_id inválido") {
        return res.status(400).send({ error: error.message });
      }
      res.status(500).send({ error: error.message });
    }
  };
}