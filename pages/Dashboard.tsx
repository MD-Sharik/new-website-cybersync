import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  User, Users, DollarSign, Briefcase, Bell, LogOut, LayoutDashboard, 
  Rocket, X, Ticket as TicketIcon, Key, FileText, CheckCircle, AlertCircle, Trash2, Edit, Plus, Lock, Search, Eye, Save, Ban, Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, Wand2, Download, Loader2, RefreshCw, Layers, ImagePlus
} from 'lucide-react';
import { Lead, NetworkUser, Ticket, License, BlogPost } from '../types';
import { generateImage, editImage } from '../services/geminiService';

// MOCK INITIAL DATA
const INITIAL_USERS: NetworkUser[] = [
  { 
    id: '1', name: 'Admin User', email: 'admin@cybersync.in', role: 'admin', earnings: 0, status: 'Active', joinedDate: '2023-01-01', canWriteBlog: true, skills: ['Management', 'Sales'], leads: [] 
  },
  { 
    id: '2', name: 'Rahul Sharma', email: 'rahul@partner.com', role: 'partner', earnings: 12500, status: 'Active', joinedDate: '2024-02-15', canWriteBlog: false, skills: ['Python', 'SPSS'],
    leads: [
       { id: 'lead1', name: 'IIT Delhi Mech Dept', company: 'IIT Delhi', value: 5000, status: 'In Progress', date: '2024-09-10', notes: 'MapleSim License Pack' }
    ]
  },
  { 
    id: '3', name: 'Priya Patel', email: 'priya@partner.com', role: 'partner', earnings: 8200, status: 'Active', joinedDate: '2024-03-10', canWriteBlog: true, skills: ['Marketing', 'CRM'], leads: [] 
  },
];

const INITIAL_TICKETS: Ticket[] = [
  { id: 't1', userId: '2', userName: 'Rahul Sharma', type: 'Case Lock', subject: 'Lock deal for IIT Delhi', description: 'Need to lock MapleSim opportunity for Mech Dept. Value approx $5k.', status: 'Open', date: '2024-10-01' },
  { id: 't2', userId: '3', userName: 'Priya Patel', type: 'Tech Support', subject: 'License Server Issue', description: 'Customer unable to activate SPSS.', status: 'Resolved', date: '2024-09-28', adminNotes: 'Reset key provided.' },
];

const INITIAL_LICENSES: License[] = [
  { id: 'l1', productName: 'Maple 2024', licenseKey: 'XXXX-YYYY-ZZZZ', status: 'Available', expiryDate: '2025-12-31' },
  { id: 'l2', productName: 'IBM SPSS 29', licenseKey: 'AAAA-BBBB-CCCC', assignedToUserId: '2', assignedToUserName: 'Rahul Sharma', status: 'Assigned', expiryDate: '2025-06-30' },
];

const EARNINGS_CHART = [
  { month: 'Jan', value: 1200 },
  { month: 'Feb', value: 1900 },
  { month: 'Mar', value: 1500 },
  { month: 'Apr', value: 2400 },
  { month: 'May', value: 3200 },
  { month: 'Jun', value: 4500 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // -- STATE --
  const [viewState, setViewState] = useState<'login' | 'signup' | 'dashboard'>('login');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'tickets' | 'licenses' | 'blog' | 'ai-studio' | 'ai-editor'>('overview');
  
  // Current User Session
  const [currentUser, setCurrentUser] = useState<NetworkUser | null>(null);
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // For signup

  // App Data (synced with LocalStorage)
  const [users, setUsers] = useState<NetworkUser[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  
  // -- MODAL STATES --
  const [selectedUser, setSelectedUser] = useState<NetworkUser | null>(null); // For Detail View
  const [isEditingUser, setIsEditingUser] = useState(false); // Edit Mode Toggle
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null); // For Ticket Detail
  
  // -- LICENSE MANAGER STATE --
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<License | null>(null); // For Adding/Editing
  
  // Input States for Actions
  const [newTicket, setNewTicket] = useState({ type: 'Case Lock', subject: '', description: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'partner', earnings: 0, skills: '' });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  // Blog State
  const [blogPost, setBlogPost] = useState({ title: '', category: 'General', excerpt: '', content: '' });
  const [blogImage, setBlogImage] = useState<string>(''); // Base64 string
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // AI Studio State
  const [genImagePrompt, setGenImagePrompt] = useState('');
  const [genImageSize, setGenImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  // AI Image Editor State
  const [sourceImage, setSourceImage] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState('');
  const [editedImageResult, setEditedImageResult] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const editorFileInputRef = useRef<HTMLInputElement>(null);

  // Admin Ticket Action State
  const [adminTicketAction, setAdminTicketAction] = useState({ status: '', notes: '' });

  // State for adding a Lead/Case to a user
  const [newLead, setNewLead] = useState({ name: '', company: '', value: 0, notes: '' });
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // -- EFFECTS --
  useEffect(() => {
    // Load data from localStorage or fallback to initial
    const storedUsers = localStorage.getItem('cyber_users');
    const storedTickets = localStorage.getItem('cyber_tickets');
    const storedLicenses = localStorage.getItem('cyber_licenses');

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    else setUsers(INITIAL_USERS);

    if (storedTickets) setTickets(JSON.parse(storedTickets));
    else setTickets(INITIAL_TICKETS);

    if (storedLicenses) setLicenses(JSON.parse(storedLicenses));
    else setLicenses(INITIAL_LICENSES);
  }, []);

  // Sync back to LocalStorage whenever data changes
  useEffect(() => { if (users.length) localStorage.setItem('cyber_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { if (tickets.length) localStorage.setItem('cyber_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { if (licenses.length) localStorage.setItem('cyber_licenses', JSON.stringify(licenses)); }, [licenses]);

  // -- HANDLERS --

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setCurrentUser(foundUser);
      setViewState('dashboard');
    } else {
      alert("User not found. Try 'admin@cybersync.in' or sign up.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserObj: NetworkUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'partner',
      earnings: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      canWriteBlog: false,
      leads: []
    };
    setUsers([...users, newUserObj]);
    setCurrentUser(newUserObj);
    setViewState('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewState('login');
    setEmail('');
    setName('');
  };

  // Ticket Actions
  const createTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const ticket: Ticket = {
      id: `t${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: newTicket.type as any,
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    setTickets([...tickets, ticket]);
    setNewTicket({ type: 'Case Lock', subject: '', description: '' });
    alert("Ticket Created Successfully!");
  };

  const updateTicketStatus = () => {
    if (!selectedTicket) return;
    setTickets(tickets.map(t => t.id === selectedTicket.id ? { 
        ...t, 
        status: adminTicketAction.status as any, 
        adminNotes: adminTicketAction.notes 
    } : t));
    setSelectedTicket(null);
    setAdminTicketAction({ status: '', notes: '' });
  };

  // User Management
  const deleteUser = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const addNewUser = () => {
    const u: NetworkUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'admin'|'partner',
      earnings: Number(newUser.earnings),
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      canWriteBlog: false,
      skills: newUser.skills.split(',').map(s => s.trim()),
      leads: []
    };
    setUsers([...users, u]);
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'partner', earnings: 0, skills: '' });
  };

  const saveUserChanges = () => {
    if (!selectedUser) return;
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setIsEditingUser(false);
    alert("User Details Updated!");
  };

  // License Management
  const saveLicense = () => {
      if (!editingLicense) return;
      
      let updatedLicense = { ...editingLicense };
      
      // If assigned user changed, update name
      if (updatedLicense.assignedToUserId) {
          const u = users.find(user => user.id === updatedLicense.assignedToUserId);
          updatedLicense.assignedToUserName = u ? u.name : 'Unknown';
          updatedLicense.status = 'Assigned';
      } else {
          updatedLicense.assignedToUserName = undefined;
          updatedLicense.status = 'Available';
      }

      if (licenses.some(l => l.id === updatedLicense.id)) {
          // Update existing
          setLicenses(licenses.map(l => l.id === updatedLicense.id ? updatedLicense : l));
      } else {
          // Add new
          setLicenses([...licenses, updatedLicense]);
      }
      setIsLicenseModalOpen(false);
      setEditingLicense(null);
  };

  const deleteLicense = (id: string) => {
      if(confirm("Delete this license?")) {
          setLicenses(licenses.filter(l => l.id !== id));
      }
  };

  // Lead / Case Locking
  const addLeadToUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    const lead: Lead = {
      id: `lead${Date.now()}`,
      name: newLead.name,
      company: newLead.company,
      value: Number(newLead.value),
      status: 'Locked',
      date: new Date().toISOString().split('T')[0],
      notes: newLead.notes
    };

    const updatedUser = {
      ...selectedUser,
      leads: [...(selectedUser.leads || []), lead]
    };
    
    // Update local state and main users array
    setSelectedUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsAddLeadOpen(false);
    setNewLead({ name: '', company: '', value: 0, notes: '' });
  };

  // Blog Publishing
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => {
           if (ev.target?.result) {
              setBlogImage(ev.target.result as string);
           }
        };
        reader.readAsDataURL(e.target.files[0]);
     }
  };

  const insertFormatting = (tag: string) => {
     // Simple append for simulation (in a real editor, we'd use selection range)
     setBlogPost(prev => ({
         ...prev,
         content: prev.content + tag
     }));
  };

  const clearBlogForm = () => {
      setBlogPost({ title: '', category: 'General', excerpt: '', content: '' });
      setBlogImage('');
  };

  const publishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogImage) {
        alert("Please upload a cover image.");
        return;
    }

    const newPost: BlogPost = {
      id: Date.now(),
      title: blogPost.title,
      category: blogPost.category,
      excerpt: blogPost.excerpt,
      content: blogPost.content, // HTML Content
      author: currentUser?.name || 'Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: blogImage
    };
    const existingPosts = JSON.parse(localStorage.getItem('cyber_blog_posts') || '[]');
    localStorage.setItem('cyber_blog_posts', JSON.stringify([newPost, ...existingPosts]));
    
    clearBlogForm();
    alert("Blog Post Published! Check the Blog page.");
  };

  // Image Generation
  const handleGenerateImage = async () => {
    if (!genImagePrompt) return;

    // API Key Check for Gemini 3 Pro Image
    const aiStudio = (window as any).aistudio;
    if (aiStudio && await aiStudio.hasSelectedApiKey() === false) {
       try {
           await aiStudio.openSelectKey();
           // Assume success after dialog interaction, proceed to generate
       } catch (e) {
           console.error("Key selection failed", e);
           alert("API Key Selection is required for Image Generation.");
           return;
       }
    }

    setIsGeneratingImage(true);
    setGeneratedImage(null);

    try {
       const result = await generateImage(genImagePrompt, genImageSize);
       if (result) {
          setGeneratedImage(result);
       } else {
          alert("Failed to generate image. Please try again.");
       }
    } catch (e) {
       console.error(e);
       alert("Generation Error. Please check console/API quota.");
    } finally {
       setIsGeneratingImage(false);
    }
  };
  
  // Image Editing
  const handleSourceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
       const reader = new FileReader();
       reader.onload = (ev) => {
          if (ev.target?.result) {
             setSourceImage(ev.target.result as string);
             setEditedImageResult(null); // Clear previous result
          }
       };
       reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditImage = async () => {
    if (!sourceImage || !editPrompt) return;
    
    // API Key Check
    const aiStudio = (window as any).aistudio;
    if (aiStudio && await aiStudio.hasSelectedApiKey() === false) {
       try {
           await aiStudio.openSelectKey();
       } catch (e) {
           console.error("Key selection failed", e);
           alert("API Key Selection is required for Image Editing.");
           return;
       }
    }

    setIsEditingImage(true);
    setEditedImageResult(null);

    try {
        const result = await editImage(sourceImage, editPrompt);
        if (result) {
            setEditedImageResult(result);
        } else {
            alert("Failed to edit image.");
        }
    } catch (e) {
        console.error(e);
        alert("Editing Error. See console.");
    } finally {
        setIsEditingImage(false);
    }
  };

  // -- RENDER: AUTH SCREENS --
  if (viewState === 'login' || viewState === 'signup') {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center px-4 pt-20 relative overflow-hidden" onClick={() => navigate('/')}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-primary/10 via-cyber-black to-cyber-black pointer-events-none"></div>
        <div 
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-cyber-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative z-10"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={() => navigate('/')} className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-white"><X size={24} /></button>
          <div className="p-10 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-bold mb-6">Cyber Sync Network</h2>
            <p className="text-gray-300 mb-8 text-sm leading-relaxed">Admin & Partner Portal. Manage your earnings, cases, and content.</p>
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-sm text-gray-400"><Users size={16}/> <span>Partner Management</span></div>
               <div className="flex items-center gap-3 text-sm text-gray-400"><DollarSign size={16}/> <span>Earnings Tracker</span></div>
               <div className="flex items-center gap-3 text-sm text-gray-400"><Lock size={16}/> <span>Case Locking</span></div>
            </div>
          </div>
          <div className="p-10">
            <h3 className="text-2xl font-bold text-white mb-6">{viewState === 'login' ? 'Portal Login' : 'Partner Registration'}</h3>
            <form onSubmit={viewState === 'login' ? handleLogin : handleSignup} className="space-y-4">
              {viewState === 'signup' && (
                <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none" />
              )}
              <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none" />
              <input required type="password" placeholder="Password" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none" />
              <button type="submit" className="w-full bg-cyber-primary text-black font-bold py-4 rounded-lg hover:bg-white transition-colors uppercase tracking-wide">
                {viewState === 'login' ? 'Login' : 'Join Network'}
              </button>
            </form>
            <div className="mt-4 text-center text-xs text-gray-500">
               {viewState === 'login' ? 
                 <span onClick={() => setViewState('signup')} className="cursor-pointer hover:text-cyber-primary">Need an account? Sign up</span> : 
                 <span onClick={() => setViewState('login')} className="cursor-pointer hover:text-cyber-primary">Have an account? Login</span>}
            </div>
            <div className="mt-4 text-center text-[10px] text-gray-600">
               Use <b>admin@cybersync.in</b> for Admin Access
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -- RENDER: DASHBOARD --
  return (
    <div className="min-h-screen bg-cyber-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-8 bg-cyber-panel p-6 rounded-xl border border-white/5 shadow-lg">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyber-primary text-black flex items-center justify-center font-bold text-xl">
                 {currentUser?.name.charAt(0)}
              </div>
              <div>
                 <h1 className="text-xl font-bold text-white">{currentUser?.name}</h1>
                 <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className={`w-2 h-2 rounded-full ${currentUser?.role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    <span className="uppercase">{currentUser?.role} Account</span>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                 <LogOut size={20} />
              </button>
           </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* Sidebar Navigation */}
           <div className="lg:col-span-1 space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'overview' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
              >
                 <LayoutDashboard size={18} /> Overview
              </button>
              
              <button 
                 onClick={() => setActiveTab('tickets')}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'tickets' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
              >
                 <TicketIcon size={18} /> Support & Cases
              </button>

              {(currentUser?.role === 'admin' || currentUser?.canWriteBlog) && (
                <button 
                  onClick={() => setActiveTab('blog')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'blog' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
                >
                  <FileText size={18} /> Content & Blogs
                </button>
              )}

              <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-600 uppercase tracking-widest">AI Tools</div>
              <button 
                  onClick={() => setActiveTab('ai-studio')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'ai-studio' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
              >
                  <Wand2 size={18} /> AI Generator
              </button>
              <button 
                  onClick={() => setActiveTab('ai-editor')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'ai-editor' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
              >
                  <ImagePlus size={18} /> AI Image Editor
              </button>

              {currentUser?.role === 'admin' && (
                 <>
                  <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Admin Tools</div>
                  <button 
                    onClick={() => setActiveTab('users')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'users' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
                  >
                    <Users size={18} /> Manage Users
                  </button>
                  <button 
                    onClick={() => setActiveTab('licenses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'licenses' ? 'bg-cyber-primary text-black' : 'bg-cyber-panel text-gray-400 hover:bg-white/5'}`}
                  >
                    <Key size={18} /> License Manager
                  </button>
                 </>
              )}
           </div>

           {/* Content Area */}
           <div className="lg:col-span-3">
              
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="bg-cyber-panel p-6 rounded-xl border border-white/5">
                          <h3 className="text-gray-500 text-xs font-bold uppercase mb-2">Total Earnings</h3>
                          <div className="text-2xl font-bold text-cyber-primary">
                             ${currentUser?.earnings.toLocaleString()}
                          </div>
                       </div>
                       <div className="bg-cyber-panel p-6 rounded-xl border border-white/5">
                          <h3 className="text-gray-500 text-xs font-bold uppercase mb-2">Active Tickets</h3>
                          <div className="text-2xl font-bold text-white">
                             {tickets.filter(t => t.status !== 'Resolved' && (currentUser?.role === 'admin' || t.userId === currentUser?.id)).length}
                          </div>
                       </div>
                       <div className="bg-cyber-panel p-6 rounded-xl border border-white/5">
                          <h3 className="text-gray-500 text-xs font-bold uppercase mb-2">Active Cases</h3>
                          <div className="text-2xl font-bold text-white">{currentUser?.leads?.length || 0}</div>
                       </div>
                    </div>

                    <div className="bg-cyber-panel p-6 rounded-xl border border-white/5 h-80">
                        <h3 className="text-white font-bold mb-6">Performance Metrics</h3>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={EARNINGS_CHART}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="month" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                                <Bar dataKey="value" fill="#00F0FF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
              )}

              {/* --- AI STUDIO (GENERATION) TAB --- */}
              {activeTab === 'ai-studio' && (
                  <div className="bg-cyber-panel rounded-xl border border-white/5 animate-fade-in overflow-hidden">
                      <div className="p-8 border-b border-white/5 bg-gradient-to-r from-cyber-secondary/10 to-transparent">
                          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                              <Wand2 className="text-cyber-primary" /> AI Creative Studio
                          </h2>
                          <p className="text-gray-400 mt-2 text-sm">
                              Generate high-quality marketing assets, diagrams, or visuals using the Nano Banana Pro (Gemini 3 Pro) model.
                          </p>
                      </div>

                      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Left: Controls */}
                          <div className="space-y-6">
                              <div>
                                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Image Prompt</label>
                                  <textarea 
                                      value={genImagePrompt}
                                      onChange={(e) => setGenImagePrompt(e.target.value)}
                                      placeholder="Describe the image you want to generate..."
                                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyber-primary outline-none h-32 resize-none text-sm leading-relaxed"
                                  ></textarea>
                              </div>

                              <div>
                                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Resolution</label>
                                  <div className="flex gap-4">
                                      {(['1K', '2K', '4K'] as const).map((size) => (
                                          <button
                                              key={size}
                                              onClick={() => setGenImageSize(size)}
                                              className={`flex-1 py-3 rounded-lg border text-sm font-bold transition-all ${
                                                  genImageSize === size 
                                                  ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                                                  : 'bg-black border-white/10 text-gray-400 hover:border-white/30'
                                              }`}
                                          >
                                              {size}
                                          </button>
                                      ))}
                                  </div>
                              </div>

                              <button 
                                  onClick={handleGenerateImage}
                                  disabled={isGeneratingImage || !genImagePrompt}
                                  className="w-full py-4 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                              >
                                  {isGeneratingImage ? (
                                      <>
                                          <Loader2 className="animate-spin" /> Generating Visuals...
                                      </>
                                  ) : (
                                      <>
                                          <Wand2 /> Generate Asset
                                      </>
                                  )}
                              </button>
                          </div>

                          {/* Right: Output */}
                          <div className="bg-black/40 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                              {generatedImage ? (
                                  <>
                                      <img src={generatedImage} alt="Generated Asset" className="w-full h-full object-contain" />
                                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <a 
                                              href={generatedImage} 
                                              download={`generated-asset-${Date.now()}.png`}
                                              className="px-6 py-3 bg-white text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyber-primary transition-colors"
                                          >
                                              <Download size={18} /> Download Image
                                          </a>
                                      </div>
                                  </>
                              ) : (
                                  <div className="text-center text-gray-600">
                                      {isGeneratingImage ? (
                                          <div className="flex flex-col items-center gap-4">
                                              <div className="relative w-16 h-16">
                                                  <div className="absolute inset-0 rounded-full border-4 border-cyber-primary/30"></div>
                                                  <div className="absolute inset-0 rounded-full border-4 border-cyber-primary border-t-transparent animate-spin"></div>
                                              </div>
                                              <p className="text-sm font-mono animate-pulse">Creating masterpiece...</p>
                                          </div>
                                      ) : (
                                          <div className="flex flex-col items-center gap-2">
                                              <ImageIcon size={48} className="opacity-50" />
                                              <p className="text-sm">Preview will appear here</p>
                                          </div>
                                      )}
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              )}

              {/* --- AI IMAGE EDITOR TAB --- */}
              {activeTab === 'ai-editor' && (
                  <div className="bg-cyber-panel rounded-xl border border-white/5 animate-fade-in overflow-hidden">
                      <div className="p-8 border-b border-white/5 bg-gradient-to-r from-cyber-secondary/10 to-transparent">
                          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                              <ImagePlus className="text-cyber-primary" /> AI Image Editor
                          </h2>
                          <p className="text-gray-400 mt-2 text-sm">
                              Upload an image and use text commands (e.g., "Add a retro filter", "Remove the background person") to edit it with Gemini 2.5 Flash Image.
                          </p>
                      </div>

                      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                           {/* Left Control Panel */}
                           <div className="space-y-6">
                                {/* Upload Box */}
                                <div 
                                    className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-cyber-primary hover:bg-white/5 transition-all"
                                    onClick={() => editorFileInputRef.current?.click()}
                                >
                                    <input ref={editorFileInputRef} type="file" className="hidden" accept="image/*" onChange={handleSourceImageUpload} />
                                    {sourceImage ? (
                                        <div className="relative h-48 w-full">
                                            <img src={sourceImage} className="h-full w-full object-contain rounded-lg" alt="Source" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity text-white font-bold">Change Source Image</div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-500 py-10">
                                            <ImageIcon size={48} />
                                            <span className="text-sm font-bold uppercase">Click to Upload Source Image</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Editing Instruction</label>
                                    <input 
                                        type="text"
                                        value={editPrompt}
                                        onChange={(e) => setEditPrompt(e.target.value)}
                                        placeholder="E.g. 'Turn this into a sketch', 'Add neon lights'"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyber-primary outline-none"
                                    />
                                </div>

                                <button 
                                    onClick={handleEditImage}
                                    disabled={isEditingImage || !sourceImage || !editPrompt}
                                    className="w-full py-4 bg-cyber-primary text-black font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isEditingImage ? <Loader2 className="animate-spin" /> : <Wand2 />}
                                    {isEditingImage ? 'Processing Edit...' : 'Apply AI Edit'}
                                </button>
                           </div>

                           {/* Right Result Panel */}
                           <div className="bg-black/40 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                                {editedImageResult ? (
                                    <>
                                        <img src={editedImageResult} alt="Edited Result" className="w-full h-full object-contain" />
                                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <a 
                                                href={editedImageResult} 
                                                download={`edited-image-${Date.now()}.png`}
                                                className="px-6 py-3 bg-white text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyber-primary transition-colors"
                                            >
                                                <Download size={18} /> Download Result
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-gray-600">
                                        {isEditingImage ? (
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 size={48} className="animate-spin text-cyber-primary" />
                                                <p className="text-sm font-mono animate-pulse">AI is editing your image...</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <Layers size={48} className="opacity-50" />
                                                <p className="text-sm">Edited result will appear here</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                           </div>
                      </div>
                  </div>
              )}

              {/* --- USERS TAB (ADMIN) --- */}
              {activeTab === 'users' && currentUser?.role === 'admin' && (
                 <div className="bg-cyber-panel rounded-xl border border-white/5 overflow-hidden animate-fade-in">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                       <h2 className="text-xl font-bold text-white">Network Users</h2>
                       <button onClick={() => setIsAddUserOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-cyber-primary text-black rounded font-bold text-sm hover:bg-white"><Plus size={16}/> Add User</button>
                    </div>
                    
                    {/* ADD USER MODAL (Mini) */}
                    {isAddUserOpen && (
                      <div className="p-6 bg-white/5 border-b border-white/5">
                        <h4 className="text-white font-bold mb-4">Register New User</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                           <input type="text" placeholder="Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="bg-black border border-white/10 rounded px-3 py-2 text-white" />
                           <input type="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="bg-black border border-white/10 rounded px-3 py-2 text-white" />
                           <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="bg-black border border-white/10 rounded px-3 py-2 text-white">
                              <option value="partner">Partner</option>
                              <option value="admin">Admin</option>
                           </select>
                           <input type="text" placeholder="Tech Skills (comma sep)" value={newUser.skills} onChange={e => setNewUser({...newUser, skills: e.target.value})} className="bg-black border border-white/10 rounded px-3 py-2 text-white" />
                           <input type="number" placeholder="Earnings" value={newUser.earnings} onChange={e => setNewUser({...newUser, earnings: Number(e.target.value)})} className="bg-black border border-white/10 rounded px-3 py-2 text-white" />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={addNewUser} className="px-4 py-2 bg-green-500 text-black rounded font-bold text-sm">Save User</button>
                          <button onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded font-bold text-sm">Cancel</button>
                        </div>
                      </div>
                    )}

                    <div className="overflow-x-auto">
                       <table className="w-full text-left text-sm text-gray-300">
                          <thead className="text-xs uppercase bg-black/30 text-gray-500">
                             <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Earnings</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {users.map(user => (
                                <tr 
                                  key={user.id} 
                                  className="hover:bg-white/5 cursor-pointer transition-colors"
                                  onClick={() => { setSelectedUser(user); setIsEditingUser(false); }} // OPEN PROFILE
                                >
                                   <td className="px-6 py-4 font-bold text-white">
                                      {user.name} <div className="text-xs text-gray-500 font-normal">{user.email}</div>
                                   </td>
                                   <td className="px-6 py-4"><span className="uppercase text-xs font-bold px-2 py-1 rounded bg-white/10">{user.role}</span></td>
                                   <td className="px-6 py-4 font-mono text-cyber-primary">${user.earnings.toLocaleString()}</td>
                                   <td className="px-6 py-4">
                                      <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-[10px] uppercase font-bold">Active</span>
                                   </td>
                                   <td className="px-6 py-4 flex items-center gap-2">
                                      <button className="text-cyber-primary hover:underline text-xs">Manage</button>
                                      <button onClick={(e) => deleteUser(user.id, e)} className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white"><Trash2 size={14}/></button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              )}

              {/* --- TICKETS TAB --- */}
              {activeTab === 'tickets' && (
                 <div className="space-y-8 animate-fade-in">
                    {/* Create Ticket */}
                    <div className="bg-cyber-panel p-6 rounded-xl border border-white/5">
                       <h3 className="text-lg font-bold text-white mb-4">Raise New Ticket</h3>
                       <form onSubmit={createTicket} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <select 
                            value={newTicket.type} 
                            onChange={e => setNewTicket({...newTicket, type: e.target.value})}
                            className="bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none"
                          >
                             <option>Case Lock</option>
                             <option>Deal Closed</option>
                             <option>Tech Support</option>
                             <option>Database Update</option>
                          </select>
                          <input 
                            type="text" 
                            placeholder="Subject / Client Name" 
                            required
                            value={newTicket.subject}
                            onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                            className="md:col-span-3 bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none"
                          />
                          <textarea 
                             placeholder="Description of the case or issue..."
                             required
                             value={newTicket.description}
                             onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                             className="md:col-span-4 bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none h-24"
                          ></textarea>
                          <button className="md:col-span-1 bg-cyber-primary text-black font-bold py-2 rounded hover:bg-white transition-colors">Submit Ticket</button>
                       </form>
                    </div>

                    {/* Ticket List */}
                    <div className="bg-cyber-panel rounded-xl border border-white/5 overflow-hidden">
                       <div className="p-4 border-b border-white/5 font-bold text-white flex justify-between items-center">
                          <span>{currentUser?.role === 'admin' ? 'All Network Tickets' : 'My Ticket History'}</span>
                       </div>
                       <table className="w-full text-left text-sm text-gray-300">
                          <thead className="text-xs uppercase bg-black/30 text-gray-500">
                             <tr>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Action</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {tickets
                                .filter(t => currentUser?.role === 'admin' || t.userId === currentUser?.id)
                                .map(ticket => (
                                <tr 
                                   key={ticket.id} 
                                   className="hover:bg-white/5 cursor-pointer"
                                   onClick={() => { setSelectedTicket(ticket); setAdminTicketAction({ status: ticket.status, notes: ticket.adminNotes || '' }); }}
                                >
                                   <td className="px-6 py-4 font-bold text-white">
                                      {ticket.subject}
                                      {currentUser?.role === 'admin' && <div className="text-xs text-gray-500 font-normal">by {ticket.userName}</div>}
                                   </td>
                                   <td className="px-6 py-4 text-cyber-primary">{ticket.type}</td>
                                   <td className="px-6 py-4">
                                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                         ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-500' : 
                                         ticket.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                                         'bg-yellow-500/20 text-yellow-500'
                                      }`}>{ticket.status}</span>
                                   </td>
                                   <td className="px-6 py-4 text-gray-500 text-xs">{ticket.date}</td>
                                   <td className="px-6 py-4">
                                      <button className="text-xs text-cyber-primary underline">View Details</button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              )}
              
              {/* --- LICENSES TAB (ADMIN) --- */}
              {activeTab === 'licenses' && currentUser?.role === 'admin' && (
                 <div className="bg-cyber-panel rounded-xl border border-white/5 overflow-hidden animate-fade-in">
                     <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Software Licenses</h2>
                        <button 
                            onClick={() => {
                                setEditingLicense({ id: Date.now().toString(), productName: 'Maple 2024', licenseKey: '', expiryDate: '', status: 'Available' });
                                setIsLicenseModalOpen(true);
                            }} 
                            className="flex items-center gap-2 px-4 py-2 bg-cyber-primary text-black rounded font-bold text-sm hover:bg-white"
                        >
                            <Plus size={16}/> Add License
                        </button>
                     </div>
                     <table className="w-full text-left text-sm text-gray-300">
                        <thead className="text-xs uppercase bg-black/30 text-gray-500">
                           <tr>
                              <th className="px-6 py-4">Product</th>
                              <th className="px-6 py-4">Key</th>
                              <th className="px-6 py-4">Assigned To</th>
                              <th className="px-6 py-4">Expiry</th>
                              <th className="px-6 py-4">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {licenses.map(lic => (
                              <tr key={lic.id} className="hover:bg-white/5">
                                 <td className="px-6 py-4 font-bold text-white">{lic.productName}</td>
                                 <td className="px-6 py-4 font-mono text-xs text-cyber-primary">{lic.licenseKey}</td>
                                 <td className="px-6 py-4">
                                    {lic.assignedToUserName ? (
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {lic.assignedToUserName}
                                        </div>
                                    ) : <span className="text-gray-600 italic">Available</span>}
                                 </td>
                                 <td className="px-6 py-4">{lic.expiryDate}</td>
                                 <td className="px-6 py-4 flex items-center gap-2">
                                     <button onClick={() => { setEditingLicense(lic); setIsLicenseModalOpen(true); }} className="p-2 bg-white/5 rounded hover:bg-white/20 text-white"><Edit size={14}/></button>
                                     <button onClick={() => deleteLicense(lic.id)} className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white"><Trash2 size={14}/></button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                 </div>
              )}

              {/* --- BLOG TAB --- */}
              {activeTab === 'blog' && (
                 <div className="bg-cyber-panel p-8 rounded-xl border border-white/5 animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* EDITING AREA */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Publish Content</h2>
                            <div className="flex gap-2">
                                <button onClick={clearBlogForm} className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold border border-white/20 px-3 py-1 rounded hover:bg-white/10 transition-colors">
                                    <RefreshCw size={14} /> Reset
                                </button>
                                <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-cyber-primary text-xs uppercase font-bold border border-cyber-primary/50 px-3 py-1 rounded hover:bg-cyber-primary hover:text-black transition-colors">
                                    <Eye size={14} /> {showPreview ? 'Edit Mode' : 'Live Preview'}
                                </button>
                            </div>
                        </div>
                        
                        <form onSubmit={publishBlog} className={`space-y-6 ${showPreview ? 'hidden' : 'block'}`}>
                           {/* Cover Image */}
                           <div 
                                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-cyber-primary hover:bg-white/5 transition-all"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                {blogImage ? (
                                    <div className="relative h-40 w-full">
                                        <img src={blogImage} className="h-full w-full object-cover rounded-lg" alt="Cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity text-white font-bold">Change Image</div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <ImageIcon size={32} />
                                        <span className="text-sm">Click to Upload Cover Image</span>
                                    </div>
                                )}
                           </div>

                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
                                 <input required value={blogPost.title} onChange={e => setBlogPost({...blogPost, title: e.target.value})} type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
                                 <select value={blogPost.category} onChange={e => setBlogPost({...blogPost, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none">
                                    <option>General</option>
                                    <option>Engineering</option>
                                    <option>Analytics</option>
                                    <option>Success Story</option>
                                 </select>
                              </div>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Excerpt</label>
                              <textarea required value={blogPost.excerpt} onChange={e => setBlogPost({...blogPost, excerpt: e.target.value})} rows={2} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none" />
                           </div>
                           
                           {/* Rich Text Editor Simulation */}
                           <div>
                              <div className="flex justify-between items-center mb-2">
                                  <label className="block text-xs font-bold text-gray-500 uppercase">Content (HTML Supported)</label>
                                  <div className="flex gap-2">
                                      <button type="button" onClick={() => insertFormatting('<b></b>')} className="p-1 hover:bg-white/10 rounded" title="Bold"><Bold size={14} className="text-gray-400"/></button>
                                      <button type="button" onClick={() => insertFormatting('<i></i>')} className="p-1 hover:bg-white/10 rounded" title="Italic"><Italic size={14} className="text-gray-400"/></button>
                                      <button type="button" onClick={() => insertFormatting('<ul><li></li></ul>')} className="p-1 hover:bg-white/10 rounded" title="List"><List size={14} className="text-gray-400"/></button>
                                      <button type="button" onClick={() => insertFormatting('<a href="#"></a>')} className="p-1 hover:bg-white/10 rounded" title="Link"><LinkIcon size={14} className="text-gray-400"/></button>
                                  </div>
                              </div>
                              <textarea 
                                required 
                                value={blogPost.content} 
                                onChange={e => setBlogPost({...blogPost, content: e.target.value})} 
                                rows={12} 
                                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none font-mono text-sm" 
                                placeholder="Write your post here using HTML tags..."
                              />
                           </div>

                           <div className="flex justify-end">
                              <button type="submit" className="px-8 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
                                 <Rocket size={18} /> Publish Post
                              </button>
                           </div>
                        </form>
                    </div>

                    {/* LIVE PREVIEW AREA */}
                    <div className={`${showPreview ? 'block' : 'hidden lg:block'} bg-white text-black rounded-xl overflow-hidden shadow-2xl h-[800px] overflow-y-auto`}>
                        <div className="bg-gray-100 p-4 border-b text-xs font-mono text-gray-500 text-center uppercase tracking-widest">
                            Preview Window
                        </div>
                        {blogImage && <img src={blogImage} className="w-full h-48 object-cover" alt="Preview Cover" />}
                        <div className="p-8">
                             <div className="text-xs font-bold text-cyber-secondary uppercase mb-2">{blogPost.category || 'Category'}</div>
                             <h1 className="text-3xl font-bold mb-4">{blogPost.title || 'Your Post Title'}</h1>
                             <div className="flex items-center gap-4 text-gray-500 text-sm mb-8">
                                 <span>{new Date().toLocaleDateString()}</span>
                                 <span>By {currentUser?.name}</span>
                             </div>
                             <div 
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: blogPost.content || '<p class="text-gray-400 italic">Start typing to see content...</p>' }}
                             />
                        </div>
                    </div>

                 </div>
              )}

           </div>
        </div>
        
        {/* --- MODALS --- */}

        {/* 1. USER DETAIL MODAL (Fully Editable for Admin) */}
        {selectedUser && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedUser(null)}>
              <div className="w-full max-w-4xl bg-cyber-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                 {/* Header */}
                 <div className="p-8 bg-gradient-to-r from-cyber-primary/10 to-transparent border-b border-white/10 flex justify-between items-start">
                    <div className="flex gap-6 w-full">
                       <div className="w-20 h-20 bg-cyber-primary rounded-xl flex items-center justify-center text-3xl font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] flex-shrink-0">
                          {selectedUser.name.charAt(0)}
                       </div>
                       <div className="flex-1">
                          {isEditingUser ? (
                              <div className="grid grid-cols-2 gap-4 mb-2">
                                  <input type="text" value={selectedUser.name} onChange={e => setSelectedUser({...selectedUser, name: e.target.value})} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white font-bold"/>
                                  <input type="text" value={selectedUser.email} onChange={e => setSelectedUser({...selectedUser, email: e.target.value})} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-sm"/>
                                  <select value={selectedUser.role} onChange={e => setSelectedUser({...selectedUser, role: e.target.value as any})} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-sm">
                                      <option value="partner">Partner</option>
                                      <option value="admin">Admin</option>
                                  </select>
                                  <div className="flex items-center gap-2">
                                      <input type="checkbox" checked={selectedUser.canWriteBlog} onChange={e => setSelectedUser({...selectedUser, canWriteBlog: e.target.checked})} />
                                      <span className="text-gray-300 text-sm">Can Write Blog</span>
                                  </div>
                              </div>
                          ) : (
                              <>
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedUser.name}</h2>
                                <div className="flex items-center gap-4 text-gray-400 text-sm">
                                    <span>{selectedUser.email}</span>
                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                    <span className="uppercase font-bold text-cyber-primary">{selectedUser.role}</span>
                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                    <span>Joined {selectedUser.joinedDate}</span>
                                </div>
                              </>
                          )}
                          
                          <div className="flex gap-2 mt-4 items-center">
                             {!isEditingUser && selectedUser.skills?.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">{skill}</span>
                             ))}
                             {isEditingUser && (
                                 <input 
                                    type="text" 
                                    value={selectedUser.skills?.join(', ')} 
                                    onChange={e => setSelectedUser({...selectedUser, skills: e.target.value.split(',').map(s=>s.trim())})} 
                                    className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs" 
                                    placeholder="Skills (comma separated)"
                                 />
                             )}
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/10 rounded-full self-end"><X size={24} className="text-gray-400"/></button>
                        {currentUser?.role === 'admin' && !isEditingUser && (
                            <button onClick={() => setIsEditingUser(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-xs uppercase font-bold">
                                <Edit size={14}/> Edit Profile
                            </button>
                        )}
                        {isEditingUser && (
                            <button onClick={saveUserChanges} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400 text-xs uppercase font-bold">
                                <Save size={14}/> Save Changes
                            </button>
                        )}
                    </div>
                 </div>

                 <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* LEFT COL: CASE LOCKING */}
                    <div>
                       <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                             <Lock size={20} className="text-cyber-secondary"/> Locked Cases
                          </h3>
                          <button onClick={() => setIsAddLeadOpen(true)} className="text-xs bg-cyber-secondary text-white px-3 py-1 rounded hover:bg-white hover:text-black transition-colors font-bold">+ Lock Case</button>
                       </div>
                       
                       {/* Add Lead Form (Inline) */}
                       {isAddLeadOpen && (
                          <div className="bg-white/5 p-4 rounded-lg mb-4 border border-white/10 animate-fade-in">
                             <h4 className="text-white font-bold text-sm mb-3">Lock New Opportunity</h4>
                             <div className="space-y-3">
                                <input placeholder="Client/Deal Name" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})}/>
                                <div className="grid grid-cols-2 gap-3">
                                   <input placeholder="Company" className="bg-black border border-white/10 rounded px-3 py-2 text-white text-sm" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})}/>
                                   <input type="number" placeholder="Est. Value ($)" className="bg-black border border-white/10 rounded px-3 py-2 text-white text-sm" value={newLead.value} onChange={e => setNewLead({...newLead, value: Number(e.target.value)})}/>
                                </div>
                                <textarea placeholder="Notes / Requirements" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm h-20" value={newLead.notes} onChange={e => setNewLead({...newLead, notes: e.target.value})}></textarea>
                                <div className="flex gap-2">
                                   <button onClick={addLeadToUser} className="bg-cyber-secondary text-white px-4 py-2 rounded text-xs font-bold">Lock Deal</button>
                                   <button onClick={() => setIsAddLeadOpen(false)} className="text-gray-400 px-4 py-2 text-xs">Cancel</button>
                                </div>
                             </div>
                          </div>
                       )}

                       <div className="space-y-3">
                          {selectedUser.leads && selectedUser.leads.length > 0 ? (
                             selectedUser.leads.map(lead => (
                                <div key={lead.id} className="bg-black/30 p-4 rounded border-l-2 border-cyber-secondary flex justify-between items-center">
                                   <div>
                                      <div className="font-bold text-white text-sm">{lead.name}</div>
                                      <div className="text-xs text-gray-500">{lead.company} • ${lead.value.toLocaleString()}</div>
                                   </div>
                                   <div className="text-right">
                                      <div className="text-[10px] uppercase font-bold text-yellow-500">{lead.status}</div>
                                      <div className="text-[10px] text-gray-600">{lead.date}</div>
                                   </div>
                                </div>
                             ))
                          ) : (
                             <div className="text-gray-500 text-sm italic">No active cases locked.</div>
                          )}
                       </div>
                    </div>

                    {/* RIGHT COL: LICENSES & EARNINGS */}
                    <div className="space-y-8">
                       <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                          <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Total Partner Earnings</h3>
                          {isEditingUser ? (
                              <input 
                                type="number" 
                                value={selectedUser.earnings} 
                                onChange={e => setSelectedUser({...selectedUser, earnings: Number(e.target.value)})}
                                className="w-full bg-black border border-cyber-primary rounded px-3 py-2 text-cyber-primary font-bold text-2xl"
                              />
                          ) : (
                              <div className="text-3xl font-bold text-cyber-primary">${selectedUser.earnings.toLocaleString()}</div>
                          )}
                          
                          <div className="mt-4 text-xs text-gray-500">
                             {isEditingUser ? "Enter new amount to update earnings." : "Admin can edit this value in Edit Profile mode."}
                          </div>
                       </div>

                       <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                             <Key size={20} className="text-cyber-primary"/> Assigned Licenses
                          </h3>
                          <div className="space-y-3">
                             {licenses.filter(l => l.assignedToUserId === selectedUser.id).length > 0 ? (
                                licenses.filter(l => l.assignedToUserId === selectedUser.id).map(lic => (
                                   <div key={lic.id} className="bg-black/30 p-4 rounded border border-white/10 flex justify-between items-center">
                                      <div>
                                         <div className="font-bold text-white text-sm">{lic.productName}</div>
                                         <div className="text-xs text-gray-500 font-mono">{lic.licenseKey}</div>
                                      </div>
                                      <div className="text-xs text-gray-400">Exp: {lic.expiryDate}</div>
                                   </div>
                                ))
                             ) : (
                                <div className="text-gray-500 text-sm italic">No licenses assigned. Use 'License Manager' tab to assign.</div>
                             )}
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
           </div>
        )}

        {/* 2. TICKET DETAIL MODAL (With Full Status Control) */}
        {selectedTicket && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedTicket(null)}>
              <div className="w-full max-w-2xl bg-cyber-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                 <div className="p-6 border-b border-white/10 flex justify-between items-start">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-1 bg-cyber-primary/20 text-cyber-primary text-xs font-bold uppercase rounded">{selectedTicket.type}</span>
                          <span className="text-gray-500 text-xs">#{selectedTicket.id}</span>
                       </div>
                       <h2 className="text-2xl font-bold text-white">{selectedTicket.subject}</h2>
                    </div>
                    <button onClick={() => setSelectedTicket(null)}><X className="text-gray-400 hover:text-white"/></button>
                 </div>
                 
                 <div className="p-8 space-y-6">
                    <div>
                       <h4 className="text-gray-500 text-xs uppercase font-bold mb-2">Description</h4>
                       <p className="text-gray-300 leading-relaxed bg-black/30 p-4 rounded border border-white/5">
                          {selectedTicket.description}
                       </p>
                    </div>

                    {/* Admin Action Area */}
                    {currentUser?.role === 'admin' ? (
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-6">
                            <h4 className="text-cyber-primary text-sm font-bold uppercase mb-4">Admin Resolution</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Status</label>
                                    <select 
                                        value={adminTicketAction.status} 
                                        onChange={e => setAdminTicketAction({...adminTicketAction, status: e.target.value})}
                                        className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white"
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Resolution Notes</label>
                                    <textarea 
                                        value={adminTicketAction.notes}
                                        onChange={e => setAdminTicketAction({...adminTicketAction, notes: e.target.value})}
                                        className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white h-24"
                                        placeholder="Enter notes visible to partner..."
                                    />
                                </div>
                                <button onClick={updateTicketStatus} className="bg-cyber-primary text-black font-bold py-2 rounded hover:bg-white transition-colors">
                                    Update Ticket
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <h4 className="text-gray-400 text-sm font-bold uppercase mb-2">Admin Response</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                    selectedTicket.status === 'Resolved' ? 'bg-green-500/20 text-green-500' : 
                                    selectedTicket.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                                    'bg-yellow-500/20 text-yellow-500'
                                }`}>{selectedTicket.status}</span>
                            </div>
                            {selectedTicket.adminNotes && (
                                <p className="text-sm text-gray-300 italic">"{selectedTicket.adminNotes}"</p>
                            )}
                        </div>
                    )}
                 </div>
              </div>
           </div>
        )}

        {/* 3. LICENSE ADD/EDIT MODAL */}
        {isLicenseModalOpen && editingLicense && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-cyber-panel border border-white/10 rounded-2xl shadow-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Manage License</h3>
                    <div className="space-y-4">
                        <input 
                            placeholder="Product Name" 
                            className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white"
                            value={editingLicense.productName}
                            onChange={e => setEditingLicense({...editingLicense, productName: e.target.value})}
                        />
                        <input 
                            placeholder="License Key" 
                            className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white"
                            value={editingLicense.licenseKey}
                            onChange={e => setEditingLicense({...editingLicense, licenseKey: e.target.value})}
                        />
                        <input 
                            placeholder="Expiry Date (YYYY-MM-DD)" 
                            type="date"
                            className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white"
                            value={editingLicense.expiryDate}
                            onChange={e => setEditingLicense({...editingLicense, expiryDate: e.target.value})}
                        />
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Assign to User</label>
                            <select 
                                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white"
                                value={editingLicense.assignedToUserId || ''}
                                onChange={e => setEditingLicense({...editingLicense, assignedToUserId: e.target.value || undefined})}
                            >
                                <option value="">-- Unassigned --</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <button onClick={saveLicense} className="flex-1 bg-cyber-primary text-black font-bold py-2 rounded">Save</button>
                            <button onClick={() => setIsLicenseModalOpen(false)} className="flex-1 bg-white/10 text-white font-bold py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};