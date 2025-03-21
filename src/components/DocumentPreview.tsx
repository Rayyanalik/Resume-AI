
import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneratedContent } from './JobDetailsForm';
import { exportToPdf } from '@/utils/pdfGenerator';
import { cn } from '@/lib/utils';
import { toast } from "@/components/ui/use-toast";

interface DocumentPreviewProps {
  content: GeneratedContent;
  templateStyle: string;
}

const DocumentPreview = ({ content, templateStyle }: DocumentPreviewProps) => {
  const documentRef = useRef<HTMLDivElement>(null);
  
  const handleExport = async () => {
    if (!documentRef.current) return;
    
    try {
      await exportToPdf(documentRef.current, 'document');
      toast({
        title: "Success!",
        description: "Your document has been exported as PDF.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting your document.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto preview-container">
      <Tabs defaultValue="resume" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
          </TabsList>
          
          <Button onClick={handleExport} className="btn-hover-effect">
            Export PDF
          </Button>
        </div>
        
        <Card className="overflow-hidden bg-white shadow-md border border-border">
          <div ref={documentRef} className="p-8 min-h-[70vh] overflow-auto">
            <TabsContent value="resume">
              <div className={cn("transition-all duration-300", getTemplateClass(templateStyle))}>
                {content.resumeContent ? (
                  <div dangerouslySetInnerHTML={{ __html: content.resumeContent }} />
                ) : (
                  <DocumentPlaceholder type="resume" />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="coverLetter">
              <div className={cn("transition-all duration-300", getTemplateClass(templateStyle))}>
                {content.coverLetterContent ? (
                  <div dangerouslySetInnerHTML={{ __html: content.coverLetterContent }} />
                ) : (
                  <DocumentPlaceholder type="cover letter" />
                )}
              </div>
            </TabsContent>
          </div>
        </Card>
      </Tabs>
    </div>
  );
};

const DocumentPlaceholder = ({ type }: { type: string }) => (
  <div className="flex flex-col items-center justify-center h-full py-20">
    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-muted-foreground"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
    <h3 className="text-xl font-medium text-foreground mb-2">No {type} generated yet</h3>
    <p className="text-muted-foreground text-center max-w-sm">
      Fill out the form and click "Generate" to create your {type}.
    </p>
  </div>
);

// Template styling based on selected template
const getTemplateClass = (template: string) => {
  switch (template) {
    case 'minimal':
      return 'font-sans';
    case 'professional':
      return 'font-serif';
    case 'creative':
      return 'font-sans';
    default:
      return 'font-sans';
  }
};

export default DocumentPreview;
