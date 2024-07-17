import {
  AppLanguage,
  defaultLanguage,
  LanguageKey,
  languages,
} from '../config/languages';
import {useAppSelector} from '../store';

const useLanguage = (): AppLanguage => {
  const selectedLanguage: LanguageKey = useAppSelector(s => s.config.language);

  return languages[selectedLanguage] || defaultLanguage;
};

export default useLanguage;
