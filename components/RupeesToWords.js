export default function RupeesToWords() {
    const ones = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    const teens = [
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];
    const tens = [
        "",
        "ten",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];

    function numberToWords(num) {
        if (num === "0") return "zero";

        let numStr = num.toString();
        let word = "";
        let n = numStr.length;

        if (n > 9) return "overflow";

        numStr = numStr.padStart(9, "0");

        let crore = numStr.slice(0, 2);
        let lakh = numStr.slice(2, 4);
        let thousand = numStr.slice(4, 6);
        let hundred = numStr[6];
        let ten = numStr.slice(7);

        if (parseInt(crore) > 0) {
            word += `${convertTwoDigits(crore)} crore `;
        }
        if (parseInt(lakh) > 0) {
            word += `${convertTwoDigits(lakh)} lakh `;
        }
        if (parseInt(thousand) > 0) {
            word += `${convertTwoDigits(thousand)} thousand `;
        }
        if (parseInt(hundred) > 0) {
            word += `${ones[hundred]} hundred `;
        }
        if (parseInt(ten) > 0) {
            word += convertTwoDigits(ten);
        }
        return word.trim();
    }

    function convertTwoDigits(num) {
        num = parseInt(num, 10);
        if (num < 10) return ones[num];
        if (num > 10 && num < 20) return teens[num - 11];
        let unit = num % 10;
        let ten = Math.floor(num / 10);
        return `${tens[ten]} ${ones[unit]}`.trim();
    }

    function convertRupeesPaise(amount) {
        let [rupees, paise] = amount.toString().split(".");

        let rupeesInWords = numberToWords(parseInt(rupees));
        let paiseInWords = paise ? convertTwoDigits(paise.padEnd(2, "0")) : "";

        let result = "";
        if (rupeesInWords) {
            result += `${rupeesInWords} rupees`;
        }
        if (paiseInWords) {
            result += ` and ${paiseInWords} paise`;
        }

        return result.trim() + " Only";
    }
}