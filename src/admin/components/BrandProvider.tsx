"use client";

import React from "react";
import "./brand.css";

/**
 * Provider que inyecta los estilos de marca de Salt Frame en todo el admin.
 * No altera la lógica: sólo carga el CSS y renderiza los hijos.
 */
export function BrandProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default BrandProvider;
