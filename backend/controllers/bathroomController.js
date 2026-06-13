const Bathroom = require('../models/Bathroom');

const getBathroomProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const bathroom = await Bathroom.findById(id);
    
    if (!bathroom) {
      return res.status(404).json({ message: "Bathroom not found" });
    }
    
    res.status(200).json(bathroom);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getBathroomProfile };