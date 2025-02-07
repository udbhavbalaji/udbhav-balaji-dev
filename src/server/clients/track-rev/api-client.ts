import axios from "axios";

const sendIt = async (url: string, limit?: number, offset?: number) => {
  try {
    const response = await axios.get<{ MRData: Record<string, unknown> }>(url, {
      params: { limit, offset },
    });

    const responseData = response.data.MRData;

    return responseData;
  } catch (err) {
    console.error(err);
    throw new Error("Error while fetching data for constructors standings");
  }
};

export default sendIt;
