import TanstackModel from "../models/tanstack.model.js";

export const createData = async (req, res) => {
  const { name, description } = req.body;
  const newTanstack = new TanstackModel({
    name,
    description,
  });
  const data = await newTanstack.save();
  res.status(200).json(data);
};

export const getData = async (req, res) => {
  const data = await TanstackModel.find().sort({ createdAt: -1 });
  res.status(201).json(data);
};

export const deleteData = async (req, res) => {
  try {
    const deletedItem = await TanstackModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Deleted successfully", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatedata = async (req, res) => {
  try {
    const updateData = await TanstackModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateData) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Deleted successfully", data: updateData });
  } catch (error) {
    res.status(500).json({ message: "update error", error: error.message });
  }
};
