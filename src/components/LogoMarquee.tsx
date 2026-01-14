const LogoMarquee = () => {
  const logos = [
    { name: "Astro", icon: "⚡" },
    { name: "DaisyUI", icon: "🌼" },
    { name: "Laravel", icon: "🔺" },
    { name: "Nuxt", icon: "💚" },
    { name: "React", icon: "⚛️" },
    { name: "TailwindCSS", icon: "🎨" },
  ];

  return (
    <section className="py-16 border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-sm font-medium text-muted-foreground mb-10 uppercase tracking-wider">
          Trusted by companies at
        </h2>
        
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-4 flex-shrink-0"
              >
                <span className="text-2xl">{logo.icon}</span>
                <span className="text-lg font-medium text-muted-foreground whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
