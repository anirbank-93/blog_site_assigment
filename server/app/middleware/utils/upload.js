// import { GridFsStorage } from 'multer-gridfs-storage';
// import multer from 'multer';
import fs from 'fs';

// import db_config from '../../config/db.config.js';

// // postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName";
// const STORAGE = new GridFsStorage({
//   url: `${db_config.dialect}://${db_config.USER}:${db_config.PASSWORD}@${db_config.HOST}:${db_config.DB_PORT}/${db_config.DB}`,
//   options: { useNewUrlParser: true },
//   file: (request, file) => {
//     var match = ['image/png', 'image/jpg', 'image/jpeg'];

//     if (match.indexOf(file.mimeType) === -1) {
//       return `${Math.floor(
//         100000 + Math.random() * 900000
//       )}-blog-${file.originalname.split(' ').join('')}`;
//     }

//     return {
//       bucketname: 'public/uploads',
//       filename: `${Math.floor(
//         100000 + Math.random() * 900000
//       )}-blog-${file.originalname.split(' ').join('')}`,
//     };
//   },
// });

// export default multer({ storage: STORAGE });

export const uploadFile = async (req, folder) => {
  var filetype = '';

  // Check for mimetype
  if (
    req.file.mimetype ==
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    filetype = 'docx';
  }
  if (req.file.mimetype == 'application/pdf') {
    filetype = 'pdf';
  }
  if (req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/jpg') {
    filetype = 'jpeg';
  }
  if (req.file.mimetype == 'image/png') {
    filetype = 'png';
  }

  var file_name =
    'public/uploads/' +
    folder +
    '/' +
    Math.floor(100000 + Math.random() * 900000) +
    '.' +
    filetype;

  fs.writeFileSync(file_name, req.file.buffer);

  return file_name;
};
