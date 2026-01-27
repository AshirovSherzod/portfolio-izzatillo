import React from 'react'
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import "./lanselect.css"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import ReactCountryFlag from 'react-country-flag';

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
            <div className='lan-select' onClick={() => setOpen(!open)}>
                <div className="lan-select__inner">
                    <span>
                        <FiGlobe />
                    </span>
                    {i18n.language.toUpperCase()}
                    {open && (
                        <div className='lan-select__dropDown'>
                            <div onClick={() => changeLang("uz")}>
                                <span>
                                    <ReactCountryFlag
                                        countryCode="UZ"
                                        svg
                                        style={{
                                            width: "22px",
                                            height: "18px",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </span> UZ</div>
                            <div onClick={() => changeLang("en")}>
                                <span>
                                    <ReactCountryFlag
                                        countryCode="GB"
                                        svg
                                        style={{
                                            width: "22px",
                                            height: "18px",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </span>
                                EN</div>
                            <div onClick={() => changeLang("ru")}>
                                <span>
                                    <ReactCountryFlag
                                        countryCode="RU"
                                        svg
                                        style={{
                                            width: "22px",
                                            height: "18px",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </span>
                                RU</div>
                        </div>
                    )}
                    <div className="arrow">
                        {
                            open ?
                                <MdKeyboardArrowDown />
                                :
                                <MdKeyboardArrowRight />

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
