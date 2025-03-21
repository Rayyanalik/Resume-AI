
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design',
    thumbnail: '/minimal-template.png',
    color: 'bg-blue-50'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional corporate style',
    thumbnail: '/professional-template.png',
    color: 'bg-gray-50'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern and distinctive',
    thumbnail: '/creative-template.png',
    color: 'bg-amber-50'
  }
];

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-medium mb-4">Choose a template</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onSelectTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    color: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard = ({ template, isSelected, onSelect }: TemplateCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <Card 
      className={cn(
        "template-card",
        isSelected && "active"
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className={cn(
          "aspect-[210/297] w-full transition-transform duration-500",
          template.color,
          isHovering && "scale-105"
        )}
      >
        {/* Template placeholder */}
        <div className="h-full flex flex-col p-4">
          <div className="h-8 w-full bg-white/60 rounded mb-3"></div>
          <div className="flex gap-3 mb-3">
            <div className="w-1/3 h-3 bg-white/60 rounded"></div>
            <div className="w-1/3 h-3 bg-white/60 rounded"></div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full h-2 bg-white/60 rounded"></div>
            <div className="w-5/6 h-2 bg-white/60 rounded"></div>
            <div className="w-4/5 h-2 bg-white/60 rounded"></div>
            <div className="w-full h-2 bg-white/60 rounded"></div>
            <div className="w-3/4 h-2 bg-white/60 rounded"></div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium">{template.name}</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
