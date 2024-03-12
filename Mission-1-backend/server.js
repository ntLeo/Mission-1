const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
module.exports = server;

// API 1 CAR VALUE

// Function to calculate car value
function calculateCarValue(model, year) {
    const alphabetPositionSum = [...model.toUpperCase()].reduce((sum, char) => {
      const charCode = char.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) { // A-Z
        return sum + charCode - 64; // A is 1, B is 2, ..., Z is 26
      }
      return sum;
    }, 0);
  
    return alphabetPositionSum * 100 + year;
  }
  

app.post("/api_1", (req, res) => {
  
  try {
    const { model, year } = req.body;

    // Check if model and year are provided and valid
    if (!model || typeof model !== 'string' || !year || typeof year !== 'number' || year < 0) {
      return res.status(400).json({ error: 'Invalid model or year' });
    }

    const car_value = calculateCarValue(model, year);

    return res.json({ car_value });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API 2

const keywords = ["collide", "crash", "scratch", "bump", "smash"];

function calculateRiskRating(claimHistory) {
  let rating = 1;
  const words = claimHistory.toLowerCase().split(/\s+/);
  words.forEach(word => {
    if (keywords.includes(word)) {
      rating++;
    }
  });
  return rating > 5 ? 5 : rating;
}

app.post("/api_2", (req, res) => {
  try {
    const { claim_history } = req.body;

    // Check if claim_history is provided and valid
    if (!claim_history || typeof claim_history !== 'string') {
      return res.status(400).json({ error: 'Invalid claim history' });
    }

    const risk_rating = calculateRiskRating(claim_history);

    return res.json({ risk_rating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 3

function calculatePremiums(carValue, riskRating) {
  const yearlyPremium = Math.round((carValue * riskRating) / 100);
  const monthlyPremium = Math.round(yearlyPremium / 12);
  return { yearlyPremium, monthlyPremium };
}

app.post("/api_3", (req, res) => {
  try {
    const { car_value, risk_rating } = req.body;

    // Check if car_value and risk_rating are provided and valid
    if (!car_value || typeof car_value !== 'number' || !risk_rating || typeof risk_rating !== 'number' || risk_rating < 1 || risk_rating > 5 || car_value < 0) {
      return res.status(400).json({ error: 'Invalid car value or risk rating' });
    }

    const { yearlyPremium, monthlyPremium } = calculatePremiums(car_value, risk_rating);

    return res.json({ yearly_premium: yearlyPremium, monthly_premium: monthlyPremium });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});












// =============== PORT ================ // 
const PORT = 3000

const serverPort = app.listen(PORT, () => {
    console.log(`Server is alive on http://localhost:${PORT}`)
})
.on("error", (error) => {
    if(error.code === "EADDRINUSE"){
        console.log("Port is already in use, either close all other servers or choose another port")
    } else {
        console.log("Server Error", error)
    }
})