export async function SetFocus(componentId, tMax = 20) {
  for (let t = 0; t < tMax; t++) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 100));
    console.info(`${t}) tentando focar no ${componentId}`);
    document.getElementById(componentId).focus();
    if (document.activeElement.id === componentId) {
      break;
    }
  }
}
