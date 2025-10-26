import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
} from '../database/repository';
import { errorResponse } from '../utils/error.handler';
import { Response, Request } from 'express';
//GET ALL
export const getAllClientsController = async (req: Request, res: Response) => {
  try {
    const response = await getAllClients();
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.json(response);
  } catch (error) {
    console.error(error);
    errorResponse(res, error.message, 404, false);
  }
};
//GET BY ID
export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const response = await getClientById(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 404, false);
  }
};
//CREATE
export const createClientController = async (req: Request, res: Response) => {
  try {
    const response = await createClient(req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
//UPDATE
export const updateClientController = async (req: Request, res: Response) => {
  try {
    const response = await updateClient(Number(req.params.id), req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
//DELETE
export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const response = await deleteClient(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
