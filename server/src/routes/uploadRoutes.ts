import path from 'path';
import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { baseURL } from '../baseURL';

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file: any, cb: any) {
  const filetypes = /jpg|jpeg|png|PNG/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('You can upload only jpg, jpeg, png format!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router
  .route('/')
  .post(upload.single('image'), (req: Request, res: Response) => {
    if (req.file) {
      res.send(`${baseURL}/${req.file.path}`);
    }
  });

export default router;
