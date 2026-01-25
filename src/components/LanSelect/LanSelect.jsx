import React from 'react'
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./lanselect.css"

export function LanSelect() {

    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        setOpen(false);
    };

    return (
        <div>
            {/* trigger */}
            <div className='lan-select' onClick={() => setOpen(!open)}>
                {i18n.language.toUpperCase()}
                {open && (
                    <div className='lan-select__dropDown'>
                        <div onClick={() => changeLang("uz")}>UZ</div>
                        <div onClick={() => changeLang("en")}>EN</div>
                        <div onClick={() => changeLang("ru")}>RU</div>
                    </div>
                )}
            </div>


        </div>
    )
}
