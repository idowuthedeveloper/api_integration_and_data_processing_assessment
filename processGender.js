import genderizeName from "./services/genderize.js";

const processGender = async (req, res) => {
  try {
    if (!req.query.name || req.query.name === "") {
      return res
        .status(400)
        .json({ status: "error", message: "Name query parameter is missing" });
    }

    if (isFinite(req.query.name)) {
      return res
        .status(422)
        .json({ status: "error", message: "Name can only be string" });
    }

    const data = await genderizeName(req.query.name);

    if (data.gender === null || data.count === 0) {
      return res.status(200).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    const is_confident =
      data.probability >= 0.7 && data.count >= 100 ? true : false;

    const processedData = {
      name: data.name,
      gender: data.gender,
      probability: data.probability,
      sample_size: data.count,
      is_confident,
      processed_at: new Date(),
    };

    return res.status(200).json({ status: "success", data: processedData });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export default processGender;
