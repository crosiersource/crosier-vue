import { putEntityData } from "./ApiPutService";
import { postEntityData } from "./ApiPostService";
import { validateFormData } from "./ValidateFormData";

export async function submitForm({
  apiResource,
  $store,
  formDataStateName,
  schemaValidator,
  setUrlId = true,
  fnBeforeSave = null,
  fnAfterGet = null,
  $toast = null,
}) {
  const getter = `get${formDataStateName.charAt(0).toUpperCase()}${formDataStateName.slice(1)}`;
  let formData = $store.getters[getter] ? $store.getters[getter] : $store.state[formDataStateName];

  if (!formData) {
    console.error(`$store.state[${formDataStateName}] n/d`);
    return false;
  }
  const commitFormData = `set${formDataStateName.charAt(0).toUpperCase()}${formDataStateName.slice(
    1
  )}`;

  if (
    schemaValidator &&
    !validateFormData({ $store, formDataStateName, schemaValidator, $toast })
  ) {
    return false;
  }

  let response;

  if (fnBeforeSave) {
    fnBeforeSave(formData);
  }

  if (formData["@id"]) {
    try {
      response = await putEntityData(formData["@id"], JSON.stringify(formData));
    } catch (e) {
      if ($toast) {
        $toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao efetuar a requisição PUT",
          life: 5000,
        });
      }
      console.error("Erro ao efetuar a requisição PUT");
      console.error(e);
      return false;
    }
  } else {
    try {
      response = await postEntityData(apiResource, JSON.stringify(formData));
    } catch (e) {
      if ($toast) {
        $toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao efetuar a requisição POST",
          life: 5000,
        });
      }
      console.error("Erro ao efetuar a requisição POST");
      console.error(e);
    }
  }

  if (response?.status && [200, 201].includes(response.status)) {
    formData = response.data;
    if (fnAfterGet) {
      formData = fnAfterGet(formData);
    }

    if (setUrlId) {
      window.history.pushState("form", "id", `?id=${formData.id}`);
    }
    if ($toast) {
      $toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Registro salvo com sucesso",
        life: 5000,
      });
    }
    $store.commit(commitFormData, formData);
    return true;
  }
  // else...

  const errMsg = response.data["hydra:description"] || "Ocorreu um erro ao salvar!";

  console.error("Ocorreu um erro salvar!");

  if ($toast) {
    $toast.add({
      severity: "error",
      summary: "Erro",
      detail: errMsg,
      life: 5000,
    });
  }
  return false;
}
