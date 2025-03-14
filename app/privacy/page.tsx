export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Last Updated: March 13, 2025</p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Xenovate ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Collection of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Personal Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When you register for an account, we collect personally identifiable information, such as your name, email address, and any other information you provide voluntarily. This information is used to fulfill or meet the reason you provided the information.
                </p>
                
                <h3 className="text-xl font-semibold">Code and Algorithm Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When you use our services to analyze, optimize, or convert code, we collect and process the code you provide. This information is used to provide the requested services and to improve our algorithms and models.
                </p>
                
                <h3 className="text-xl font-semibold">Usage Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We automatically collect certain information when you visit, use, or navigate our website. This information may include your IP address, browser type, operating system, referral URLs, device information, and pages visited. This information is used to analyze trends, administer the site, track users' movement, and gather demographic information.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Use of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Create and manage your account</li>
                <li>Process and analyze your code</li>
                <li>Provide technical support and respond to your inquiries</li>
                <li>Send you administrative emails and updates about your account</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Develop new products, services, and features</li>
                <li>Monitor and analyze usage and trends</li>
                <li>Prevent fraudulent transactions and monitor against theft</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Disclosure of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">By Law or to Protect Rights</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </p>
                
                <h3 className="text-xl font-semibold">Third-Party Service Providers</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                </p>
                
                <h3 className="text-xl font-semibold">Business Transfers</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Security of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Email: privacy@xenovate.com<br />
                Address: 123 Tech Lane, Innovation City, TC 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 