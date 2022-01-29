export function getDataUrl(file: Blob) {
  return new Promise<string>(res => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', ev => {
      res(reader.result as string);
    });
  });
}
