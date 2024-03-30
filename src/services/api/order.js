import axiosRequest from "@/utils/axiosRequest";

const createOrder = async (data) => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/order`,
    method: 'POST',
    data,
  });

  return { data: response, isError, error };
}

export { createOrder }