import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isSectionHeader?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Mathematical Computing' | 'Statistical Software' | 'Qualitative Research' | 'Education';
  partner: string;
  logoUrl?: string; // Path to partner/product logo
  heroImageUrl?: string; // Path to main product banner
  galleryImages?: string[]; // Array of screenshot paths
  shortDescription: string;
  fullDescription: string;
  oemUrl?: string; // Link to official OEM product page
  sections?: {
    title: string;
    content: string;
    bullets?: string[];
  }[];
  features: string[];
  specs?: string[]; // System requirements or technical details
}

export interface ServiceCategory {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
}

export interface Solution {
  id: string;
  title: string;
  heroImage?: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  capabilities: {
    title: string;
    desc: string;
    icon: LucideIcon;
  }[];
  useCases: string[];
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  type: 'Case Lock' | 'Deal Closed' | 'Tech Support' | 'Database Update';
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  adminNotes?: string;
}

export interface License {
  id: string;
  productName: string;
  licenseKey: string;
  assignedToUserId?: string;
  assignedToUserName?: string;
  expiryDate: string;
  status: 'Available' | 'Assigned' | 'Expired';
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // Full content
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface Lead {
  id: string;
  name: string; // Client Name
  company: string;
  value: number;
  status: 'Locked' | 'In Progress' | 'Closed' | 'Lost';
  date: string;
  notes?: string;
}

export interface NetworkUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'partner';
  skills?: string[]; // Tech stack
  earnings: number;
  status: 'Active' | 'Pending';
  joinedDate: string;
  canWriteBlog?: boolean;
  assignedLicenses?: string[]; // IDs of licenses
  leads?: Lead[]; // Cases assigned/locked to this user
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: number;
}