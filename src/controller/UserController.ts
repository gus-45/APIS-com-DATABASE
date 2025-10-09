import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  userBusiness = new UserBusiness();

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário é obrigatório e deve ser um número",
        });
      }

      const idNumber = Number(id);
      const user = await this.userBusiness.getUserById(idNumber);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
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
        error: error.message,
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
        error: error.message,
      });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: "Nome e e-mail são obrigatórios",
        });
      }

      if (typeof name !== "string" || typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Nome e e-mail devem ser strings",
        });
      }

      if (name.trim() === "" || email.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Nome e e-mail não podem ser vazios",
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
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, email } = req.body;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário é obrigatório e deve ser um número",
        });
      }

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: "Nome e e-mail são obrigatórios",
        });
      }

      if (typeof name !== "string" || typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Nome e e-mail devem ser strings",
        });
      }

      if (name.trim() === "" || email.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Nome e e-mail não podem ser vazios",
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
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar usuário",
        error: error.message,
      });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário é obrigatório e deve ser um número",
        });
      }

      const idNumber = Number(id);
      await this.userBusiness.deleteUser(idNumber);

      res.status(200).json({
        success: true,
        message: "Usuário deletado com sucesso",
      });
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      if (error.message === "Não é possível excluir usuário com pets vinculados") {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro ao deletar usuário",
        error: error.message,
      });
    }
  };
}