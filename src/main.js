import HelloWorld from "./components/HelloWorld.vue";
import CrosierBlock from "./components/crosierBlock.vue";
import CrosierFormS from "./components/crosierFormS.vue";
import CrosierListS from "./components/crosierListS.vue";

import CrosierCalendar from "./components/fields/CrosierCalendar";
import CrosierCurrency from "./components/fields/CrosierCurrency";
import CrosierDropdown from "./components/fields/CrosierDropdown";
import CrosierDropdownBanco from "./components/fields/CrosierDropdownBanco";
import CrosierDropdownEntity from "./components/fields/CrosierDropdownEntity";
import CrosierInputText from "./components/fields/CrosierInputText";
import CrosierInputInt from "./components/fields/CrosierInputInt";
import CrosierInputDecimal from "./components/fields/CrosierInputDecimal";
import CrosierPercent from "./components/fields/CrosierPercent";

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

  CrosierCalendar,
  CrosierCurrency,
  CrosierDropdown,
  CrosierDropdownBanco,
  CrosierDropdownEntity,
  CrosierInputText,
  CrosierInputInt,
  CrosierInputDecimal,
  CrosierPercent,
};
