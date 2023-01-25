import { FormGroup } from "@angular/forms";

export function generateId(): string {
    let id = "";
    // Can't use map as it returns another Uint8Array instead of array
    // of strings.
    for (const byte of crypto.getRandomValues(new Uint8Array(8))) {
        id += byte.toString(16);
    }
    return id;
}

export function updateModel<T extends object>(
  obj: T, key: string, value: T[Extract<keyof T, string>]): T {
    for (const k in obj) {
        if (k === key) {
            obj[k] = value;
            return obj;
        }
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            updateModel(obj[k] as T, key, value);
        }
    }
    return obj;
}

export function setFormByModelProperties<T>(obj: T, valueKey: string, form: FormGroup) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {

      if(obj[prop] && typeof obj[prop] === 'object') {
        setFormByModelProperties(obj[prop], valueKey, form)
      } else {
        if(prop === valueKey) {
          form.controls[valueKey].setValue(prop)
        }
      }
    }
  }
}

export function createPropertyTree<T extends object>(model: T) {
  return Object.keys(model);
}
