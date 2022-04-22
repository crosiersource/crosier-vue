import axios from "axios";

export async function deleteEntityData(apiResource) {
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

  return axios.delete(apiResource, {
    headers: {
      "Content-Type": "application/ld+json",
    },
    validateStatus(status) {
      return status < 500;
    },
  });
}
