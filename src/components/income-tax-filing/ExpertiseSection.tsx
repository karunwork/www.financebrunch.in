
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpertiseSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose Our Tax Experts?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            With over 15 years of experience, our chartered accountants bring extensive knowledge and expertise to handle your tax filing needs with precision and care.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>15+ Years Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Our team has been assisting individuals and businesses with tax planning and filing for over a decade and a half, navigating through multiple tax reforms.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>Certified Professionals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Our team consists of Chartered Accountants with advanced certifications in taxation from ICAI, along with NISM, ARN, and IRDAI licenses.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>Personalized Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in providing tailored tax solutions that align with your specific financial situation, goals, and preferences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>End-to-End Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                From documentation and preparation to filing and post-filing support, we manage the entire tax process for you.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>Tax Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                We don't just file taxes; we help you plan strategically to minimize your tax liability legally and maximize your savings.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Our experts continuously stay updated with the latest tax laws, ensuring your tax compliance is always current and accurate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
