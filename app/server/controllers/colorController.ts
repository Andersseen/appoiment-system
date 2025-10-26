import {
  createColor,
  deleteColor,
  getAllColors,
  getColorById,
  updateColor,
} from '../database/repository';
import { errorResponse } from '../utils/error.handler';
import { Response, Request } from 'express';

//GET ALL
export const getAllColorsController = async (req: Request, res: Response) => {
  try {
    const response = await getAllColors();
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
export const getColorByIdController = async (req: Request, res: Response) => {
  try {
    const response = await getColorById(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//CREATE
export const createColorController = async (req: Request, res: Response) => {
  try {
    const response = await createColor(req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(201).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//UPDATE
export const updateColorController = async (req: Request, res: Response) => {
  try {
    const response = await updateColor(Number(req.params.id), req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//DELETE
export const deleteColorController = async (req: Request, res: Response) => {
  try {
    const response = await deleteColor(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
