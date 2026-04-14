const baseURL = "https://api.genderize.io";

const genderizeName = async (name) => {
  try {
    const response = await fetch(`${baseURL}?name=${name}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default genderizeName;
