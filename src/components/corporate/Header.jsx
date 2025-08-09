// src/components/corporate/Header.jsx
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoImage from "../../assets/Flyinco.png";

const flags = {
  AED: (
    <svg className="h-4 w-4 sm:mr-2" viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#00732f" d="M0 0h640v160H0z" />
      <path fill="#000" d="M0 320h640v160H0z" />
      <path fill="#d90012" d="M0 0h213.3v480H0z" />
    </svg>
  ),
  INR: (
    <svg className="h-4 w-4 sm:mr-2" viewBox="0 0 640 480">
      <path fill="#f93" d="M0 0h640v160H0z" />
      <path fill="#fff" d="M0 160h640v160H0z" />
      <path fill="#128807" d="M0 320h640v160H0z" />
      <circle cx="320" cy="240" r="40" fill="#000088" />
      <circle cx="320" cy="240" r="36" fill="#fff" />
    </svg>
  ),
  SAR: (
    <svg className="h-4 w-4 sm:mr-2" viewBox="0 0 640 480">
      <path fill="#006c35" d="M0 0h640v480H0z" />
      <path
        d="M182 188h13v-14h-13v-9h-14v9h-13v14h13v8h14v-8zm77-24c0 8-3 15-7 21l-18-18 18-18c4 6 7 13 7 21z"
        fill="#fff"
      />
    </svg>
  ),
};

export default function Header() {
  const [currency, setCurrency] = useState("AED");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Branding */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg"
          style={{ color: "#2C1D74", fontFamily: "'Playfair Display', serif" }}
        >
          <img src={LogoImage} alt="Flyinco Logo" className="h-8 w-18" />
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Currency Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {flags[currency]}
                <span className="hidden sm:inline">{currency}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(flags).map(([code, flagSvg]) => (
                <DropdownMenuItem
                  key={code}
                  onSelect={() => handleCurrencyChange(code)}
                  className="flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {flagSvg}
                  {code}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sign In Button */}
          <Button
            className="bg-[#2C1D74] hover:bg-[#241661] border border-[#2C1D74] text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <User className="h-4 w-4 md:mr-2 text-white" />
            <span className="hidden md:inline">Sign In</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
