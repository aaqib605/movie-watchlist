import { ReactNode } from "react";

import Logo from "./Logo";

interface NavbarProps {
  children: ReactNode;
}

export default function NavBar({ children }: NavbarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
