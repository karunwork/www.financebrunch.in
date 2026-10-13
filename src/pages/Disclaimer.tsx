
import React, { useEffect } from 'react';

import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Disclaimer = () => {
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
              Disclaimer
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Effective Date: 01-01-2025
            </p>
            
            <Separator className="mb-8" />
            
            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <div>
                <p className="mb-4">
                  Finance Brunch ("Company," "we," "our," or "us") provides information, tools, and services related to financial products, including but not limited to health insurance, term insurance, mutual fund distribution, and digital gold brokering. The content, materials, and services offered on our website (www.financebrunch.in) and related platforms are intended for informational and transactional purposes only. We do not provide financial advisory services, investment advice, or portfolio management services. Any financial decisions made based on our platform should be undertaken at the user's discretion and in consultation with a certified financial advisor or regulatory-authorized entity. Finance Brunch is not registered with the Securities and Exchange Board of India (SEBI) and does not hold any SEBI certifications.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  No Warranties and Limitation of Liability
                </h2>
                <p className="mb-4">
                  The information provided on our platform is obtained from reliable sources; however, we do not guarantee its accuracy, completeness, or applicability to any specific situation. Users acknowledge that investments in mutual funds, insurance policies, and digital assets are subject to market risks, regulatory changes, and financial uncertainties. Finance Brunch, its partners, directors, employees, or affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our services. We recommend users conduct independent research and seek professional advice before making financial commitments.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Regulatory Compliance and Risk Disclosure
                </h2>
                <p className="mb-4">
                  Finance Brunch operates in accordance with applicable global regulatory frameworks, including but not limited to the Information Technology Act, 2000 (India), the Personal Data Protection Bill, 2019 (India), the General Data Protection Regulation (GDPR) (EU), and the California Consumer Privacy Act (CCPA) (USA). However, compliance with local financial regulations varies by jurisdiction, and it is the user's responsibility to ensure that their use of our services aligns with applicable legal and regulatory requirements in their country of residence. We do not guarantee the regulatory validity of any third-party financial product or service listed on our platform.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Third-Party Services and External Links
                </h2>
                <p className="mb-4">
                  Finance Brunch may facilitate access to third-party financial services, including insurers, mutual fund providers, and gold brokers. However, we do not endorse, control, or assume responsibility for the accuracy, security, or practices of third-party websites or service providers. Users should review the respective terms, privacy policies, and risk disclosures of third-party platforms before engaging in any transactions.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Indemnification
                </h2>
                <p className="mb-4">
                  By using our services, you agree to indemnify, defend, and hold harmless Finance Brunch, its affiliates, employees, and partners from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from your use of our platform, violation of applicable laws, or breach of our terms and conditions.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Jurisdiction and Governing Law
                </h2>
                <p className="mb-4">
                  Any disputes or claims arising from the use of Finance Brunch's services shall be subject to the exclusive jurisdiction of the courts in India. Users accessing our services from outside India must comply with their respective country's financial regulations and assume any risks associated with international financial transactions.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Modifications and Updates
                </h2>
                <p className="mb-4">
                  We reserve the right to modify, update, or terminate this disclaimer at any time without prior notice. Users are encouraged to review this disclaimer periodically to stay informed of any changes.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Contact Information
                </h2>
                <p className="mb-4">
                  For any legal inquiries or regulatory concerns, contact us at:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Email: <a href="mailto:admin@financebrunch.in" className="text-blue-600 dark:text-blue-400 hover:underline">admin@financebrunch.in</a></li>
                  <li>WhatsApp: <a href="https://wa.me/917842494981" className="text-blue-600 dark:text-blue-400 hover:underline">+91 7842494981</a></li>
                </ul>
              </div>
              
              <div>
                <p className="italic text-gray-600 dark:text-gray-400">
                  By using our Services, you acknowledge that you have read, understood, and agreed to this Disclaimer and its terms.
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

export default Disclaimer;
