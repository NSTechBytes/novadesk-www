import { Button } from "@/components/ui/button";
import { Clock, Calendar, Cloud, Music, Battery, Wifi, Sun, Gauge } from "lucide-react";
import heroBackground from "@/assets/hero-background.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
      </div>

      {/* Floating Widget Icons */}
      <div className="absolute top-32 right-20 opacity-20 animate-float hidden lg:block">
        <Clock className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-48 right-48 opacity-15 animate-float hidden lg:block" style={{ animationDelay: "0.5s" }}>
        <Calendar className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute top-72 right-16 opacity-10 animate-float hidden lg:block" style={{ animationDelay: "1.5s" }}>
        <Cloud className="w-10 h-10 text-primary" />
      </div>
      <div className="absolute bottom-40 left-16 opacity-15 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
        <Music className="w-14 h-14 text-primary" />
      </div>
      <div className="absolute bottom-60 left-32 opacity-10 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <Battery className="w-10 h-10 text-primary" />
      </div>
      <div className="absolute top-40 left-20 opacity-15 animate-float hidden lg:block" style={{ animationDelay: "0.8s" }}>
        <Wifi className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute top-56 left-48 opacity-10 animate-float hidden md:block" style={{ animationDelay: "1.2s" }}>
        <Sun className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-32 right-40 opacity-15 animate-float hidden md:block" style={{ animationDelay: "1.8s" }}>
        <Gauge className="w-10 h-10 text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-32 pb-20">
        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="text-gradient">Novadesk</span>, New Era of{" "}
          <span className="text-gradient">Customization</span>
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          Create beautiful desktop widgets with ease and lot of possibilities
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Button variant="hero" size="lg">
            Download
          </Button>
          <Button variant="heroOutline" size="lg">
            Visit Docs
          </Button>
        </div>

        {/* Version */}
        <p
          className="text-sm text-muted-foreground mt-6 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          Version: 1.0.0 Beta
        </p>
      </div>
    </section>
  );
};

export default Hero;
