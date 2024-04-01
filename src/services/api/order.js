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

const findOrder = async (params = {}) => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/order`,
    method: 'GET',
    params,
  });

  return { data: response, isError, error };
}

const cancelOrder = async (id) => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/order/${id}/cancel`,
    method: 'PUT',
  });

  return { data: response, isError, error };
}

export { createOrder, findOrder, cancelOrder }