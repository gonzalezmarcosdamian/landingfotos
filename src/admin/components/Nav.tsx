"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "@payloadcms/ui";
import {
  LayoutGrid,
  Images,
  Tags,
  FolderOpen,
  FileText,
  Users,
  Settings,
  Globe,
  LogOut,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://saltframevisuals.com";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** match exacto (para Inicio); por defecto usa startsWith */
  exact?: boolean;
}
interface NavGroupDef {
  label: string;
  items: NavItem[];
}

const GROUPS: NavGroupDef[] = [
  {
    label: "Portfolio",
    items: [
      { label: "Publicaciones", href: "/admin/collections/projects", icon: Images },
      { label: "Categorías", href: "/admin/collections/categories", icon: Tags },
    ],
  },
  {
    label: "Biblioteca",
    items: [{ label: "Fotos y videos", href: "/admin/collections/media", icon: FolderOpen }],
  },
  {
    label: "Sitio",
    items: [{ label: "Textos del sitio", href: "/admin/globals/site-settings", icon: FileText }],
  },
  {
    label: "Cuenta",
    items: [
      { label: "Usuarios", href: "/admin/collections/users", icon: Users },
      { label: "Mi cuenta", href: "/admin/account", icon: Settings },
    ],
  },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function Nav() {
  const pathname = usePathname() || "/admin";
  const { navOpen, navRef, shouldAnimate, hydrated, setNavOpen } = useNav();

  const asideClass = [
    "nav",
    navOpen && "nav--nav-open",
    shouldAnimate && "nav--nav-animate",
    hydrated && "nav--nav-hydrated",
  ]
    .filter(Boolean)
    .join(" ");

  const close = () => setNavOpen(false);

  const homeActive = pathname === "/admin";

  return (
    <aside className={asideClass}>
      <div className="nav__scroll" ref={navRef}>
        <div className="sfvnav">
          <Link href="/admin" className="sfvnav__brand" onClick={close} aria-label="Salt Frame Visuals — Inicio">
            <span className="sfvnav__brand-main">SALT FRAME</span>
            <span className="sfvnav__brand-sub">VISUALS</span>
          </Link>

          <Link
            href="/admin"
            onClick={close}
            className={`sfvnav__link${homeActive ? " is-active" : ""}`}
            aria-current={homeActive ? "page" : undefined}
          >
            <LayoutGrid size={18} aria-hidden />
            <span>Inicio</span>
          </Link>

          {GROUPS.map((group) => (
            <div className="sfvnav__group" key={group.label}>
              <span className="sfvnav__grouplabel">{group.label}</span>
              {group.items.map((item) => {
                const active = isActive(pathname, item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`sfvnav__link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={18} aria-hidden />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="sfvnav__footer">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="sfvnav__link sfvnav__link--ghost"
            >
              <Globe size={18} aria-hidden />
              <span>Ver mi sitio</span>
            </a>
            <Link href="/admin/logout" onClick={close} className="sfvnav__link sfvnav__link--ghost">
              <LogOut size={18} aria-hidden />
              <span>Cerrar sesión</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Nav;
