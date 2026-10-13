
import React, { useEffect } from 'react';

import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">            
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary mb-2">
              Privacy Policy
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Effective Date: 01-01-2025
            </p>
            
            <Separator className="mb-8" />
            
            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <div>
                <p className="mb-4">
                  Finance Brunch ("Company," "we," "our," or "us") values your trust and is committed to safeguarding your privacy with the highest legal and security standards. This Privacy Policy outlines how we collect, process, store, and protect personal information when you use our website (www.financebrunch.in), mobile application, and related services (collectively, the "Services"). By accessing or using our Services, you acknowledge and agree to this Privacy Policy and the terms set forth herein. This policy complies with applicable global data protection regulations, including but not limited to the General Data Protection Regulation (GDPR) of the European Union, the California Consumer Privacy Act (CCPA), the Information Technology Act, 2000 (India), the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules"), the Personal Data Protection Bill, 2019 (India), and other relevant international privacy laws.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Collection and Use of Personal Data
                </h2>
                <p className="mb-4">
                  We collect both personal and non-personal data, including but not limited to your name, contact details, financial information, regulatory documents, IP address, device identifiers, and browsing history. This information is used to facilitate financial transactions, verify identity, personalize services, comply with legal and regulatory obligations, and enhance security. By using our Services, you authorize Finance Brunch, including its authorized representatives and business partners, to contact you via email, phone, or SMS for financial product offers, regulatory updates, and promotional services, even if you are registered under Do Not Disturb (DND), Do Not Call (DNC), or the National Consumer Protection Register (NCPR).
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Legal Basis for Processing Data
                </h2>
                <p className="mb-4">
                  We process your personal data based on the following legal grounds: (i) your consent; (ii) performance of a contract; (iii) compliance with legal obligations; and (iv) legitimate business interests, provided they do not override your fundamental rights. In jurisdictions where explicit consent is required, we obtain such consent before collecting sensitive data.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Data Sharing and Disclosure
                </h2>
                <p className="mb-4">
                  We do not sell or rent personal data; however, we may share it with regulatory authorities, financial institutions (insurance companies, asset management companies, digital gold providers), service providers, or third parties engaged in compliance and fraud prevention. We may disclose personal information when required by law, regulatory authorities, law enforcement, or court orders in accordance with global legal frameworks such as GDPR, CCPA, and Indian IT laws. Cross-border data transfers are conducted in compliance with applicable legal safeguards, including Standard Contractual Clauses (SCCs), Binding Corporate Rules (BCRs), and other regulatory requirements.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Data Security and Retention
                </h2>
                <p className="mb-4">
                  We implement stringent security measures, including SSL encryption, two-factor authentication, access control mechanisms, and regular cybersecurity audits to protect your data from unauthorized access, loss, or misuse. While we take reasonable precautions, no data transmission over the Internet is entirely secure, and users are responsible for maintaining the confidentiality of their credentials. We retain personal data only as long as necessary for business, regulatory, and legal purposes and delete or anonymize data upon expiration of retention periods in compliance with applicable laws.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Your Rights and Choices
                </h2>
                <p className="mb-4">
                  Depending on your jurisdiction, you may have rights under GDPR, CCPA, or other applicable laws, including the right to access, correct, delete, or restrict processing of your data, the right to data portability, the right to object to processing, and the right to withdraw consent. You may also opt out of marketing communications by contacting us at admin@financebrunch.in. We process such requests within legally mandated timeframes and in accordance with applicable regulations.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Cookies and Tracking Technologies
                </h2>
                <p className="mb-4">
                  We use cookies, web beacons, and similar tracking technologies to enhance user experience, improve security, and analyze trends. You may modify your browser settings to refuse cookies, but certain features of our Services may not function properly as a result.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Third-Party Links and External Sites
                </h2>
                <p className="mb-4">
                  Our website may contain links to third-party websites. We are not responsible for their privacy policies, practices, or content, and we encourage users to review third-party privacy policies before providing any personal data.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Regulatory Compliance and International Operations
                </h2>
                <p className="mb-4">
                  As a global service provider, Finance Brunch complies with multiple data protection regulations, including GDPR (EU), CCPA (California), India's IT Act & SPDI Rules, and other applicable international laws. Any disputes or concerns regarding data protection will be governed by the relevant jurisdictional laws. Users from the European Union can contact our designated Data Protection Representative under GDPR for assistance.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Changes to This Privacy Policy
                </h2>
                <p className="mb-4">
                  We reserve the right to update this Privacy Policy periodically to reflect changes in legal requirements, business practices, or technological advancements. Changes will be posted on our website, and continued use of our Services constitutes acceptance of the revised policy.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Grievance Redressal and Contact Information
                </h2>
                <p className="mb-4">
                  For privacy concerns, to exercise your data rights, or to report a security breach, contact our Data Protection Officer:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Email: <a href="mailto:admin@financebrunch.in" className="text-blue-600 dark:text-blue-400 hover:underline">admin@financebrunch.in</a></li>
                  <li>WhatsApp: <a href="https://wa.me/917842494981" className="text-blue-600 dark:text-blue-400 hover:underline">+91 7842494981</a></li>
                  <li>Legal Representative for EU and UK GDPR Compliance: [Insert Representative Details]</li>
                </ul>
              </div>
              
              <div>
                <p className="italic text-gray-600 dark:text-gray-400">
                  By using our Services, you acknowledge that you have read, understood, and agreed to this Privacy Policy and its terms.
                </p>
              </div>
              
              <div className="text-center mt-8 mb-4">
                <Link to="/">
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    Back to Home Page
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
