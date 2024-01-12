import axios from "axios";

export const upload = async (file, sendMessageFunc = null) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "alumni");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/df6pun3tr/image/upload",
      data
    );
    const { url } = response.data;

    if (url) {
      if (sendMessageFunc) {
        sendMessageFunc(url);
      }
    }
    return url;
  } catch (error) {
    console.log(error);
    return error;
  }
};
