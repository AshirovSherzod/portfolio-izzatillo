import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  scrollToSection,
  setPendingSection,
  type SectionId,
} from "../lib/sections";

/**
 * Bo'limga o'tish. Bosh sahifada bo'lsak — shunchaki scroll qiladi.
 * Boshqa sahifada bo'lsak — bosh sahifaga o'tadi, scroll'ni ScrollManager bajaradi.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: SectionId) => {
      if (pathname === "/") {
        scrollToSection(id);
        return;
      }
      setPendingSection(id);
      navigate("/");
    },
    [navigate, pathname],
  );
}
