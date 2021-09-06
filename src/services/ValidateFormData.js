export function validateFormData({ $store, formDataStateName, schemaValidator, $toast = null }) {
  const formData = $store.state[formDataStateName];
  const commitFormErrors = `set${formDataStateName
    .charAt(0)
    .toUpperCase()}${formDataStateName.slice(1)}Errors`;
  try {
    $store.commit(commitFormErrors, {});
    schemaValidator.validateSync(formData, { abortEarly: false });
  } catch (err) {
    if (err?.inner) {
      console.log(err);
      const formErrors = {};

      err.inner?.forEach((element) => {
        if (element?.path) {
          console.log(`elementpath: ${element.path}`);
          const msg = element.message || "Valor inválido";
          formErrors[element.path] = msg;
          console.error(msg);
        }
      });
      $store.commit(commitFormErrors, formErrors);
    } else {
      const msgGl = err?.inner || "Erro ao validar dados";
      if ($toast) {
        $toast.add({
          severity: "error",
          summary: "Erro",
          detail: msgGl,
          life: 5000,
        });
      } else {
        console.error(msgGl);
      }
    }
    return false;
  }
  return true;
}
