

export default function numberToWords (num){
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion"];

  if (num === 0) return "Zero";

  const getWord = (num) => {
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? " " + units[num % 10] : "")
      );
    if (num < 1000)
      return (
        units[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 !== 0 ? " " + getWord(num % 100) : "")
      );
    return "";
  };

  let result = "";
  let count = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      result = getWord(num % 1000) + " " + thousands[count] + " " + result;
    }
    num = Math.floor(num / 1000);
    count++;
  }

  return result.trim();
};