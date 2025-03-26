export type Argv = {
  s?: string;
  t?: string;
  lang?: 'ru' | 'eng',
  h?: boolean;
}

const getArgs = (args: NodeJS.Process["argv"]) => {
  const res : any = {};
  const [executor, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.startsWith("-")) {
      // команда встретилась
      if (index == array.length - 1) {
        // это команда без значения
        res[value.substring(1)] = true;
      } else if (!array[index + 1].startsWith("-")) {
        // это команда с одним значением
        res[value.substring(1)] = array[index + 1];
      } else {
        // это команда без значения
        res[value.substring(1)] = true;
      }
    }
  });

  return res;
};

export { getArgs };

