import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface InsuranceFAQProps {
  onWhatsApp: (service: 'Health Insurance' | 'Term Insurance') => void;
}

export const InsuranceFAQ: React.FC<InsuranceFAQProps> = ({ onWhatsApp }) => {
  const faqs = [
    {
      id: 'faq-1',
      question: 'What is the difference between health insurance and term life insurance?',
      answer:
        'Health insurance covers living medical costs — such as hospital admissions, surgical fees, diagnostics, and doctor consultations — protecting your savings when illness strikes. Term life insurance provides a pure death benefit: if the policyholder passes away during the policy term, a tax-free lump-sum payout is delivered to nominated family dependants to replace lost future income and clear outstanding liabilities. Both serve complementary, non-overlapping functions: health insurance protects you while you are alive, and term insurance financially shields your dependants if you are no longer there.',
    },
    {
      id: 'faq-2',
      question: 'How much health insurance coverage might a family need?',
      answer:
        'With Indian healthcare inflation exceeding 12-14% annually, a standard ₹3 Lakh to ₹5 Lakh corporate policy is rarely sufficient for major procedures (such as organ transplants, bypass surgeries, or prolonged ICU stays). For an urban family living in a Tier 1 or Tier 2 city, financial planners generally suggest a base cover of at least ₹10 Lakhs to ₹25 Lakhs, or a cost-effective combination of a ₹5 Lakh base plan coupled with a ₹20-25 Lakh Super Top-up policy. If you have senior parents (age 55+), consider buying them a separate individual policy so their claims do not deplete the family floater pool.',
    },
    {
      id: 'faq-3',
      question: 'How can I estimate my term life insurance requirement?',
      answer:
        'The most dependable method is the Needs-Based Human Life Value (HLV) calculation. Calculate: (1) Your family’s annual living expenses multiplied by the number of years until your dependants become self-sufficient (typically 15 to 25 years), PLUS (2) all outstanding liabilities like home loans, car loans, or personal debt, PLUS (3) future earmarked milestones like children’s higher education degrees, MINUS (4) your existing liquid investments (mutual funds, fixed deposits) allocated for family safety. As a quick rule of thumb, most working breadwinners need between 15x to 20x their annual income in pure term cover.',
    },
    {
      id: 'faq-4',
      question: 'What are waiting periods and exclusions in health insurance?',
      answer:
        'A waiting period is a contractual timeframe during which certain claims will not be paid. In health policies, this includes: an initial 30-day moratorium for any illness (except accident injuries, which are covered immediately); a 1-to-2 year wait for specific slow-developing illnesses (such as hernia, cataract, ENT surgeries, joint replacement); and a 2-to-3 year wait for Pre-Existing Diseases (PED) declared at the time of purchase. Exclusions are conditions or expenses permanently not covered, such as cosmetic surgery, self-inflicted injuries, experimental treatments, and standard non-medical consumables (PPE kits, gloves, syringes) unless you add a consumables rider.',
    },
    {
      id: 'faq-5',
      question: 'What is the difference between cashless and reimbursement claims?',
      answer:
        'Cashless claims occur at "network hospitals" partnered with your insurance company or Third-Party Administrator (TPA). The hospital sends pre-authorization documents to the insurer, who settles covered bills directly, leaving you to pay only for non-medical consumables or deductible amounts. Reimbursement claims occur when you seek treatment at a non-network hospital or if cashless pre-authorization is denied. You pay the hospital bill out-of-pocket and subsequently submit original discharge summaries, itemized bills, pharmacy receipts, and diagnostic reports to the insurer for reimbursement.',
    },
    {
      id: 'faq-6',
      question: 'What should I check before purchasing a policy?',
      answer:
        'Before paying your premium, check: (1) Room rent terms — ensure there is NO 1% room-rent cap to prevent proportionate deduction traps across surgeon and OT fees; (2) Network hospital presence in your city and neighborhood; (3) Co-payment clauses — confirm 0% co-pay for members under 60; (4) Pre-Existing Disease waiting period (prefer 2-3 years over 4); (5) Pre & post-hospitalization coverage window (ideally 60 days pre and 180 days post); (6) Restoration/Recharge benefits; and (7) Incurred Claim Ratio (ICR for health, 70-85% is ideal) and Amount Settlement Ratio (ASR for term, >92%).',
    },
    {
      id: 'faq-7',
      question: 'Why must information in an insurance application be accurate?',
      answer:
        'Insurance contracts operate under the principle of "Utmost Good Faith" (Uberrimae Fidei). If you fail to disclose smoking or tobacco use, past surgeries, chronic conditions (like hypertension or diabetes), or other active life insurance policies, the insurer can legally reject your claim later citing non-disclosure or material misrepresentation. Under Section 45 of the Insurance Act, while policies cannot be challenged after 3 years except on fraud grounds, absolute honesty from day one ensures that your family will never face claim contestation in an emergency.',
    },
    {
      id: 'faq-8',
      question: 'What documents are typically needed when making a claim?',
      answer:
        'For health hospitalization claims: doctor\'s first prescription recommending admission, complete discharge summary with diagnosis, detailed hospital break-up bill with receipts, pharmacy receipts with prescription slips, diagnostic reports (blood tests, imaging), and KYC/cancelled cheque for direct bank transfer. In accident cases, an MLC (Medico-Legal Certificate) or police FIR copy may be required. For term life claims: official death certificate, original policy document, claimant statement form, hospital death summary or post-mortem report (in accidental deaths), and nominee KYC with bank verification.',
    },
    {
      id: 'faq-9',
      question: 'Can I review or change my insurance later?',
      answer:
        'Yes. Every new life or health policy comes with a mandatory "Free Look Period" (typically 15 to 30 days from document receipt) during which you can cancel for a refund if unsatisfied with the fine print. For health insurance, you can also "port" your existing policy to a different insurer at annual renewal without losing your accrued waiting period credits (under IRDAI portability regulations), provided you submit portability requests at least 45 days prior to renewal. For term insurance, sum assured cannot usually be decreased or transferred, but some plans feature life-stage increment options upon marriage or childbirth.',
    },
    {
      id: 'faq-10',
      question: 'How can Finance Brunch help me understand my options?',
      answer:
        'Finance Brunch operates as an independent financial education and advisory resource. We audit your existing corporate and personal covers, highlight hidden restrictions in policy wordings, help you estimate realistic protection sums using objective financial formulas, and guide you through proposal form declarations. We do not sell your contact details to aggressive tele-callers or push commission-heavy endowment plans. You can schedule a consultation with our certified advisors or connect directly via WhatsApp to discuss your specific family situation.',
    },
  ];

  return (
    <section id="insurance-faq" className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            Got Questions?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Straightforward answers to the most common questions regarding health coverage,
            term life estimation, waiting periods, and claim procedures.
          </p>
        </div>

        {/* Radix Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible defaultValue="faq-1" className="w-full space-y-4">
            {faqs.map(faq => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-1 bg-slate-50/60 dark:bg-slate-900/40 data-[state=open]:bg-white dark:data-[state=open]:bg-slate-900 data-[state=open]:shadow-md transition-all"
              >
                <AccordionTrigger className="text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:no-underline hover:text-blue-600 dark:hover:text-cyan-400 py-4">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Have a question specific to your medical history or existing policy?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="sm"
              category="success"
              rightIcon={<Phone className="h-4 w-4" />}
              onClick={() => onWhatsApp('Health Insurance')}
              className="text-xs sm:text-sm font-semibold"
            >
              Ask on WhatsApp
            </Button>
            <Link to="/contact?service=Insurance+Planning">
              <Button
                size="sm"
                category="secondary"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="text-xs sm:text-sm font-semibold"
              >
                Submit Query via Contact Form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
