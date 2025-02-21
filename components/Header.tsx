"use client";
import { useTheme } from "@/context/ThemeContext";
import GitHubLogo from "@/components/GitHubLogo";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-gray-800 p-4 shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <GitHubLogo className="w-8 h-8" />
        </Link>
        <button onClick={toggleDarkMode} className="text-white flex items-center gap-2">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
