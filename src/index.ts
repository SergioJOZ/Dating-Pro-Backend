import express from "express";
import usersRoutes from "./routes/usersRoutes.ts";
import transactionsRoutes from "./routes/transactionsRoutes.ts";
import "dotenv/config";
import cors from "cors";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", usersRoutes);
app.use("/api", transactionsRoutes);
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));
app.post("/api/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const amount = req.body.amount;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2025-01-27.acacia" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY as string,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
