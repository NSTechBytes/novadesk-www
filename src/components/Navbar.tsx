import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import ContactModal from "./ContactModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "Docs", href: "https://novadesk-docs.pages.dev/" },
    { name: "Contact", href: "#", isContact: true },
  ];

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.isContact) {
      e.preventDefault();
      setContactOpen(true);
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 px-4">
        <nav className="max-w-5xl mx-auto glass rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="https://novadesk.pages.dev/" className="text-xl font-bold text-foreground tracking-tight">
              Novadesk
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    link.active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* GitHub Icon */}
            <div className="hidden md:flex items-center gap-3">
              <a 
                href="https://github.com/Official-Novadesk/novadesk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pt-4 pb-2 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                      link.active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default Navbar;
