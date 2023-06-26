import express from 'express';
import { createContact, getContact, updateContact, deleteContact } from '../controllers/controller.js';

const router = express.Router();

router.post('/createContact',createContact);
router.post('/getContact',getContact );
router.post('/updateContact',updateContact);
router.post('/deleteContact',deleteContact);

export default router;
