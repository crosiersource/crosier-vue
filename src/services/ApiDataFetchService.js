import axios from "axios";

/**
 * @example
 export default {
      methods: {
        async changeCliente(event) {
          var theFilters = {
            "codigo": event.value
          };
          const response = await fetchTableData({
            apiResource: "/api/ekt/cts-d002/",
            filters: theFilters,
          });
          if (response?.data && response.data["hydra:totalItems"] > 0)
          {
            if (response?.data["hydra:member"][0] != null)
            {
                this.formFields.clienteNome = response?.data["hydra:member"][0].nome;
            }
          }
        },
      },
    };
 * @param string apiResource O endereço relativo do recurso da API.
 * @param int page A página que está sendo listada.
 * @param int rows O número de itens a serem listados na página.
 * @param {} order A ordem em que os itens serão ordenados.
 * @param {*} filters Um array associativo indexado pelo nome do campo, contendo valores e outros arrays.
 * @param boolean allRows Retorne todas as linhas? Default: falso.
 * @param string complement Complemento?
 * @returns A resposta, dada por axios.get.
 */
export async function fetchTableData({
  apiResource,
  page = 1,
  rows = 10,
  order = {},
  filters = null,
  defaultFilters = null,
  allRows = false,
  complement = "",
  properties = null,
}) {
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
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const queryPage = `?page=${allRows ? 1 : page}`;
  const queryRows = `&rows=${allRows ? Number.MAX_SAFE_INTEGER : rows}`;
  let queryOrder = "";
  let queryFilter = "";

  if (order) {
    if (order instanceof Array) {
      // padrão primevue.datatable
      order.forEach((v) => {
        queryOrder += `&order[${v.field}]=${v.order === 1 ? "ASC" : "DESC"}`;
      }, order);
    } else if (order instanceof Map) {
      // padrão map.set(field, sortOrder)
      order.forEach((value, key) => {
        queryOrder += `&order[${key}]=${value}`;
      }, order);
    } else {
      // padrão { field: sortOrder }
      Object.keys(order).forEach((value) => {
        queryOrder += `&order[${value}]=${order[value]}`;
      }, order);
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  if (filters) {
    if (filters instanceof Array) {
      filters.forEach((e) => {
        const entries = Object.entries(e);
        queryFilter = `${queryFilter}&${entries[0][0]}=${entries[0][1]}`;
      });
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in filters) {
        if (filters[key] !== null && filters[key] !== "") {
          if (!Array.isArray(filters[key])) {
            queryFilter += `&${key}=${filters[key]}`;
          } else {
            // eslint-disable-next-line no-loop-func
            filters[key].forEach(function iterate(item) {
              queryFilter += `&${key}[]=${item}`;
            });
          }
        }
      }
    }
  }

  if (defaultFilters) {
    if (defaultFilters instanceof Array) {
      defaultFilters.forEach((e) => {
        const entries = Object.entries(e);
        queryFilter = `${queryFilter}&${entries[0][0]}=${entries[0][1]}`;
      });
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in defaultFilters) {
        if (defaultFilters[key] !== null && defaultFilters[key] !== "") {
          if (!Array.isArray(defaultFilters[key])) {
            queryFilter += `&${key}=${defaultFilters[key]}`;
          } else {
            // eslint-disable-next-line no-loop-func
            defaultFilters[key].forEach(function iterate(item) {
              queryFilter += `&${key}[]=${item}`;
            });
          }
        }
      }
    }
  }

  let sProperties = "";
  if (properties) {
    sProperties = "&";
    Object.values(properties).forEach((property) => {
      if (property.includes(".")) {
        let sMult = "properties[";
        const campos = property.split(".");
        for (let i = 0; i <= campos.length - 2; i++) {
          sMult += `${campos[i]}][`;
        }
        sMult += `]=${campos[campos.length - 1]}`;
        sProperties += `${sMult}&`;
      } else {
        sProperties += `properties[]=${property}&`;
      }
    });
    sProperties = sProperties.substring(0, sProperties.length - 1);
  }

  return axios.get(
    `${apiResource}${queryPage}${queryRows}${queryFilter}${queryOrder}${sProperties}${complement}`,
    params
  );
}
