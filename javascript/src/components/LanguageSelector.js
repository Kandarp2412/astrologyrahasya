// import { Button } from "@chakra-ui/react";
// import Button from "@material-ui/core/Button";

import React, { useContext } from "react";
// import AppContext from "../../context/Context";

import { languageOptions } from "./languages";
import { LanguageContext } from "./Language";
// import "../side-panel/sidepanel.css";
// import { LanguageContext } from "./Language";

export default function LanguageSelector() {
  // const { isDark } = useContext(AppContext);
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  // set selected language by calling context method
  const handleLanguageChange = (e) => {
    userLanguageChange(e.target.name);
    // console.log(e.target.name.length);
    console.log(userLanguage);
  };

  return (
    // <div>
    //   {Object.entries(languageOptions).map(([id, name]) => {
    //     return (
    //       <button
    //         className='btn'
    //         colorScheme='teal'
    //         size='xs'
    //         name={name.slice(0, 2).toLowerCase()}
    //         onClick={(e) => handleLanguageChange(e)}
    //         value={userLanguage}
    //         style={{
    //           marginBottom: "10px",
    //           WebkitAppearance: "none",
    //           MozAppearance: "none",
    //           border: "1px solid blue",
    //           backgroundColor:
    //             name.slice(0, 2).toLowerCase() === userLanguage
    //               ? "blue"
    //               : "white",
    //           color:
    //             name.slice(0, 2).toLowerCase() === userLanguage
    //               ? "white"
    //               : "blue",
    //           width: "170px",
    //         }}
    //       >
    //         {name}
    //       </button>
    //     );
    //   })}
    // </div>
    <select
      onChange={(e) => handleLanguageChange(e)}
      value={userLanguage}
      style={{
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundColor: "transparent",
        // color: isDark ? "white" : "black",
        width: "177px",
      }}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

{
  /* <div>
      {Object.entries(languageOptions).map(([id, name]) => {
        return (
          <Button
            name={name}
            onClick={(e) => handleLanguageChange(e)}
            value={userLanguage}
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              backgroundColor: "transparent",
              color: isDark ? "white" : "black",
              width: "177px",
            }}
          >
            {name}
          </Button>
        );
      })}
    </div> */
}
