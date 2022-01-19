// fields
import CrosierAutoComplete from "./components/fields/CrosierAutoComplete";
import CrosierCalendar from "./components/fields/CrosierCalendar";
import CrosierColorPicker from "./components/fields/CrosierColorPicker";
import CrosierCurrency from "./components/fields/CrosierCurrency";
import CrosierDropdown from "./components/fields/CrosierDropdown";
import CrosierDropdownBanco from "./components/fields/CrosierDropdownBanco";
import CrosierDropdownBoolean from "./components/fields/CrosierDropdownBoolean";
import CrosierDropdownEntity from "./components/fields/CrosierDropdownEntity";
import CrosierDropdownUf from "./components/fields/CrosierDropdownUf";
import CrosierInputCep from "./components/fields/CrosierInputCep";
import CrosierInputCnpj from "./components/fields/CrosierInputCnpj";
import CrosierInputCpf from "./components/fields/CrosierInputCpf";
import CrosierInputCpfCnpj from "./components/fields/CrosierInputCpfCnpj";
import CrosierInputDecimal from "./components/fields/CrosierInputDecimal";
import CrosierInputEmail from "./components/fields/CrosierInputEmail";
import CrosierInputInt from "./components/fields/CrosierInputInt";
import CrosierInputTelefone from "./components/fields/CrosierInputTelefone";
import CrosierInputText from "./components/fields/CrosierInputText";
import CrosierInputTextarea from "./components/fields/CrosierInputTextarea";
import CrosierPercent from "./components/fields/CrosierPercent";

// components
import CrosierBlock from "./components/crosierBlock.vue";
import CrosierFormS from "./components/crosierFormS.vue";
import CrosierListS from "./components/crosierListS.vue";

// services
import api from "./services/api";
import { submitForm } from "./services/SubmitForm";
import { validateFormData } from "./services/ValidateFormData";

// functions
import { SetFocus } from "./functions/SetFocus";

export default {
  CrosierAutoComplete,
  CrosierCalendar,
  CrosierColorPicker,
  CrosierCurrency,
  CrosierDropdown,
  CrosierDropdownBanco,
  CrosierDropdownBoolean,
  CrosierDropdownEntity,
  CrosierDropdownUf,
  CrosierInputCep,
  CrosierInputCnpj,
  CrosierInputCpf,
  CrosierInputCpfCnpj,
  CrosierInputDecimal,
  CrosierInputEmail,
  CrosierInputInt,
  CrosierInputTelefone,
  CrosierInputText,
  CrosierInputTextarea,
  CrosierPercent,

  CrosierBlock,
  CrosierFormS,
  CrosierListS,

  api,
  submitForm,
  validateFormData,

  SetFocus,
};
