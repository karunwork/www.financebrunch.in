
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define the type for our share data
interface ShareData {
  stock: string;
  marketPrice: string;
  faceValue: string;
}

export function UnlistedSharesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ShareData;
    direction: 'ascending' | 'descending';
  } | null>(null);

  // Unlisted shares data from the image
  const sharesData: ShareData[] = [
    { stock: "SBI Funds Management Ltd.", marketPrice: "₹2,589", faceValue: "₹1" },
    { stock: "Parag Parikh Financial Advisory Services", marketPrice: "₹7,965", faceValue: "₹10" },
    { stock: "HDB Financial Services Ltd.", marketPrice: "₹1,025", faceValue: "₹10" },
    { stock: "Care Health Insurance Ltd.", marketPrice: "₹174", faceValue: "₹10" },
    { stock: "Orbis", marketPrice: "₹406", faceValue: "₹10" },
    { stock: "CSK", marketPrice: "₹188", faceValue: "₹0.1" },
    { stock: "Hero Fincorp", marketPrice: "₹1,411", faceValue: "₹5" },
    { stock: "CIAL", marketPrice: "₹441", faceValue: "₹2" },
    { stock: "Incred Holdings", marketPrice: "₹156", faceValue: "₹10" },
    { stock: "Lakeshore Hospitals & Research Centre Ltd.", marketPrice: "₹110", faceValue: "₹10" },
    { stock: "Vikram Solar", marketPrice: "₹405", faceValue: "₹10" },
    { stock: "Vivriti Capital", marketPrice: "₹1,005", faceValue: "₹10" },
    { stock: "Veeda Clinical Research", marketPrice: "₹487.00", faceValue: "₹10" },
    { stock: "Oravel Stays (OYO)", marketPrice: "₹48.45", faceValue: "₹1" },
    { stock: "Sterlite Power Transmission", marketPrice: "₹548", faceValue: "₹2" },
    { stock: "Spray Engineering Devices Ltd.", marketPrice: "₹472", faceValue: "₹10" },
    { stock: "ESDS Software Solutions", marketPrice: "₹381", faceValue: "₹1" },
    { stock: "Innov8 Workspaces India Limited", marketPrice: "₹48.20", faceValue: "₹1" },
    { stock: "NCDEX", marketPrice: "₹205", faceValue: "₹10" },
  ];

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle column sorting
  const requestSort = (key: keyof ShareData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to sort data
  const sortedData = () => {
    const sortableItems = [...sharesData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Remove ₹ symbol and convert to number for price comparison
        if (sortConfig.key === 'marketPrice' || sortConfig.key === 'faceValue') {
          const aValue = parseFloat(a[sortConfig.key].replace('₹', '').replace(',', ''));
          const bValue = parseFloat(b[sortConfig.key].replace('₹', '').replace(',', ''));
          
          if (sortConfig.direction === 'ascending') {
            return aValue - bValue;
          }
          return bValue - aValue;
        }
        
        // String comparison for stock names
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  };

  // Filter data based on search term
  const filteredData = sortedData().filter(
    item => item.stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get arrow direction for column headers
  const getSortDirectionArrow = (columnName: keyof ShareData) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" /> 
      : <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500 rotate-180" />;
  };

  return (
    <Card className="w-full border-purple-200 dark:border-purple-800 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-t-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-purple-600 dark:text-purple-400" />
              Unlisted Equity Opportunities
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
              Latest market prices as of 17 March 2025
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="pl-8 bg-white/80 dark:bg-gray-800/80 border-purple-200 dark:border-purple-700 w-full md:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
              <TableRow>
                <TableHead 
                  onClick={() => requestSort('stock')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="flex items-center">
                    Company {getSortDirectionArrow('stock')}
                  </span>
                </TableHead>
                <TableHead 
                  onClick={() => requestSort('marketPrice')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right"
                >
                  <span className="flex items-center justify-end">
                    Market Price {getSortDirectionArrow('marketPrice')}
                  </span>
                </TableHead>
                <TableHead 
                  onClick={() => requestSort('faceValue')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right"
                >
                  <span className="flex items-center justify-end">
                    Face Value {getSortDirectionArrow('faceValue')}
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((share, index) => (
                  <TableRow 
                    key={index}
                    className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    <TableCell className="font-medium">{share.stock}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {share.marketPrice}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        {share.faceValue}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    No companies found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption className="pt-4 pb-4 px-6 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-200 dark:border-gray-700">
              <p className="mb-2 font-semibold">Disclaimer:</p>
              <p>All prices mentioned above are subject to market volatility and thus prices might differ on a day-to-day basis. The above information is not a recommendation for personal or financial decisions, and one should consult their financial advisor for specific advice.</p>
            </TableCaption>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
