import React, { useState, createContext, useContext } from "react";

import { languageOptions, dictionaryList } from ".././components/languages";
import PropTypes from "prop-types";

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: "en",
  dictionary: dictionaryList.en,
});

// it provides the language context to app
export function LanguageProvider(props) {
  const { children } = props;
  console.log(children);
  const defaultLanguage = window.localStorage.getItem("rcml-lang");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "");

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (selected) => {
      const newLanguage = languageOptions[selected] ? selected : "en";
      setUserLanguage(newLanguage);
      window.localStorage.setItem("rcml-lang", newLanguage);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
      {/* {console.log(children)} */}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[tid] || tid;
}
