const { downloadImageUseCase } = require("./donwload-file.usecase");

const downloadImageController = async (req, res) => {
  const { url } = req.body;
   try {
    const response = await downloadImageUseCase({url});
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = { downloadImageController };
