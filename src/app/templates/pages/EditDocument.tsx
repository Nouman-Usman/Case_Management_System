// pages/edit-document/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { templates } from '@/data/templates'; // Adjust path as needed
import { processTemplate, generatePDFFromMarkdown } from '@/utils/pdfUtils'; // Adjust path
import Header from '@/components/Header'; // Adjust path
import { ArrowLeft, Download, Plus, Trash2, Copy, MessageSquare, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const EditDocument = () => {
  const router = useRouter();
  const { id: templateId } = router.query; // Get the 'id' from the dynamic route

  const selectedTemplate = templates.find((template) => template.id === templateId);

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedContent, setGeneratedContent] = useState<string[]>(['']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [wordBalance, setWordBalance] = useState(1500);

  // Initialize form data based on template questions
  useEffect(() => {
    if (selectedTemplate?.questions) {
      const initialData = selectedTemplate.questions.reduce((acc, question) => {
        acc[question.question] = '';
        return acc;
      }, {} as Record<string, any>);

      setFormData(initialData);
      setDocumentTitle(selectedTemplate.title);
    }
  }, [selectedTemplate]);

  const handleInputChange = (question: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleGenerateDocument = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingRequiredFields = selectedTemplate?.questions
      ?.filter((q) => q.required && !formData[q.question])
      .map((q) => q.question);

    if (missingRequiredFields && missingRequiredFields.length > 0) {
      toast.error(`Please fill in the required fields: ${missingRequiredFields.join(', ')}`);
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (selectedTemplate?.template) {
        const processedContent = processTemplate(selectedTemplate.template, formData);
        setGeneratedContent([processedContent]);
      } else {
        let mockContent = '';
        switch (selectedTemplate?.id) {
          case 'employment-agreement':
            mockContent = generateMockEmploymentAgreement(formData);
            break;
          case 'rental-agreement':
            mockContent = generateMockRentalAgreement(formData);
            break;
          default:
            mockContent = `# ${selectedTemplate?.title || 'Generated Document'}\n\nThis is a sample document generated based on your inputs.\n\n`;
            Object.entries(formData).forEach(([key, value]) => {
              if (value) mockContent += `## ${key}\n${value}\n\n`;
            });
        }
        setGeneratedContent([mockContent]);
      }

      setWordBalance((prev) => Math.max(0, prev - 350));
      toast.success('Document generated successfully!');
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditContent = (index: number, newContent: string) => {
    setGeneratedContent((prev) => {
      const updated = [...prev];
      updated[index] = newContent;
      return updated;
    });
  };

  const handleAddPage = () => {
    setGeneratedContent((prev) => [...prev, '']);
    toast.success('New page added');
  };

  const handleDeletePage = (index: number) => {
    if (generatedContent.length <= 1) {
      toast.error('Cannot delete the only page');
      return;
    }
    setGeneratedContent((prev) => prev.filter((_, i) => i !== index));
    toast.success('Page deleted');
  };

  const handleDuplicatePage = (index: number) => {
    setGeneratedContent((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, prev[index]);
      return updated;
    });
    toast.success('Page duplicated');
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDFFromMarkdown(generatedContent, documentTitle);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF. Please try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Content copied to clipboard');
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground mb-8">The template you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/templates')}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Form */}
            <div className="md:w-1/3 lg:w-1/4 md:pr-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <button
                  onClick={() => router.push('/templates')}
                  className="inline-flex items-center mb-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Templates
                </button>

                <div className="paper mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-primary/10 rounded-full"></div>
                  <h1 className="text-xl font-bold mb-2">{selectedTemplate.title}</h1>
                  <p className="text-sm text-muted-foreground mb-4">{selectedTemplate.description}</p>

                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                      <span className="font-medium">Your Balance:</span>
                      <span className="ml-1 font-bold">{wordBalance} Words</span>
                    </div>
                    <div className="relative inline-block">
                      <select
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                        className="appearance-none bg-muted/50 rounded-md px-3 py-1 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleGenerateDocument} className="space-y-4">
                    {selectedTemplate.questions?.map((q, index) => (
                      <div key={index} className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          {q.question}
                          {q.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {q.type === 'string' && (
                          <input
                            type="text"
                            value={formData[q.question] || ''}
                            onChange={(e) => handleInputChange(q.question, e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-card shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            placeholder={`Enter ${q.question.toLowerCase()}`}
                          />
                        )}
                        {q.type === 'date' && (
                          <input
                            type="date"
                            value={formData[q.question] || ''}
                            onChange={(e) => handleInputChange(q.question, e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-card shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        )}
                        {q.type === 'number' && (
                          <input
                            type="number"
                            value={formData[q.question] || ''}
                            onChange={(e) => handleInputChange(q.question, e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-card shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            placeholder={`Enter ${q.question.toLowerCase()}`}
                          />
                        )}
                        {q.type === 'text' && (
                          <textarea
                            value={formData[q.question] || ''}
                            onChange={(e) => handleInputChange(q.question, e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-card shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            placeholder={`Enter ${q.question.toLowerCase()}`}
                            rows={3}
                          />
                        )}
                        {q.type === 'select' && q.options && (
                          <select
                            value={formData[q.question] || ''}
                            onChange={(e) => handleInputChange(q.question, e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-card shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          >
                            <option value="">Select an option</option>
                            {q.options.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <div className="flex items-center">
                            <span className="loading-dot"></span>
                            <span className="loading-dot"></span>
                            <span className="loading-dot"></span>
                          </div>
                          <span className="ml-2">Generating...</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Generate Document
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Document Preview */}
            <div className="md:w-2/3 lg:w-3/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="paper"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Document Preview</h2>
                    <p className="text-sm text-muted-foreground">Edit your document below</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAddPage}
                      className="p-2 rounded-md hover:bg-muted transition-colors"
                      title="Add page"
                    >
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="inline-flex items-center py-2 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-4">
                    <label htmlFor="documentTitle" className="block text-sm font-medium text-foreground mb-1">
                      Document Title
                    </label>
                    <input
                      id="documentTitle"
                      type="text"
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-card shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="space-y-6 mb-4 mt-6">
                    <AnimatePresence>
                      {generatedContent.map((content, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-muted-foreground">Page {index + 1}</div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => copyToClipboard(content)}
                                className="p-1 rounded-md hover:bg-muted transition-colors"
                                title="Copy content"
                              >
                                <Copy className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => handleDuplicatePage(index)}
                                className="p-1 rounded-md hover:bg-muted transition-colors"
                                title="Duplicate page"
                              >
                                <Plus className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => handleDeletePage(index)}
                                className="p-1 rounded-md hover:bg-muted transition-colors"
                                title="Delete page"
                                disabled={generatedContent.length <= 1}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                          <div
                            className="bg-white border rounded-lg shadow-sm p-6 min-h-[500px]"
                            style={{ aspectRatio: '1 / 1.4142' }}
                          >
                            <textarea
                              value={content}
                              onChange={(e) => handleEditContent(index, e.target.value)}
                              className="w-full h-full p-0 border-none focus:outline-none focus:ring-0 resize-none text-sm font-mono"
                              placeholder="Your document content will appear here..."
                            />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper functions remain the same
function generateMockEmploymentAgreement(formData: Record<string, any>) {
  return `# EMPLOYMENT AGREEMENT

This Employment Agreement (the "Agreement") is made and entered into on ${formData['Start Date'] || '[DATE]'}, by and between:

**Employer:** ${formData['Employer Name'] || '[EMPLOYER NAME]'}, with a principal place of business at ${formData['Employer Address'] || '[EMPLOYER ADDRESS]'} (the "Employer")

**Employee:** ${formData['Employee Name'] || '[EMPLOYEE NAME]'}, residing at ${formData['Employee Address'] || '[EMPLOYEE ADDRESS]'} (the "Employee")

## 1. POSITION AND DUTIES

The Employer agrees to employ the Employee as ${formData['Job Title'] || '[JOB TITLE]'}. The Employee agrees to perform all duties associated with this position as well as any other duties reasonably assigned by the Employer.

## 2. TERM OF EMPLOYMENT

This Agreement shall commence on ${formData['Start Date'] || '[START DATE]'} and continue until terminated in accordance with the provisions of this Agreement.

## 3. COMPENSATION

The Employer shall pay the Employee a base salary of $${formData['Salary'] || '[SALARY AMOUNT]'} per year, payable in accordance with the Employer's standard payroll schedule.

## 4. BENEFITS

The Employee shall be entitled to participate in any benefit plans offered by the Employer to its employees. The terms of the Employer's benefit plans shall govern the Employee's participation in any such plans.

## 5. TERMINATION

Either party may terminate this Agreement at any time by providing written notice to the other party in accordance with applicable law.

## 6. CONFIDENTIALITY

The Employee agrees to maintain the confidentiality of all proprietary information and trade secrets of the Employer, both during and after the term of this Agreement.

${formData['Additional Terms'] ? `## 7. ADDITIONAL TERMS\n\n${formData['Additional Terms']}` : ''}

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

EMPLOYER
By: __________________________
Name: ${formData['Employer Name'] || '[EMPLOYER NAME]'}
Title: _________________________

EMPLOYEE
By: __________________________
Name: ${formData['Employee Name'] || '[EMPLOYEE NAME]'}`;
}

function generateMockRentalAgreement(formData: Record<string, any>) {
  return `# RESIDENTIAL LEASE AGREEMENT

This Residential Lease Agreement (the "Agreement") is made and entered into on ${formData['Start Date'] || '[DATE]'}, by and between:

**Landlord:** ${formData['Landlord Name'] || '[LANDLORD NAME]'} ("Landlord")

**Tenant:** ${formData['Tenant Name'] || '[TENANT NAME]'} ("Tenant")

## 1. PREMISES

Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, the residential property located at:
${formData['Property Address'] || '[PROPERTY ADDRESS]'} (the "Premises").

## 2. TERM

The term of this Agreement shall begin on ${formData['Start Date'] || '[START DATE]'} and end on ${formData['End Date'] || '[END DATE]'}, for a total term of ${formData['Lease Term'] || '[LEASE TERM]'}.

## 3. RENT

Tenant agrees to pay Landlord rent in the amount of $${formData['Monthly Rent'] || '[RENT AMOUNT]'} per month, due on the 1st day of each month.

## 4. SECURITY DEPOSIT

Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of $${formData['Security Deposit'] || '[DEPOSIT AMOUNT]'} as a security deposit.

## 5. UTILITIES

Tenant shall be responsible for the payment of all utilities and services to the Premises, except for the following which shall be paid by Landlord: [LANDLORD-PAID UTILITIES].

## 6. USE OF PREMISES

The Premises shall be used solely as a residential dwelling. Tenant shall not use the Premises for any business or commercial purpose.

## 7. MAINTENANCE AND REPAIRS

Tenant shall maintain the Premises in a clean and sanitary condition and shall promptly notify Landlord of any needed repairs.

## 8. TERMINATION AND RENEWAL

Either party may terminate this Agreement at the end of the term by providing written notice at least 30 days prior to the end of the term. If no notice is provided, this Agreement shall automatically renew on a month-to-month basis.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

LANDLORD
By: __________________________
Name: ${formData['Landlord Name'] || '[LANDLORD NAME]'}

TENANT
By: __________________________
Name: ${formData['Tenant Name'] || '[TENANT NAME]'}`;
}

export default EditDocument;