
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RegimeComparisonSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Understanding Tax Regimes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare the New and Old Tax Regimes to make an informed decision on which is better for your financial situation.
          </p>
        </div>
        
        <Tabs defaultValue="fy-2024-2025" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="fy-2024-2025">FY 2024-2025</TabsTrigger>
            <TabsTrigger value="fy-2025-2026">FY 2025-2026</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fy-2024-2025" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                  <CardTitle className="text-blue-600 dark:text-blue-400">New Tax Regime (Default)</CardTitle>
                  <CardDescription>Simplified structure with lower tax rates but fewer exemptions</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Tax Slabs for FY 2024-25 (AY 2025-26):</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex justify-between">
                      <span>Up to ₹3,00,000</span>
                      <span className="font-medium">NIL</span>
                    </li>
                    <li className="flex justify-between">
                      <span>₹3,00,001 to ₹6,00,000</span>
                      <span className="font-medium">5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>₹6,00,001 to ₹9,00,000</span>
                      <span className="font-medium">10%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>₹9,00,001 to ₹12,00,000</span>
                      <span className="font-medium">15%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>₹12,00,001 to ₹15,00,000</span>
                      <span className="font-medium">20%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Above ₹15,00,000</span>
                      <span className="font-medium">30%</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Standard Deduction of ₹50,000 for salaried individuals</li>
                    <li>No deductions under Chapter VI-A (80C, 80D, etc.)</li>
                    <li>No House Rent Allowance exemptions</li>
                    <li>No LTA or other allowance exemptions</li>
                    <li>Simplified tax calculation</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gray-50 dark:bg-gray-900">
                  <CardTitle className="text-gray-700 dark:text-gray-300">Old Tax Regime</CardTitle>
                  <CardDescription>Higher tax rates with multiple exemptions and deductions</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Tax Slabs for FY 2024-25 (AY 2025-26):</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex justify-between">
                      <span>Up to ₹2,50,000</span>
                      <span className="font-medium">NIL</span>
                    </li>
                    <li className="flex justify-between">
                      <span>₹2,50,001 to ₹5,00,000</span>
                      <span className="font-medium">5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>₹5,00,001 to ₹10,00,000</span>
                      <span className="font-medium">20%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Above ₹10,00,000</span>
                      <span className="font-medium">30%</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-semibold mb-2">Available Deductions:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Section 80C: Up to ₹1,50,000 (PPF, ELSS, Life Insurance)</li>
                    <li>Section 80D: Up to ₹25,000 for health insurance</li>
                    <li>Section 80E: Education loan interest</li>
                    <li>Section 24: Housing loan interest up to ₹2,00,000</li>
                    <li>HRA, LTA, and other allowance exemptions</li>
                    <li>Standard Deduction of ₹50,000</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Which regime should you choose?</h3>
              <p className="mb-4">The choice between tax regimes depends on your individual financial situation:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>New Regime may be beneficial if:</strong> You have limited investments and don't claim many deductions.</li>
                <li><strong>Old Regime may be beneficial if:</strong> You have significant investments under Section 80C, pay rent, have home loans, or other eligible deductions.</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="fy-2025-2026" className="space-y-8">
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Tax Changes for FY 2025-2026
              </h3>
              <p className="mt-2">
                The tax slabs and rates for FY 2025-2026 will be announced in the Union Budget. We will update this information as soon as it becomes available.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                  <CardTitle className="text-blue-600 dark:text-blue-400">Expected New Tax Regime</CardTitle>
                  <CardDescription>Based on current trends and announcements</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                    The government may continue to promote the New Tax Regime with potential adjustments to make it more attractive:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Possible increase in standard deduction amount</li>
                    <li>Potential introduction of limited deductions</li>
                    <li>Possible adjustment of tax slab thresholds</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gray-50 dark:bg-gray-900">
                  <CardTitle className="text-gray-700 dark:text-gray-300">Expected Old Tax Regime</CardTitle>
                  <CardDescription>Based on current trends and announcements</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                    The Old Tax Regime may see limited changes, as government focus has shifted to the New Regime:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Possible minor adjustments to deduction limits</li>
                    <li>Potential rationalization of certain exemptions</li>
                    <li>No major structural changes expected</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Stay updated with latest tax changes</h3>
              <p className="mb-3">Our team of tax experts constantly monitors policy changes and will provide timely updates and personalized guidance.</p>
              <Button className="button-hover">
                Subscribe to Tax Updates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RegimeComparisonSection;
