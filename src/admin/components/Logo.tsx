import React from "react";

/**
 * Logo de marca para la pantalla de login del backoffice.
 * Chip negro con el wordmark blanco → se ve bien en tema claro u oscuro.
 */
export function Logo() {
  return (
    <div className="sfv-logo sfv-logo--login">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-white.png" alt="Salt Frame Visuals" />
    </div>
  );
}

export default Logo;
