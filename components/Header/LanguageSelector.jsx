"use client";

import styles from "./CustomHeader.module.css";

// Imports
import { useState, useEffect } from "react";
import { useRouter , usePathname } from "next/navigation";

export function LanguageSelector({ dict }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeLanguage, setActiveLanguage] = useState(window.location.pathname.split("/")[1]);

  useEffect(() => {
    let currentLanguage = pathname.split("/")[1];
    if (activeLanguage !== currentLanguage) setActiveLanguage(currentLanguage);
  }, [pathname]);

  const handleChangeLanguage = (event) => {
    let selectedLanguage = event.target.value;
    if (selectedLanguage === activeLanguage) return;
    const urlWithoutLanguage = window.location.pathname
      .split("/")
      .slice(2)
      .join("/");
    router.push(selectedLanguage + "/" + urlWithoutLanguage);
  };

  const availableLanguages = ["en-US", "cat-ES", "es-ES"];

  const handleChangeColors = () => {
    /* Change from this root:
    --color-primary: #1D3557;
    --color-secondary: #457B9D;
    --color-tertiary: #A8DADC;
    --color-quaternary: #E63946;
    --color-quinary: #F1FAEE;

    --color-white: #fff;
    --navbar-hover: #D3E3FD;

    --color-hard-grey: #333;
    --color-grey: #848F9F;
    --color-low-grey: #ddd;

    --color-body: #F5F8FC;

    --box-shadow-color: rgba(0, 0, 0, 0.182);

    --color-success: #3dcf35;

    --white-filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(103%);

    --navbarWidth: 75px;

    --modal-background: rgba(0, 0, 0, 0.5);

    to a dark theme:
    */
    let root = document.documentElement;

  if (getComputedStyle(root).getPropertyValue("--color-primary").trim() === "#1D3557") {
    root.style.setProperty("--color-primary", "#FFF");
    root.style.setProperty("--color-secondary", "#A8DADC");
    root.style.setProperty("--color-tertiary", "#457B9D");
    root.style.setProperty("--color-quaternary", "#E63946");
    root.style.setProperty("--color-quinary", "#1D3557");

    root.style.setProperty("--color-white", "#1E2029");
    root.style.setProperty("--navbar-hover", "#1E2029");

    root.style.setProperty("--color-hard-grey", "#333");
    root.style.setProperty("--color-grey", "#848F9F");
    root.style.setProperty("--color-low-grey", "#ddd");

    root.style.setProperty("--color-body", "#17171F");

    root.style.setProperty("--box-shadow-color", "rgba(255, 255, 255, 0.182)");

    root.style.setProperty("--color-success", "#3dcf35");

    root.style.setProperty("--white-filter", "invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)");
    root.style.setProperty("--dark-filter", "invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(103%)");

    root.style.setProperty("--modal-background", "rgb(50 50 50 / 50%)");
  } else {
    root.style.setProperty("--color-primary", "#1D3557");
    root.style.setProperty("--color-secondary", "#457B9D");
    root.style.setProperty("--color-tertiary", "#A8DADC");
    root.style.setProperty("--color-quaternary", "#E63946");
    root.style.setProperty("--color-quinary", "#F1FAEE");

    root.style.setProperty("--color-white", "#fff");
    root.style.setProperty("--navbar-hover", "#D3E3FD");

    root.style.setProperty("--color-hard-grey", "#333");
    root.style.setProperty("--color-grey", "#848F9F");
    root.style.setProperty("--color-low-grey", "#ddd");

    root.style.setProperty("--color-body", "#F5F8FC");

    root.style.setProperty("--box-shadow-color", "rgba(0, 0, 0, 0.182)");

    root.style.setProperty("--color-success", "#3dcf35");

    root.style.setProperty("--white-filter", "invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(103%)");
    root.style.setProperty("--dark-filter", "invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)");

    root.style.setProperty("--modal-background", "rgba(0, 0, 0, 0.5)");
  }
}


  return (
    <div>
      <div className={styles.switchButton}>
          <input onChange={handleChangeColors} type="checkbox" name="switch-button" id="switch-label" className={styles.switchButtonCheckbox}/>
          <label for="switch-label" className={styles.switchButtonLabel}></label>
      </div>
      <span>{dict.header.language}:</span>
      <select onChange={(e) => handleChangeLanguage(e)} value={activeLanguage}>
        {availableLanguages.map((language, index) => {
          return (
            <option
              key={index}
              value={language}
            >
              {language}
            </option>
          );
        })}
      </select>
    </div>
  );
}
