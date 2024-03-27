import axiosRequest from "@/utils/axiosRequest";

const findBooks = async (params = {}) => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/book`,
    method: 'GET',
    params,
  });

  return { data: response, isError, error };
}

export { findBooks }