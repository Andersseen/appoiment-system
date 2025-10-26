/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import {
  createSectionController,
  deleteSectionController,
  getAllSectionsController,
  getSectionByIdController,
  updateSectionController,
} from '../controllers/sectionController';

const route = Router();

route.get('/', getAllSectionsController);
route.post('/', createSectionController);
route.get('/:id', getSectionByIdController);
route.put('/:id', updateSectionController);
route.delete('/:id', deleteSectionController);

export { route as sectionRoute };
