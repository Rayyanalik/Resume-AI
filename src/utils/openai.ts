import { JobDetails, GeneratedContent } from '@/components/JobDetailsForm';
import { toast } from "@/components/ui/use-toast";

// OpenAI API endpoint
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// IMPORTANT: In a production environment, this API key should be stored on a backend server
// and accessed through a secure API endpoint, never in the frontend code.
// This is just for demonstration purposes.
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // Replace with your actual API key

export const generateContent = async (jobDetails: JobDetails): Promise<GeneratedContent> => {
  console.log('Generating content with details:', jobDetails);
  
  try {
    toast({
      title: "Generating content",
      description: "Please wait while we generate your resume and cover letter...",
    });
    
    // Create the prompt for resume generation
    const resumePrompt = createResumePrompt(jobDetails);
    
    // Make API call to generate resume
    const resumeResponse = await callOpenAI(resumePrompt);
    const resumeContent = processResumeResponse(resumeResponse);
    
    // Create the prompt for cover letter generation
    const coverLetterPrompt = createCoverLetterPrompt(jobDetails);
    
    // Make API call to generate cover letter
    const coverLetterResponse = await callOpenAI(coverLetterPrompt);
    const coverLetterContent = processCoverLetterResponse(coverLetterResponse);
    
    return {
      resumeContent,
      coverLetterContent
    };
  } catch (error) {
    console.error('Error generating content:', error);
    toast({
      title: "Error",
      description: "Failed to generate content. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};

// Helper function to call OpenAI API
const callOpenAI = async (prompt: string): Promise<any> => {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume and cover letter writer with expertise in tailoring documents for job applications. Return only HTML code with no explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }
  
  return await response.json();
};

// Create prompt for resume generation
const createResumePrompt = (jobDetails: JobDetails): string => {
  return `
    Create a professional resume in HTML format for a ${jobDetails.jobTitle} position at ${jobDetails.company}.
    
    CANDIDATE INFORMATION:
    - Full Name: ${jobDetails.fullName}
    - Email: ${jobDetails.email}
    - Phone: ${jobDetails.phone}
    - Skills: ${jobDetails.skills}
    - Experience: ${jobDetails.experience || 'Not provided'}
    - Education: ${jobDetails.education || 'Not provided'}
    
    JOB DESCRIPTION:
    ${jobDetails.jobDescription}
    
    IMPORTANT FORMATTING GUIDELINES:
    - Return ONLY clean HTML with Tailwind CSS classes for styling
    - Create a professional, well-structured layout
    - Highlight skills that match the job description
    - Format the resume with appropriate sections (Summary, Skills, Experience, Education)
    - Use Tailwind classes for responsive design
    - Do not include any explanations, only return the HTML code
  `;
};

// Create prompt for cover letter generation
const createCoverLetterPrompt = (jobDetails: JobDetails): string => {
  return `
    Create a professional cover letter in HTML format for a ${jobDetails.jobTitle} position at ${jobDetails.company}.
    
    CANDIDATE INFORMATION:
    - Full Name: ${jobDetails.fullName}
    - Email: ${jobDetails.email}
    - Phone: ${jobDetails.phone}
    - Skills: ${jobDetails.skills}
    - Experience: ${jobDetails.experience || 'Not provided'}
    - Education: ${jobDetails.education || 'Not provided'}
    
    JOB DESCRIPTION:
    ${jobDetails.jobDescription}
    
    IMPORTANT FORMATTING GUIDELINES:
    - Return ONLY clean HTML with Tailwind CSS classes for styling
    - Create a professional, well-structured cover letter
    - Include today's date and proper salutation
    - Write 3-4 paragraphs highlighting relevant skills and expressing interest
    - Include a proper closing with the candidate's name
    - Use Tailwind classes for responsive design
    - Do not include any explanations, only return the HTML code
  `;
};

// Process the OpenAI response for resume
const processResumeResponse = (response: any): string => {
  try {
    const content = response.choices[0].message.content.trim();
    return content;
  } catch (error) {
    console.error('Error processing resume response:', error);
    return generateFallbackResumeContent();
  }
};

// Process the OpenAI response for cover letter
const processCoverLetterResponse = (response: any): string => {
  try {
    const content = response.choices[0].message.content.trim();
    return content;
  } catch (error) {
    console.error('Error processing cover letter response:', error);
    return generateFallbackCoverLetterContent();
  }
};

// Fallback resume content in case of API failure
const generateFallbackResumeContent = (): string => {
  return `
    <div class="max-w-2xl mx-auto p-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-wine-600">Error Generating Resume</h1>
        <p class="mt-2">We could not generate your resume with the OpenAI API. Please check your API key and try again.</p>
      </div>
    </div>
  `;
};

// Fallback cover letter content in case of API failure
const generateFallbackCoverLetterContent = (): string => {
  return `
    <div class="max-w-2xl mx-auto p-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-wine-600">Error Generating Cover Letter</h1>
        <p class="mt-2">We could not generate your cover letter with the OpenAI API. Please check your API key and try again.</p>
      </div>
    </div>
  `;
};
