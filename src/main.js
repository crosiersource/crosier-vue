import HelloWorld from "./components/HelloWorld.vue";
import CrosierBlock from "./components/crosierBlock.vue";
import CrosierFormS from "./components/crosierFormS.vue";
import CrosierListS from "./components/crosierListS.vue";

import { fetchTableData } from "./services/ApiDataFetchService";
import { deleteEntityData } from "./services/ApiDeleteService";
import { postEntityData } from "./services/ApiPostService";
import { putEntityData } from "./services/ApiPutService";
import { submitForm } from "./services/SubmitForm";
import { validateFormData } from "./services/ValidateFormData";

export default {
  HelloWorld,
  CrosierBlock,
  CrosierFormS,
  CrosierListS,
  fetchTableData,
  deleteEntityData,
  postEntityData,
  putEntityData,
  submitForm,
  validateFormData,
};
