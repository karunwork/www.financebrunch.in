import React, { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow bg-gray-50 dark:bg-gray-900 pt-20 pb-20 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-10 border border-gray-100 dark:border-gray-700">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary mb-2">
            Terms of Service
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Effective Date: 01-01-2025
          </p>

          <Separator className="mb-8" />

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <div>
              <p className="mb-4">
                Welcome to Finance Brunch ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website (www.financebrunch.in), mobile platforms, and related tools and services (collectively, the "Services"). By visiting or using any part of the Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to all terms and conditions, you may not access or use the Services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                1. Nature of Services and Financial Disclaimers
              </h2>
              <p className="mb-4">
                Finance Brunch provides information, calculators, and referral distribution assistance regarding financial instruments, including mutual funds, insurance policies, tax filing assistance, and investment planning concepts. The information provided does not constitute personalized legal, tax, or financial advice. All decisions to invest in securities, mutual funds, or insurance products are made solely at your discretion and risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                2. User Eligibility and Account Obligations
              </h2>
              <p className="mb-4">
                You must be at least 18 years of age or the age of legal majority in your jurisdiction to use our Services. You agree to provide accurate, truthful, and current information when submitting consultation inquiries, calculators, or contact forms. You are responsible for ensuring that your contact details remain accurate.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                3. Intellectual Property Rights
              </h2>
              <p className="mb-4">
                All content, branding, logos, trademarks, text, software, calculators, illustrations, and design elements featured on the platform are the exclusive intellectual property of FinanceBrunch Strategies Pvt. Ltd. or its licensors. You may not reproduce, copy, distribute, modify, reverse engineer, or exploit any portion of the platform without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                4. Third-Party Products and Services
              </h2>
              <p className="mb-4">
                Our Services may provide information regarding or facilitate connections with third-party insurance providers, asset management companies (AMCs), or banking institutions. Finance Brunch is not responsible or liable for any terms, conditions, acts, omissions, or performance of these third parties. Please review third-party policies and documentation before entering into binding commitments.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                5. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by applicable law, Finance Brunch, its directors, employees, affiliates, and partners shall not be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your use of or inability to use the platform, including financial loss, market downturns, or calculation discrepancies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                6. Governing Law & Jurisdiction
              </h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these Terms or the Services shall be subject to the exclusive jurisdiction of the competent courts located in Hyderabad, Telangana, India.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                7. Contact & Inquiries
              </h2>
              <p className="mb-4">
                If you have questions or concerns regarding these Terms of Service, please contact us at:
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
                <p><strong>FinanceBrunch Strategies Pvt. Ltd.</strong></p>
                <p>Email: <a href="mailto:admin@financebrunch.in" className="text-blue-600 dark:text-blue-400 hover:underline">admin@financebrunch.in</a></p>
                <p>Phone: +91 78424 94981</p>
                <p>Address: Financial District, Hyderabad, Telangana 500032, India</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <Link to="/">
              <Button className="button-hover">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
