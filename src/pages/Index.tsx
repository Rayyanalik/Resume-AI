
import { useState } from 'react';
import Header from '@/components/Header';
import JobDetailsForm, { GeneratedContent } from '@/components/JobDetailsForm';
import DocumentPreview from '@/components/DocumentPreview';
import TemplateSelector from '@/components/TemplateSelector';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const handleGenerate = (content: GeneratedContent) => {
    setGeneratedContent(content);
    setShowTemplateSelector(true);
    
    // Scroll to the template selector or preview after generation
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl pt-28 pb-16 px-4">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Create the perfect resume in minutes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Our AI-powered tool helps you craft a tailored resume and cover letter for any job application.
          </p>
        </section>
        
        {/* Form Section */}
        <section className="mb-16 form-container">
          <JobDetailsForm 
            onGenerate={handleGenerate} 
            setLoading={setLoading}
          />
        </section>
        
        {/* Results Section */}
        {(showTemplateSelector || generatedContent) && (
          <section id="results-section" className="space-y-12">
            {/* Template Selector */}
            {showTemplateSelector && (
              <div className="animate-scale-in">
                <TemplateSelector 
                  selectedTemplate={selectedTemplate} 
                  onSelectTemplate={setSelectedTemplate}
                />
              </div>
            )}
            
            {/* Document Preview */}
            {generatedContent && (
              <DocumentPreview 
                content={generatedContent} 
                templateStyle={selectedTemplate}
              />
            )}
          </section>
        )}
        
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium">Generating your content...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
