import TemplateCard from "./TemplateCard";
import { Button } from "@/components/ui/button";

const Templates = () => {
  const templates = [
    {
      title: "Aboutial",
      description: "A simple Nuxt content about page template with social network layouts",
      price: "Free",
      tags: ["Portfolio", "About Page"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
    },
    {
      title: "Mary UI Starter Kit",
      description: "Mary UI Laravel Starter Kit with dashboard and SaaS features",
      price: "Free",
      tags: ["Laravel", "Dashboard", "SaaS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    },
    {
      title: "Bloomfolio",
      description: "Astro portfolio template with Daisy UI components",
      price: "Free",
      tags: ["About Page", "Portfolio"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop",
    },
    {
      title: "MacOS Template",
      description: "I drew inspiration from the MacOS desktop interface to create this template",
      price: "Free",
      tags: ["Portfolio", "Projects"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
    },
    {
      title: "SaaS Marketing",
      description: "Professional landing page for SaaS products with pricing tables and feature highlights",
      price: "$29.99",
      tags: ["Landing Page", "SaaS"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    },
    {
      title: "Knowledge Base",
      description: "Grav Theme for Knowledge Base and Documentation",
      price: "Free",
      tags: ["Knowledge Base", "Documentation"],
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=800&h=500&fit=crop",
    },
  ];

  return (
    <section id="templates" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of premium templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={template.title}
              {...template}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Templates;
