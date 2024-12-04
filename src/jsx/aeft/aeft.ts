export const RunScript = (filepath: string) => {
  const res = $.evalFile(new File(filepath));
  return res;
};

export const getExtensionFolderPath = () => {
  var extensionFolder = Folder($.fileName).parent.parent;
  return extensionFolder.fsName;
};
