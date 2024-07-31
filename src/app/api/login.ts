import { NextApiRequest, NextApiResponse } from "next";

// Define the request body type
interface LoginRequestBody {
  email: string;
  password: string;
}

// Define the response body type (if needed)
interface LoginResponseBody {
  message: string;
  token?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>
) {
  if (req.method === "POST") {
    const { email, password } = req.body as LoginRequestBody;

    // Simple validation (replace this with your actual validation logic)
    const isValidEmail = email === "example@example.com";
    const isValidPassword = password === "password123";

    if (isValidEmail && isValidPassword) {
      res.status(200).json({
        message: "Login successful",
        // Include a token if needed
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
