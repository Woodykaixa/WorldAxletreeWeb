export async function getFileInput(multiple: boolean = false) {
  return new Promise<File[]>(res => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.click();
    input.addEventListener('input', e => {
      const fileList = input.files;
      if (!fileList) {
        res([]);
      } else {
        const files = [] as File[];
        for (let i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }
        res(files);
      }
    });
  });
}
