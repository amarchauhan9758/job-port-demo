import axios from "axios";

/**
 * Generic function to handle API calls for getServerSideProps
 * @param {string} url - The API endpoint to call.
 * @param {object} [query] - Query parameters to include in the API call.
 * @param {object} [headers] - Additional headers for the API call.
 * @returns {object} - Props to be returned to the page.
 */
export async function fetchServerSideData({ url, query = {}, headers = {} }) {
  let data = null;
  let error = null;

  try {
    const response = await axios.get(url, {
      params: query,
      headers: headers,
    });
    data = response.data;
  } catch (err) {
    error = err.response?.data?.message || err.message;
  }

  return {
    props: {
      data,
      error,
      isLoading: !data && !error, // Indicating whether the page is still loading
    },
  };
}
