import HelloWorld from "./components/HelloWorld.vue";
import CrosierBlock from "./components/crosierBlock.vue";
import CrosierFormS from "./components/crosierFormS.vue";
import CrosierListS from "./components/crosierListS.vue";

import CrosierCalendar from "./components/fields/CrosierCalendar";
import CrosierCurrency from "./components/fields/CrosierCurrency";
import CrosierDropdown from "./components/fields/CrosierDropdown";
import CrosierDropdownBoolean from "./components/fields/CrosierDropdownBoolean";
import CrosierDropdownBanco from "./components/fields/CrosierDropdownBanco";
import CrosierDropdownEntity from "./components/fields/CrosierDropdownEntity";
import CrosierAutoComplete from "./components/fields/CrosierAutoComplete";
import CrosierInputText from "./components/fields/CrosierInputText";
import CrosierInputTextarea from "./components/fields/CrosierInputTextarea";
import CrosierInputInt from "./components/fields/CrosierInputInt";
import CrosierInputDecimal from "./components/fields/CrosierInputDecimal";
import CrosierPercent from "./components/fields/CrosierPercent";

import CrosierInputCpfCnpj from "./components/fields/CrosierInputCpfCnpj";
import CrosierInputCpf from "./components/fields/CrosierInputCpf";
import CrosierInputCnpj from "./components/fields/CrosierInputCnpj";
import CrosierInputTelefone from "./components/fields/CrosierInputTelefone";

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
  CrosierDropdownBoolean,
  CrosierDropdownBanco,
  CrosierDropdownEntity,
  CrosierAutoComplete,
  CrosierInputText,
  CrosierInputTextarea,
  CrosierInputInt,
  CrosierInputDecimal,
  CrosierPercent,

  CrosierInputCpfCnpj,
  CrosierInputCpf,
  CrosierInputCnpj,
  CrosierInputTelefone,
};
