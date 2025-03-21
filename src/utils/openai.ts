
import { JobDetails, GeneratedContent } from '@/components/JobDetailsForm';
import { toast } from "@/components/ui/use-toast";

// This is a mock implementation since we don't have a real API key
// In a real app, you would connect to OpenAI's API
export const generateContent = async (jobDetails: JobDetails): Promise<GeneratedContent> => {
  console.log('Generating content with details:', jobDetails);
  
  // Add a delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // This would be an actual API call in a production app
    // For now, we'll just generate mock content
    
    // Generate resume content
    const resumeContent = generateMockResumeContent(jobDetails);
    
    // Generate cover letter content
    const coverLetterContent = generateMockCoverLetterContent(jobDetails);
    
    return {
      resumeContent,
      coverLetterContent
    };
  } catch (error) {
    console.error('Error generating content:', error);
    toast({
      title: "Error",
      description: "Failed to generate content. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

// Mock function to generate resume content
const generateMockResumeContent = (jobDetails: JobDetails): string => {
  return `
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold">${jobDetails.fullName}</h1>
        <div class="mt-1 text-gray-600">
          ${jobDetails.email} | ${jobDetails.phone}
        </div>
      </div>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold border-b pb-2 mb-2">Professional Summary</h2>
        <p>
          Dynamic ${jobDetails.jobTitle} with extensive experience in developing innovative solutions.
          Seeking to leverage my skills in ${jobDetails.skills} to contribute to the success of ${jobDetails.company}.
        </p>
      </div>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold border-b pb-2 mb-2">Skills</h2>
        <ul class="list-disc pl-5 space-y-1">
          ${jobDetails.skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('')}
        </ul>
      </div>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold border-b pb-2 mb-2">Experience</h2>
        <div>
          ${jobDetails.experience ? jobDetails.experience : 'Senior Developer, XYZ Corporation (2018-2022)'}
          <p class="mt-1">
            Led development teams in creating scalable web applications. Improved system efficiency by 35%.
          </p>
        </div>
      </div>
      
      <div>
        <h2 class="text-xl font-semibold border-b pb-2 mb-2">Education</h2>
        <div>
          ${jobDetails.education ? jobDetails.education : 'BS in Computer Science, University of Technology (2014-2018)'}
        </div>
      </div>
    </div>
  `;
};

// Mock function to generate cover letter content
const generateMockCoverLetterContent = (jobDetails: JobDetails): string => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="max-w-2xl mx-auto">
      <div class="text-right mb-8">
        <p>${today}</p>
      </div>
      
      <div class="mb-8">
        <p class="font-semibold">Hiring Manager</p>
        <p>${jobDetails.company}</p>
      </div>
      
      <div class="mb-4">
        <p>Dear Hiring Manager,</p>
      </div>
      
      <div class="space-y-4">
        <p>
          I am writing to express my interest in the ${jobDetails.jobTitle} position at ${jobDetails.company}.
          With my background in ${jobDetails.skills}, I am confident in my ability to make a valuable contribution to your team.
        </p>
        
        <p>
          Throughout my career, I have focused on developing ${jobDetails.skills.split(',')[0]} skills and applying them to 
          ${jobDetails.experience ? 'my roles at ' + jobDetails.experience : 'various projects'}.
          I am particularly drawn to the opportunity at ${jobDetails.company} because of your reputation for innovation and excellence.
        </p>
        
        <p>
          I am excited about the possibility of bringing my expertise to ${jobDetails.company} and would welcome the opportunity
          to discuss how my background and skills would be a good fit for the ${jobDetails.jobTitle} role.
        </p>
      </div>
      
      <div class="mt-8">
        <p>Sincerely,</p>
        <p class="mt-4 font-semibold">${jobDetails.fullName}</p>
        <p>${jobDetails.email}</p>
        <p>${jobDetails.phone}</p>
      </div>
    </div>
  `;
};

// In a real application, you would implement an actual API call to OpenAI:
/*
const actualGenerateContent = async (jobDetails: JobDetails): Promise<GeneratedContent> => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  const prompt = `
    Create a professional resume and cover letter for a ${jobDetails.jobTitle} position at ${jobDetails.company}.
    
    Full Name: ${jobDetails.fullName}
    Email: ${jobDetails.email}
    Phone: ${jobDetails.phone}
    
    Skills: ${jobDetails.skills}
    Experience: ${jobDetails.experience}
    Education: ${jobDetails.education}
    
    Job Description: ${jobDetails.jobDescription}
    
    Format the resume and cover letter in well-structured HTML.
  `;
  
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      prompt,
      max_tokens: 2000,
      temperature: 0.7
    })
  });
  
  const data = await response.json();
  
  // Parse the response and extract resume and cover letter content
  // This is simplified and would need proper parsing in a real app
  const content = data.choices[0].text;
  const [resumeContent, coverLetterContent] = content.split('---COVER LETTER---');
  
  return {
    resumeContent,
    coverLetterContent
  };
}
*/
