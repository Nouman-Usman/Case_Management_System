export interface CreateUserParams {
  email: string;
  phone: string;
  password: string;
}

export declare interface LoginUserParams {
  email: string;
  password: string;
}

export declare interface ResetPasswordParams {
  email: string;
}

export declare interface UpdateUserParams {
  email: string;
  phone: string;
}

export declare interface DeleteUserParams {
  email: string;
}

export declare interface LawyerProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  practiceAreas: string[]; // Array of practice areas
  experience: string; //not required
  education: string;  //not required
  languages: string[]; //not required
  consultationFees: number;
  rating: number;
  reviews: string[]; 
  casesHandled: number; // not required
  casesWon: number; // not required
  casesLost: number; // not required
  profilePic: string;
}

export declare interface ClientProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  casesInvolved: string[]; // Array of case IDs
  profilePic: string;
}

export declare interface ChamberProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  casesHandled: string[]; // Array of case IDs
  chamberLogo: string;
}

export declare interface AssistantProfile {
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  casesAssisted: string[]; // Array of case IDs
  profilePic: string;
  pern: string[]; // Array of roles
}

export declare interface Subscription {
  userId: string;
  subscriptionId: string;
  subscriptionType: string;
  subscriptionAmount: number;
  subscriptionDate: string;
  subscriptionExpiry: string;
  subscriptionStatus: string;
}

export declare interface Case {
  userId: string;
  caseId: string;
  caseType: string;
  caseTitle: string;
  caseDescription: string;
  caseStatus: string;
  caseDate: string;
  clientId: string;
  lawyerId: string;
  chamberId: string;
  assistantId: string;
  hearingDate: string;
  hearingTime: string;
  hearingVenue: string;
  documents: string[]; // Array of document IDs
  notes: string;
  rating: number;
  review: string;
}

export declare interface Document {
  userId: string;
  documentId: string;
  documentName: string;
  documentType: string;
  documentUrl: string;
  documentDate: string;
  caseId: string;
}

export declare interface Reminder {
  userId: string;
  reminderId: string;
  reminderTitle: string;
  reminderDescription: string;
  reminderDate: string;
  reminderTime: string;
  reminderStatus: string;
}
export declare interface Feedback {
  feedbackId: string;
  userId: string; // User who provided the feedback (client or lawyer)
  caseId: string; // Associated case (if applicable)
  rating: number; // Rating out of 5
  comment: string;
  feedbackDate: string;
}

export declare interface Appointment {
  appointmentId: string;
  userId: string; // User who booked the appointment (client or lawyer)
  lawyerId: string; // Lawyer associated with the appointment
  clientId: string; // Client associated with the appointment
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string; // e.g., "Consultation", "Case Discussion"
  appointmentStatus: string; // e.g., "Scheduled", "Completed", "Cancelled"
  notes: string;
}

export declare interface Announcements{
  announcementId: string;
  announcementTitle: string;
  announcementDescription: string;
  announcementDate: string;
  announcementTime: string;
  announcementStatus: string;
  announcementMedia: string;
}

export declare interface DraftedDocuments{
  userId: string;
  clientId: string;
  caseId: string;
  documentId: string;
  documentName: string;
  documentType: string;
  documentUrl: string;
  documentDate: string;
}



