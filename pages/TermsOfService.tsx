import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
            Terms of <span className="text-cyber-secondary">Service</span>
          </h1>
          <p className="text-lg text-gray-400">
            Last Updated: October 2024
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="text-cyber-secondary" /> 1. Terms
            </h2>
            <p className="leading-relaxed">
              By accessing the website at https://www.cyber-sync.in, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="text-cyber-primary" /> 2. Use License
            </h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Cyber Sync's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-decimal list-inside space-y-2 ml-4 text-gray-400">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on Cyber Sync's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Cyber Sync at any time.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="text-cyber-accent" /> 3. Disclaimer
            </h2>
            <p className="leading-relaxed">
              The materials on Cyber Sync's website are provided on an 'as is' basis. Cyber Sync makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="leading-relaxed mt-4">
              Further, Cyber Sync does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Scale className="text-white" /> 4. Limitations
            </h2>
            <p className="leading-relaxed">
              In no event shall Cyber Sync or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cyber Sync's website, even if Cyber Sync or a Cyber Sync authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-cyber-panel p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
