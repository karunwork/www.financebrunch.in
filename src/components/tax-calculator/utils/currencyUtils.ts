
import { CountryCode } from "../CountrySelector";

export const getCurrencySymbol = (country: CountryCode): string => {
  switch (country) {
    case "india":
      return "₹";
    case "usa":
      return "$";
    case "canada":
      return "CA$";
    case "australia":
      return "A$";
    case "uk":
      return "£";
    case "germany":
      return "€";
    case "singapore":
      return "S$";
    case "malaysia":
      return "RM";
    case "uae":
      return "AED";
    case "qatar":
      return "QR";
    default:
      return "$";
  }
};

export const formatCurrency = (value: number, currencySymbol: string = "₹") => {
  // Format as Indian currency for Indian Rupee
  if (currencySymbol === "₹") {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  }
  
  // Format for other currencies
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencySymbol === "£" ? "GBP" : 
             currencySymbol === "€" ? "EUR" : 
             currencySymbol === "A$" ? "AUD" : 
             currencySymbol === "CA$" ? "CAD" : 
             currencySymbol === "S$" ? "SGD" : 
             currencySymbol === "RM" ? "MYR" : 
             currencySymbol === "AED" ? "AED" : 
             currencySymbol === "QR" ? "QAR" : "USD",
    maximumFractionDigits: 0,
  });
  
  return formatter.format(value);
};
