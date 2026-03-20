module.exports = async (req, res) => {
  try {
    const mod = await import("../email-app/api/forward-settings.js");
    return mod.default(req, res);
  } catch (error) {
    return res.status(500).json({
      error: "Forward settings endpoint bootstrap failed",
      details: error?.message || String(error)
    });
  }
};
