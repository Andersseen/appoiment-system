import { Router } from 'express';
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
} from '../controllers/eventController';

const route = Router();

route.get('/', getAllEventsController);
route.post('/', createEventController);
route.get('/:id', getEventByIdController);
route.put('/:id', updateEventController);
route.delete('/:id', deleteEventController);

export { route as eventRoute };
