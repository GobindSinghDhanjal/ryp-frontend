export const authenticate = (req) => {
  const authHeader = req.headers.get("authorization"); // Use .get() to access headers

  if (
    !authHeader ||
    authHeader !== `Bearer ${process.env.NEXT_PUBLIC_PASSCODE}`
  ) {
    throw new Error("Unauthorized");
  }
};
