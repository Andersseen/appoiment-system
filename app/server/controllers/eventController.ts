import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from '../database/repository';
import { errorResponse } from '../utils/error.handler';
import { Response, Request } from 'express';

//GET ALL
export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const response = await getAllEvents();
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
export const getEventByIdController = async (req: Request, res: Response) => {
  try {
    const response = await getEventById(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//CREATE
export const createEventController = async (req: Request, res: Response) => {
  try {
    const response = await createEvent(req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(201).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//UPDATE
export const updateEventController = async (req: Request, res: Response) => {
  try {
    const response = await updateEvent(Number(req.params.id), req.body);
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
//DELETE
export const deleteEventController = async (req: Request, res: Response) => {
  try {
    const response = await deleteEvent(Number(req.params.id));
    if (!response) {
      return errorResponse(res, 'Not found', 404, false);
    }
    res.status(200).json(response);
  } catch (error) {
    errorResponse(res, error.message, 400, false);
  }
};
