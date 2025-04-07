
export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'legal' | 'business' | 'personal';
  questions?: {
    question: string;
    type: 'string' | 'text' | 'date' | 'number' | 'boolean' | 'select';
    options?: string[];
    required?: boolean;
  }[];
  template?: string;
}

export const templates: Template[] = [
  {
    id: 'nda-agreement',
    title: 'Non-Disclosure Agreement',
    description: 'A standard NDA to protect confidential information shared between parties.',
    category: 'legal',
    questions: [
      {
        question: 'Disclosing Party Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Disclosing Party Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Receiving Party Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Receiving Party Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Agreement Date',
        type: 'date',
        required: true,
      },
      {
        question: 'Special Provisions',
        type: 'text',
        required: false,
      },
    ],
    template: `# NON-DISCLOSURE AGREEMENT (NDA)

This Nondisclosure Agreement or ("Agreement") has been entered into on the date of
{{Agreement Date}} and is by and between:

Party Disclosing Information: {{Disclosing Party Name}} with a mailing address of
{{Disclosing Party Address}} ("Disclosing Party").

Party Receiving Information: {{Receiving Party Name}} with a mailing address of
{{Receiving Party Address}} ("Receiving Party").

For the purpose of preventing the unauthorized disclosure of Confidential Information as defined
below. The parties agree to enter into a confidential relationship concerning the disclosure of
certain proprietary and confidential information ("Confidential Information").

### 1. Definition of Confidential Information.
For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word "Confidential" or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party shall promptly provide writing indicating that such oral communication constituted Confidential Information.

### 2. Exclusions from Confidential Information.
Receiving Party's obligations under this Agreement do not extend to information that is: 
(a) publicly known at the time of disclosure or
subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; 
(c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing
Party's representatives; or 
(d) is disclosed by Receiving Party with Disclosing Party's prior
written approval.

### 3. Obligations of Receiving Party.
Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall carefully restrict access to Confidential Information to employees, contractors and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party shall not, without the prior written approval of Disclosing Party, use for Receiving Party's benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its possession pertaining to Confidential Information immediately if Disclosing Party requests it in writing.

### 4. Time Periods. 
The nondisclosure provisions of this Agreement shall survive the termination
of this Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first.

### 5. Relationships. 
Nothing contained in this Agreement shall be deemed to constitute either
party a partner, joint venture or employee of the other party for any purpose.

### 6. Severability. 
If a court finds any provision of this Agreement invalid or unenforceable, the
remainder of this Agreement shall be interpreted so as best to affect the intent of the parties.

### 7. Integration.
This Agreement expresses the complete understanding of the parties with
respect to the subject matter and supersedes all prior proposals, agreements, representations, and understandings. This Agreement may not be amended except in writing signed by both parties.

### 8. Waiver. 
The failure to exercise any right provided in this Agreement shall not be a waiver of prior or subsequent rights.

### 9. Notice of Immunity. 
Employee is provided notice that an individual shall not be held criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade secret that is made (i) in confidence to a federal, state, or local government official, either directly or indirectly, or to an attorney; and (ii) solely for the purpose of reporting or investigating a suspected violation of law; or is made in a complaint or other document filed in a lawsuit or other proceeding, if such filing is made under seal. An individual who files a lawsuit for retaliation by an employer for reporting a suspected violation of law may disclose the trade secret to the attorney of the individual and use the trade secret information in the court proceeding, if the individual (i) files any document containing the trade secret under seal; and (ii) does not disclose the trade secret, except pursuant to court order.

{{Special Provisions}}

This Agreement and each party's obligations shall be binding on the representatives, assigns and successors of such party. Each party has signed this Agreement through its authorized representative.

DISCLOSING PARTY

Signature: __________________

Typed or Printed Name: {{Disclosing Party Name}} 
Date: _______________

RECEIVING PARTY

Signature: _____________________________________________________

Typed or Printed Name: {{Receiving Party Name}} 
Date: _______________`,
  },
  {
    id: 'employment-agreement',
    title: 'Employment Agreement',
    description: 'A comprehensive employment contract outlining terms and conditions.',
    category: 'legal',
    questions: [
      {
        question: 'Employer Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Employer Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Employee Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Employee Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Start Date',
        type: 'date',
        required: true,
      },
      {
        question: 'Job Title',
        type: 'string',
        required: true,
      },
      {
        question: 'Salary',
        type: 'number',
        required: true,
      },
      {
        question: 'Additional Terms',
        type: 'text',
        required: false,
      },
    ],
  },
  {
    id: 'rental-agreement',
    title: 'Rental Agreement',
    description: 'A residential lease agreement between landlord and tenant.',
    category: 'legal',
    questions: [
      {
        question: 'Landlord Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Tenant Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Property Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Lease Term',
        type: 'string',
        required: true,
      },
      {
        question: 'Monthly Rent',
        type: 'number',
        required: true,
      },
      {
        question: 'Security Deposit',
        type: 'number',
        required: true,
      },
      {
        question: 'Start Date',
        type: 'date',
        required: true,
      },
      {
        question: 'End Date',
        type: 'date',
        required: true,
      },
    ],
  },
  {
    id: 'invoice-template',
    title: 'Professional Invoice',
    description: 'A clean, professional invoice template for freelancers and businesses.',
    category: 'business',
    questions: [
      {
        question: 'Your Business Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Your Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Client Name',
        type: 'string',
        required: true,
      },
      {
        question: 'Client Address',
        type: 'string',
        required: true,
      },
      {
        question: 'Invoice Number',
        type: 'string',
        required: true,
      },
      {
        question: 'Invoice Date',
        type: 'date',
        required: true,
      },
      {
        question: 'Due Date',
        type: 'date',
        required: true,
      },
      {
        question: 'Services Description',
        type: 'text',
        required: true,
      },
      {
        question: 'Amount Due',
        type: 'number',
        required: true,
      },
    ],
  },
  {
    id: 'business-proposal',
    title: 'Business Proposal',
    description: 'A template for creating professional business proposals.',
    category: 'business',
  },
  {
    id: 'resignation-letter',
    title: 'Resignation Letter',
    description: 'A professional and courteous resignation letter template.',
    category: 'personal',
  },
  {
    id: 'thank-you-letter',
    title: 'Thank You Letter',
    description: 'Express gratitude professionally with this thank you letter template.',
    category: 'personal',
  },
  {
    id: 'reference-letter',
    title: 'Reference Letter',
    description: 'A template for writing a professional reference or recommendation letter.',
    category: 'personal',
  },
];