export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;

      if (!Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          message: "Invalid input. 'data' should be an array",
        });
      }


      const FULL_NAME = "ayush_pandey";
      const DOB = "22122004"; // ddmmyyyy
      const EMAIL = "ayushpandey.kdl@gmail.com";
      const ROLL_NUMBER = "22BCE2284";

      let oddNumbers = [];
      let evenNumbers = [];
      let alphabets = [];
      let specialChars = [];
      let sum = 0;
      let alphaConcat = "";

      for (let item of data) {
        if (!isNaN(item)) {
          let num = parseInt(item, 10);
          sum += num;
          if (num % 2 === 0) {
            evenNumbers.push(item.toString());
          } else {
            oddNumbers.push(item.toString());
          }
        } else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
          alphaConcat += item;
        } else {
          specialChars.push(item);
        }
      }

      // Reverse + alternating caps
      let concatString = "";
      let rev = alphaConcat.split("").reverse().join("");
      for (let i = 0; i < rev.length; i++) {
        concatString += i % 2 === 0 ? rev[i].toUpperCase() : rev[i].toLowerCase();
      }

      return res.status(200).json({
        is_success: true,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialChars,
        sum: sum.toString(),
        concat_string: concatString,
      });
    } catch (err) {
      return res.status(500).json({ is_success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
