import React from 'react';

import generateStore from './redux/index'
import { Provider } from 'react-redux'
import { Main } from './Main';
import * as Localization from 'expo-localization';

import { LanguageProvider } from 'react-native-translation'
const locale = Localization.locale
const store = generateStore();
const App = () => {
  return (<LanguageProvider language={locale}><Provider store={store}><Main /></Provider></LanguageProvider>
  );
}
export default App;