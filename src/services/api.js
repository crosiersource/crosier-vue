import { fetchTableData } from "./ApiDataFetchService";
import { postEntityData } from "./ApiPostService";
import { putEntityData } from "./ApiPutService";
import { deleteEntityData } from "./ApiDeleteService";

export default {
  get: fetchTableData,
  post: postEntityData,
  put: putEntityData,
  delete: deleteEntityData,
};
