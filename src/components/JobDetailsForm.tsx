
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { generateContent } from '@/utils/openai';

interface JobDetailsFormProps {
  onGenerate: (data: GeneratedContent) => void;
  setLoading: (loading: boolean) => void;
}

export interface JobDetails {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  skills: string;
  experience: string;
  education: string;
  jobDescription: string;
}

export interface GeneratedContent {
  resumeContent: string;
  coverLetterContent: string;
}

const JobDetailsForm = ({ onGenerate, setLoading }: JobDetailsFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<JobDetails>({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    skills: '',
    experience: '',
    education: '',
    jobDescription: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.jobTitle || !formData.skills || !formData.jobDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const generatedContent = await generateContent(formData);
      onGenerate(generatedContent);
      toast({
        title: "Content generated!",
        description: "Your resume and cover letter have been created.",
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation failed",
        description: "There was a problem generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Simple animation when changing tabs
    const formElement = document.getElementById('job-details-form');
    if (formElement) {
      formElement.classList.add('opacity-0');
      setTimeout(() => {
        formElement.classList.remove('opacity-0');
      }, 50);
    }
  };

  return (
    <Card className="glass-card w-full max-w-xl mx-auto overflow-hidden animate-blur-in">
      <Tabs defaultValue="personal" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="job">Job Details</TabsTrigger>
        </TabsList>
        
        <form id="job-details-form" onSubmit={handleSubmit} className="transition-opacity duration-200 ease-in-out">
          <CardContent className="p-6">
            <TabsContent value="personal" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <Button 
                type="button" 
                onClick={() => handleTabChange("experience")}
                className="w-full mt-4"
              >
                Next
              </Button>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="JavaScript, React, UI/UX Design, etc."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Work Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Senior Developer at XYZ Corp (2018-2022), etc."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="BS in Computer Science, University of Example (2014-2018)"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleTabChange("personal")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={() => handleTabChange("job")}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="job" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Frontend Developer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Acme Inc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Paste the job description here..."
                  rows={5}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleTabChange("experience")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Generate
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </form>
      </Tabs>
    </Card>
  );
};

export default JobDetailsForm;
