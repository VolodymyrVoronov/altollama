import ModeToggle from "./ModeToggle";

import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <img src={logo} alt="AltLlama logo" className="size-8" />

        <span className="text-muted-foreground font-mono text-xl font-semibold">
          Alt'Ollama
        </span>
      </div>

      <ModeToggle />
    </header>
  );
};

export default Header;
