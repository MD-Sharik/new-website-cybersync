import React from 'react';
import { Shield, Lock, Eye, Server, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
            Privacy <span className="text-cyber-primary">Policy</span>
          </h1>
          <p className="text-lg text-gray-400">
            Last Updated: October 2024
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="text-cyber-primary" /> 1. Introduction
            </h2>
            <p className="leading-relaxed mb-4">
              Welcome to Cyber Sync ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy, or our practices with regards to your personal information, please contact us at info@cyber-sync.in.
            </p>
            <p className="leading-relaxed">
              When you visit our website https://www.cyber-sync.in, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="text-cyber-secondary" /> 2. Information We Collect
            </h2>
            <p className="leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
              <li><strong>Personal Data:</strong> Name, Email Address, Phone Number, Company Name, Job Title.</li>
              <li><strong>Credentials:</strong> Passwords and security information used for authentication and account access.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Server className="text-cyber-accent" /> 3. How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-4">
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To fulfill and manage your orders and software licenses.</li>
              <li>To request feedback and contact you about your use of our website.</li>
              <li>To protect our Services (e.g., fraud monitoring and prevention).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="text-green-400" /> 4. Data Security
            </h2>
            <p className="leading-relaxed">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk. You should only access the services within a secure environment.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="text-cyber-maple" /> 5. Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              If you have questions or comments about this policy, you may email us at <a href="mailto:info@cyber-sync.in" className="text-cyber-primary hover:underline">info@cyber-sync.in</a> or by post to:
            </p>
            <address className="not-italic text-gray-400">
              Cyber Sync Technologies<br />
              Gurugram, Haryana<br />
              India
            </address>
          </section>

        </div>
      </div>
    </div>
  );
};
