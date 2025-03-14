export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Last Updated: March 13, 2025</p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Agreement to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These Terms of Service constitute a legally binding agreement made between you and Xenovate ("we," "us," or "our"), concerning your access to and use of the Xenovate website and services.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Services</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Xenovate provides a platform for analyzing, optimizing, and converting code. Our services include:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Algorithm complexity analysis</li>
                <li>Code optimization suggestions</li>
                <li>Cross-language code translation</li>
                <li>Algorithm explanation</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify or discontinue, temporarily or permanently, the Services (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Services.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">User Registration</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You may be required to register with the Site to access certain features or services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Intellectual Property Rights</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The Content and Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">User Contributions</h2>
              <p className="text-gray-700 dark:text-gray-300">
                The Site may invite you to submit code or other content. By submitting code or content to the Site, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in any and all media or distribution methods (now known or later developed).
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You represent and warrant that you own or control all rights in and to any content you submit, and that such content does not violate these Terms of Service or any applicable law.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Prohibited Activities</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                As a user of the Site, you agree not to:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory</li>
                <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses by electronic or other means</li>
                <li>Use the Site to advertise or offer to sell goods and services</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Site</li>
                <li>Engage in unauthorized framing of or linking to the Site</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions or comments about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Email: terms@xenovate.com<br />
                Address: 123 Tech Lane, Innovation City, TC 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 