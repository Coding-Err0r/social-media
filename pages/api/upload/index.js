import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

var mv = require('mv');

export const config = {
  api: {
    bodyParser: true
  }
};

const Upload = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    const temp = new Date().toLocaleString();
    const dateTime = temp.replace(/[^\w\s]/gi, '_');

    form.parse(req, (err, fields, files) => {
      console.log(files);
      if (err) return reject(err);
      var oldPath = files.file.filepath;
      var newPath = `./public/images/${
        dateTime + files.file.originalFilename
      }`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files });
    });
  });
};
export default Upload;
