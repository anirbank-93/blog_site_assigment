import { uploadFile } from '../middleware/utils/upload.js';

export const uploadOneImg = async (req, res) => {
  console.log(req.file);
  if (req.file == '' || req.file == null || typeof req.file == 'undefined') {
    return res.status(400).send({
      status: false,
      error: {
        msg: 'IS_EMPTY',
        param: 'file',
        location: 'file',
      },
    });
  }

  try {
    const file_loc = await uploadFile(req, 'blog_pics');

    const file_loc_array = file_loc.split('public/');

    return res.status(200).json({
      status: true,
      image_url: file_loc_array[1],
    });
  } catch (e) {
    console.log(e.message, 'thisisis');
    res.status(500).json({
      status: false,
      message: 'Server error',
      error: e.message,
    });
  }
};

export const getImg = (req, res) => {
  console.log(req._parsedUrl);
};
