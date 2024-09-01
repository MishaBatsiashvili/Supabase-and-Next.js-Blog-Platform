function formDataToObject(formData: FormData) {
  const object: Record<any, any> = {};
  formData.forEach((value, key) => {
    // If the key already exists in the object
    if (key in object) {
      // If it's not an array, convert it to an array
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      // Add the new value to the array
      object[key].push(value);
    } else {
      // If the key does not exist, simply add the value
      object[key] = value;
    }
  });
  return object;
}

export default formDataToObject;
