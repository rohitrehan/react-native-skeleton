import { IAppLanguage, LanguageKey, languages } from "../core/languages";
import { IAppConfig } from "../interfaces/IAppConfig";
import { selectConfig } from "../store/configSlice";
import { useAppSelector } from "../store/hook";

const useLanguage = (): IAppLanguage => {
  const config: IAppConfig = useAppSelector(selectConfig);

  return languages[config.language];
};

export default useLanguage;
