
import { Link } from 'react-router-dom';

interface BottomSectionProps {
  currentYear: number;
}

export const BottomSection = ({ currentYear }: BottomSectionProps) => {
  return (
    <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
          © {currentYear} FinanceBrunch Strategies Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link 
            to="/privacy-policy"
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms-of-service"
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
          >
            Terms of Service
          </Link>
          <Link 
            to="/disclaimer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
          >
            Disclaimer
          </Link>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          CIN: U64990AP2025PTC118363
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-600 mt-2">
          Founded by SAIKARUN ARASADA. Our team consists of professionals with advanced certifications in financial planning from the Financial Planning Association (FPA), along with regulatory credentials including NISM certification, ARN registration, and IRDAI licensing, ensuring we deliver expert financial guidance compliant with industry standards.
        </p>
      </div>
    </div>
  );
};
