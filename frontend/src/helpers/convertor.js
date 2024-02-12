// method to convert object into FormData and as well as append provided Image files
export const convertToFormData = (data, files) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  Object.entries(files).forEach(([name, file]) => {
    formData.append(name, file);
  });
  return formData;
};
