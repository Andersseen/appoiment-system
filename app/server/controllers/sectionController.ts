import {
  createSection,
  deleteSection,
  getAllSections,
  getSectionById,
  updateSection,
} from '../database/repository';
import { errorResponse } from '../utils/error.handler';
import { Response, Request } from 'express';

//GET ALL
export const getAllSectionsController = async (req: Request, res: Response) => {
  try {
    const response = await getAllSections();
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
export const getSectionByIdController = async (req: Request, res: Response) => {
  try {
    const response = await getSectionById(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//CREATE
export const createSectionController = async (req: Request, res: Response) => {
  try {
    const response = await createSection(req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(201).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//UPDATE
export const updateSectionController = async (req: Request, res: Response) => {
  try {
    const response = await updateSection(Number(req.params.id), req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//DELETE
export const deleteSectionController = async (req: Request, res: Response) => {
  try {
    const response = await deleteSection(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
