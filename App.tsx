import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SiteAssistant } from './components/SiteAssistant';
import { VideoSplash } from './components/VideoSplash';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Solutions } from './pages/Solutions';
import { SolutionDetail } from './pages/SolutionDetail';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { TechCoreDetail } from './pages/TechCoreDetail';

import AddBlog from './pages/AddBlog';



const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isCreator = location.pathname.startsWith('/creator');

  return (
    <>
      {!isDashboard && !isCreator && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isDashboard && !isCreator && <Footer />}
      {!isCreator && <SiteAssistant />}
    </>
  );
};
// test


function App() {
  // Check localStorage to see if we should show splash (only on first visit)
  const [showSplash, setShowSplash] = useState(() => {
    const splashShown = localStorage.getItem('cybersync_splash_shown');
    return !splashShown;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('cybersync_splash_shown', 'true');
  };

  return (
    <>
      {showSplash && (
        <VideoSplash
          videoSrc="/Final2.mp4"
          onComplete={handleSplashComplete}
          minDuration={3000}
        />
      )}
      
      {!showSplash && (
        <Router>
          <div className="min-h-screen  text-white">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/:id" element={<SolutionDetail />} />
                <Route path="/tech-core/:id" element={<TechCoreDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/creator/addblog" element={<AddBlog />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;