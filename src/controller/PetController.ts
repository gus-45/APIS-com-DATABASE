import { Request, Response } from "express";
import { PetBusiness } from "../business/PetBusiness";

export class PetController {
  petBusiness = new PetBusiness();

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const errors: string[] = [];

      if (!id || isNaN(Number(id))) {
        errors.push("ID do pet é obrigatório e deve ser um número");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const idNumber = Number(id);
      const pet = await this.petBusiness.getPetById(idNumber);

      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Pet não encontrado",
          errors: ["Pet não encontrado"],
        });
      }

      res.status(200).json({
        success: true,
        message: "Pet encontrado com sucesso",
        data: pet,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar pet",
        errors: [error.message],
      });
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const pets = await this.petBusiness.getAllPets();

      res.status(200).json({
        success: true,
        message: "Pets listados com sucesso",
        data: pets,
        total: pets.length,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar pets",
        errors: [error.message],
      });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { name, user_id } = req.body;
      const errors: string[] = [];

      if (!name) {
        errors.push("Nome é obrigatório");
      }

      if (!user_id) {
        errors.push("user_id é obrigatório");
      }

      if (name && typeof name !== "string") {
        errors.push("Nome deve ser uma string");
      }

      if (name && typeof name === "string" && name.trim() === "") {
        errors.push("Nome não pode ser vazio");
      }

      if (user_id && isNaN(Number(user_id))) {
        errors.push("user_id deve ser um número");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const userIdNumber = Number(user_id);
      const pet = await this.petBusiness.createPet(name, userIdNumber);

      res.status(201).json({
        success: true,
        message: "Pet criado com sucesso",
        data: pet,
      });
    } catch (error: any) {
      if (error.message === "user_id inválido") {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: [error.message],
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao criar pet",
        errors: [error.message],
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, user_id } = req.body;
      const errors: string[] = [];

      if (!id || isNaN(Number(id))) {
        errors.push("ID do pet é obrigatório e deve ser um número");
      }

      if (!name) {
        errors.push("Nome é obrigatório");
      }

      if (!user_id) {
        errors.push("user_id é obrigatório");
      }

      if (name && typeof name !== "string") {
        errors.push("Nome deve ser uma string");
      }

      if (name && typeof name === "string" && name.trim() === "") {
        errors.push("Nome não pode ser vazio");
      }

      if (user_id && isNaN(Number(user_id))) {
        errors.push("user_id deve ser um número");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const idNumber = Number(id);
      const userIdNumber = Number(user_id);
      const pet = await this.petBusiness.updatePet(idNumber, name, userIdNumber);

      res.status(200).json({
        success: true,
        message: "Pet atualizado com sucesso",
        data: pet,
      });
    } catch (error: any) {
      if (error.message === "Pet não encontrado") {
        return res.status(404).json({
          success: false,
          message: "Pet não encontrado",
          errors: [error.message],
        });
      }
      if (error.message === "user_id inválido") {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: [error.message],
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar pet",
        errors: [error.message],
      });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const errors: string[] = [];

      if (!id || isNaN(Number(id))) {
        errors.push("ID do pet é obrigatório e deve ser um número");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const idNumber = Number(id);
      await this.petBusiness.deletePet(idNumber);

      res.status(204).send();
    } catch (error: any) {
      if (error.message === "Pet não encontrado") {
        return res.status(404).json({
          success: false,
          message: "Pet não encontrado",
          errors: [error.message],
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao deletar pet",
        errors: [error.message],
      });
    }
  };
}