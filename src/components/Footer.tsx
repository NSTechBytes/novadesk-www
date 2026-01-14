const Footer = () => {
  return (
    <footer className="py-6 px-4">
      <div className="max-w-5xl mx-auto glass rounded-2xl px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground font-bold tracking-tight">Novadesk</p>
          <p className="text-muted-foreground text-sm">
            © 2024 Novadesk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;