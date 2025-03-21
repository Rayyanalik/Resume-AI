
import { toast } from "@/components/ui/use-toast";
import html2pdf from 'html2pdf.js';

export const exportToPdf = async (element: HTMLElement, filename: string): Promise<void> => {
  console.log('Exporting element to PDF:', element);
  
  try {
    // Set PDF export options
    const opt = {
      margin: 1,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Generate and save PDF
    await html2pdf().set(opt).from(element).save();
    
    console.log(`PDF '${filename}.pdf' generated successfully`);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast({
      title: "PDF Export Failed",
      description: "There was a problem generating your PDF.",
      variant: "destructive",
    });
    return Promise.reject(error);
  }
};
