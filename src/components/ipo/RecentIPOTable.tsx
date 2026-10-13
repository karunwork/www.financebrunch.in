
const pastIPOs = [
  {
    name: "Digital Payments Inc",
    sector: "Fintech",
    issuePrice: "₹1,100",
    listingPrice: "₹1,550",
    listingGain: "+41%",
    currentPrice: "₹1,750",
    overallReturn: "+59%",
    logoColor: "bg-purple-500"
  },
  {
    name: "Consumer Retail Group",
    sector: "Retail",
    issuePrice: "₹450",
    listingPrice: "₹520",
    listingGain: "+15.5%",
    currentPrice: "₹480",
    overallReturn: "+6.7%",
    logoColor: "bg-yellow-500"
  },
  {
    name: "Infrastructure Builders",
    sector: "Construction",
    issuePrice: "₹215",
    listingPrice: "₹190",
    listingGain: "-11.6%",
    currentPrice: "₹240",
    overallReturn: "+11.6%",
    logoColor: "bg-indigo-500"
  }
];

export const RecentIPOTable = () => {
  const getReturnColor = (returnValue: string) => {
    if (returnValue.startsWith('+')) return "text-green-600 dark:text-green-400";
    if (returnValue.startsWith('-')) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Recent IPO Performance</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Track record of our recent IPO recommendations and their market performance.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-indigo-50 dark:bg-indigo-900/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Sector</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Issue Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Listing Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Listing Gain</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Current Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Overall Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {pastIPOs.map((ipo, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg ${ipo.logoColor} flex items-center justify-center text-white font-bold text-sm mr-3`}>
                          {ipo.name.charAt(0)}
                        </div>
                        <span className="font-medium">{ipo.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ipo.sector}</td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400">{ipo.issuePrice}</td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400">{ipo.listingPrice}</td>
                    <td className={`px-6 py-4 text-right font-medium ${getReturnColor(ipo.listingGain)}`}>
                      {ipo.listingGain}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400">{ipo.currentPrice}</td>
                    <td className={`px-6 py-4 text-right font-medium ${getReturnColor(ipo.overallReturn)}`}>
                      {ipo.overallReturn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
