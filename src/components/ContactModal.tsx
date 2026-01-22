import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Contact Us</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
          <Mail className="w-5 h-5 text-primary" />
          <a 
            href="mailto:officialnovadesk@gmail.com" 
            className="text-foreground hover:text-primary transition-colors"
          >
            officialnovadesk@gmail.com
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
