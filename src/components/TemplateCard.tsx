import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  title: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  delay?: number;
}

const TemplateCard = ({ title, description, price, tags, image, delay = 0 }: TemplateCardProps) => {
  const isFree = price === "Free";

  return (
    <div
      className="group relative glass rounded-2xl overflow-hidden animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image container with hover effect */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge
            variant={isFree ? "secondary" : "default"}
            className={isFree ? "bg-accent/20 text-accent border-0" : "bg-gradient-primary border-0"}
          >
            {price}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
