
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, GraduationCap } from "lucide-react";

const USTaxSection: React.FC = () => {
  return (
    <section id="global-tax" className="py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-lg transform rotate-3"></div>
                <Card className="relative z-10">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <CardTitle className="flex items-center text-2xl">
                      <Globe className="mr-2 h-6 w-6 text-blue-600" />
                      Coming Soon: US Tax Filing Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      We're expanding our tax expertise to serve individuals with US tax obligations. Our upcoming services will include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                      <li>Federal and State tax returns for US citizens and residents</li>
                      <li>FBAR (Foreign Bank Account Report) filing</li>
                      <li>Foreign tax credit optimization</li>
                      <li>Expatriate tax planning and compliance</li>
                      <li>International tax treaty guidance</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="font-medium">
                        Coming in Q3 2025. Pre-register now to get priority access and special introductory rates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Global Tax Expertise at Your Service
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our expanding team includes tax professionals with international certifications and experience in handling cross-border tax matters.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Expert Team</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Led by Sarah Johnson, CPA (USA) and Rahul Mehta, CA (India) with combined experience of 25+ years in international taxation.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Certified Professionals</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our team holds certifications from American Institute of CPAs (AICPA), IRS Enrolled Agent status, and Institute of Chartered Accountants of India (ICAI).
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="button-hover mt-6">
              Pre-register for US Tax Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USTaxSection;
