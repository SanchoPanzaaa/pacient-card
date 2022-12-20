export interface InterfaceKeyValue<T> {
  label: keyof T,
  value: T[keyof T]
};
