module.exports = async (req, res) => {
  try {
    const mod = await import("../email-app/api/verify-domain.js");
    return mod.default(req, res);
  } catch (error) {
    return res.status(500).json({
      error: "Verify endpoint bootstrap failed",
      details: error?.message || String(error)
    });
  }
};
