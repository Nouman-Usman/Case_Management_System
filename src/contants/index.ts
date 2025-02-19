export const defaultCreateUserParams = {
  email: "",
  phone: "",
  password: "",
};

export const defaultLoginUserParams = {
  email: "",
  password: "",
};

export const defaultResetPasswordParams = {
  email: "",
};

export const defaultUpdateUserParams = {
  email: "",
  phone: "",
};

export const defaultDeleteUserParams = {
  email: "",
};

export const defaultLawyerProfile = {
  email: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  practiceAreas: [],
  experience: "",
  education: "",
  languages: [],
  consultationFees: 0,
  rating: 0,
  reviews: [],
  casesHandled: 0,
  casesWon: 0,
  casesLost: 0,
  profilePic: "",
};

export const defaultClientProfile = {
  email: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  casesInvolved: [],
  profilePic: "",
};

export const defaultChamberProfile = {
  email: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  casesHandled: [],
  chamberLogo: "",
};

export const defaultAssistantProfile = {
  userId: "",
  email: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  casesAssisted: [],
  profilePic: "",
  roles: [],
};

export const defaultSubscription = {
  userId: "",
  subscriptionId: "",
  subscriptionType: "",
  subscriptionAmount: 0,
  subscriptionDate: "",
  subscriptionExpiry: "",
  subscriptionStatus: "",
};

export const defaultCase = {
  userId: "",
  caseId: "",
  caseType: "",
  caseTitle: "",
  caseDescription: "",
  caseStatus: "",
  caseDate: "",
  clientId: "",
  lawyerId: "",
  chamberId: "",
  assistantId: "",
  hearingDate: "",
  hearingTime: "",
  hearingVenue: "",
  documents: [],
  notes: "",
  rating: 0,
  review: "",
};

export const defaultDocument = {
  userId: "",
  documentId: "",
  documentName: "",
  documentType: "",
  documentUrl: "",
  documentDate: "",
  caseId: "",
};

export const defaultReminder = {
  userId: "",
  reminderId: "",
  reminderTitle: "",
  reminderDescription: "",
  reminderDate: "",
  reminderTime: "",
  reminderStatus: "",
};

export const defaultLegalDocument = {
  documentId: "",
  userId: "",
  caseId: "",
  documentName: "",
  documentType: "",
  documentUrl: "",
  uploadDate: "",
  uploadedBy: "",
};

export const defaultFeedback = {
  feedbackId: "",
  userId: "",
  caseId: "",
  rating: 0,
  comment: "",
  feedbackDate: "",
};

export const defaultAppointment = {
  appointmentId: "",
  userId: "",
  lawyerId: "",
  clientId: "",
  appointmentDate: "",
  appointmentTime: "",
  appointmentType: "",
  appointmentStatus: "",
  notes: "",
};

export const defaultAnnouncements = {
  announcementId: "",
  announcementTitle: "",
  announcementDescription: "",
  announcementDate: "",
  announcementTime: "",
  announcementStatus: "",
  announcementMedia: "",
};

export const defaultDraftedDocuments = {
  userId: "",
  clientId: "",
  caseId: "",
  documentId: "",
  documentName: "",
  documentType: "",
  documentUrl: "",
  documentDate: "",
}