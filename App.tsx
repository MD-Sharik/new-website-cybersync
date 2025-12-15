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



const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboard && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isDashboard && <Footer />}
      <SiteAssistant />
    </>
  );
};
// test


function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <VideoSplash
          videoSrc="/Glossy Logo.mp4"
          onComplete={() => setShowSplash(false)}
          minDuration={3000}
        />
      )}
      
      {!showSplash && (
        <Router>
          <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary selection:text-black">
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
              </Routes>
            </Layout>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;