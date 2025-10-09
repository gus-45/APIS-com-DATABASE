import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  userBusiness = new UserBusiness();

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const errors: string[] = [];

      if (!id || isNaN(Number(id))) {
        errors.push("ID do usuário é obrigatório e deve ser um número");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const idNumber = Number(id);
      const user = await this.userBusiness.getUserById(idNumber);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
          errors: ["Usuário não encontrado"],
        });
      }

      res.status(200).json({
        success: true,
        message: "Usuário encontrado com sucesso",
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar usuário",
        errors: [error.message],
      });
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.getAllUsers();

      res.status(200).json({
        success: true,
        message: "Usuários listados com sucesso",
        data: users,
        total: users.length,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar usuários",
        errors: [error.message],
      });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const errors: string[] = [];

      if (!name) {
        errors.push("Nome é obrigatório");
      }

      if (!email) {
        errors.push("E-mail é obrigatório");
      }

      if (name && typeof name !== "string") {
        errors.push("Nome deve ser uma string");
      }

      if (email && typeof email !== "string") {
        errors.push("E-mail deve ser uma string");
      }

      if (name && typeof name === "string" && name.trim() === "") {
        errors.push("Nome não pode ser vazio");
      }

      if (email && typeof email === "string" && email.trim() === "") {
        errors.push("E-mail não pode ser vazio");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const user = await this.userBusiness.createUser(name, email);

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso",
        data: user,
      });
    } catch (error: any) {
      if (error.message === "E-mail já cadastrado") {
        return res.status(409).json({
          success: false,
          message: "Conflito",
          errors: [error.message],
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao criar usuário",
        errors: [error.message],
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, email } = req.body;
      const errors: string[] = [];

      if (!id || isNaN(Number(id))) {
        errors.push("ID do usuário é obrigatório e deve ser um número");
      }

      if (!name) {
        errors.push("Nome é obrigatório");
      }

      if (!email) {
        errors.push("E-mail é obrigatório");
      }

      if (name && typeof name !== "string") {
        errors.push("Nome deve ser uma string");
      }

      if (email && typeof email !== "string") {
        errors.push("E-mail deve ser uma string");
      }

      if (name && typeof name === "string" && name.trim() === "") {
        errors.push("Nome não pode ser vazio");
      }

      if (email && typeof email === "string" && email.trim() === "") {
        errors.push("E-mail não pode ser vazio");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const idNumber = Number(id);
      const user = await this.userBusiness.updateUser(idNumber, name, email);

      res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        data: user,
      });
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
          errors: [error.message],
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar usuário",
        errors: [error.message],
      });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const errors: string[] = [];

      if (!id || isNaN(Number(id))) {
        errors.push("ID do usuário é obrigatório e deve ser um número");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: errors,
        });
      }

      const idNumber = Number(id);
      await this.userBusiness.deleteUser(idNumber);

      res.status(204).send();
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
          errors: [error.message],
        });
      }
      if (error.message === "Não é possível excluir usuário com pets vinculados") {
        return res.status(409).json({
          success: false,
          message: "Conflito",
          errors: [error.message],
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao deletar usuário",
        errors: [error.message],
      });
    }
  };
}