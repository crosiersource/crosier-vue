// fields
import CrosierAutoComplete from "./components/fields/CrosierAutoComplete";
import CrosierButton from "./components/fields/CrosierButton";
import CrosierCalendar from "./components/fields/CrosierCalendar";
import CrosierColorPicker from "./components/fields/CrosierColorPicker";
import CrosierCurrency from "./components/fields/CrosierCurrency";
import CrosierDropdown from "./components/fields/CrosierDropdown";
import CrosierDropdownAno from "./components/fields/CrosierDropdownAno";
import CrosierDropdownBanco from "./components/fields/CrosierDropdownBanco";
import CrosierDropdownBoolean from "./components/fields/CrosierDropdownBoolean";
import CrosierDropdownEntity from "./components/fields/CrosierDropdownEntity";
import CrosierDropdownMes from "./components/fields/CrosierDropdownMes";
import CrosierDropdownUf from "./components/fields/CrosierDropdownUf";
import CrosierInputCep from "./components/fields/CrosierInputCep";
import CrosierInputCnpj from "./components/fields/CrosierInputCnpj";
import CrosierInputCpf from "./components/fields/CrosierInputCpf";
import CrosierInputCpfCnpj from "./components/fields/CrosierInputCpfCnpj";
import CrosierInputDecimal from "./components/fields/CrosierInputDecimal";
import CrosierInputEmail from "./components/fields/CrosierInputEmail";
import CrosierInputId from "./components/fields/CrosierInputId";
import CrosierInputInt from "./components/fields/CrosierInputInt";
import CrosierInputMask from "./components/fields/CrosierInputMask";
import CrosierInputTelefone from "./components/fields/CrosierInputTelefone";
import CrosierInputText from "./components/fields/CrosierInputText";
import CrosierInputTextarea from "./components/fields/CrosierInputTextarea";
import CrosierMesAno from "./components/fields/CrosierMesAno";
import CrosierMultiSelectEntity from "./components/fields/CrosierMultiSelectEntity";
import CrosierMultiSelect from "./components/fields/CrosierMultiSelect";
import CrosierPercent from "./components/fields/CrosierPercent";
import CrosierSwitch from "./components/fields/CrosierSwitch";

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
  CrosierButton,
  CrosierCalendar,
  CrosierColorPicker,
  CrosierCurrency,
  CrosierDropdown,
  CrosierDropdownAno,
  CrosierDropdownBanco,
  CrosierDropdownBoolean,
  CrosierDropdownEntity,
  CrosierDropdownMes,
  CrosierDropdownUf,
  CrosierInputCep,
  CrosierInputCnpj,
  CrosierInputCpf,
  CrosierInputCpfCnpj,
  CrosierInputDecimal,
  CrosierInputEmail,
  CrosierInputId,
  CrosierInputInt,
  CrosierInputMask,
  CrosierInputTelefone,
  CrosierInputText,
  CrosierInputTextarea,
  CrosierMesAno,
  CrosierMultiSelectEntity,
  CrosierMultiSelect,
  CrosierPercent,
  CrosierSwitch,

  CrosierBlock,
  CrosierFormS,
  CrosierListS,

  api,
  submitForm,
  validateFormData,

  SetFocus,
};
