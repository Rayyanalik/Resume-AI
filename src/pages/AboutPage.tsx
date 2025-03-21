
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-5xl pt-28 pb-16 px-4 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">About Resumé AI</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Craft the perfect resume and cover letter in minutes with our AI-powered tools.
          </p>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                  <div className="h-2 bg-primary"></div>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Why Choose Resumé AI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="bg-secondary rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of job seekers who have used Resumé AI to land their dream jobs.
            </p>
            <Link to="/">
              <Button size="lg" className="btn-hover-effect">
                Create Your Resume Now
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

const steps = [
  {
    title: "Input Your Details",
    description: "Fill in your personal information, skills, experience, and the job you're applying for."
  },
  {
    title: "AI Generation",
    description: "Our AI analyzes the job description and your information to create tailored content."
  },
  {
    title: "Export & Apply",
    description: "Export your polished resume and cover letter as a PDF and start applying with confidence."
  }
];

const features = [
  {
    title: "AI-Powered Content",
    description: "Our AI creates tailored content that highlights your strengths for each specific job.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
  },
  {
    title: "Professional Templates",
    description: "Choose from a variety of elegant, recruiter-approved templates for your documents.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>
  },
  {
    title: "Time-Saving",
    description: "Create both a resume and cover letter in minutes instead of hours or days.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  },
  {
    title: "One-Click Export",
    description: "Easily export your documents as PDFs ready to be submitted to employers.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13"/><path d="m5 10 7 7 7-7"/><path d="M5 21h14"/></svg>
  }
];

export default AboutPage;
