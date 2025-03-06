import { homedir } from "os";
import { basename, join } from "path";

const filePath = join(homedir(), "weather_data.json");
const saveKeyValue = (key, value) => {
  console.log(basename(filePath));
};

export { saveKeyValue };
