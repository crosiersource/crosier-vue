import axios from "axios";

export async function postEntityData(apiResource, data) {
  if (apiResource) {
    do {
      if (!apiResource || apiResource.slice(-1).match(/[a-z0-9]/i)) {
        break;
      }
      console.debug(`apiResource com formato inválido: ${apiResource}`);
      apiResource = apiResource.substring(0, apiResource.length - 1);
      // eslint-disable-next-line no-constant-condition
    } while (true);
  }

  const params = {
    headers: {
      "Content-Type": "application/ld+json",
    },
    validateStatus(status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  };

  return axios.post(`${apiResource}`, data, params);
}
