import {AppTheme} from '../config/DefaultConfig';
import {defaultTheme, ThemeKey, themes} from '../config/themes';
import {useAppSelector} from '../store';
import {selectTheme} from '../store/reducers/config';

const useTheme = (): AppTheme => {
  const selectedTheme: ThemeKey = useAppSelector(selectTheme);

  const theme = themes[selectedTheme];
  // const theme = themes[ThemeKey.dark];

  return theme !== undefined ? theme : defaultTheme;
};

export default useTheme;
