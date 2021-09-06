import HelloWorld from "./components/HelloWorld.vue";
import CrosierBlock from "./components/crosierBlock.vue";
import CrosierFormS from "./components/crosierFormS.vue";
import CrosierListS from "./components/crosierListS.vue";

import api from "./services/api";
import { submitForm } from "./services/SubmitForm";
import { validateFormData } from "./services/ValidateFormData";

export default {
  HelloWorld,
  CrosierBlock,
  CrosierFormS,
  CrosierListS,
  api,
  submitForm,
  validateFormData,
};
