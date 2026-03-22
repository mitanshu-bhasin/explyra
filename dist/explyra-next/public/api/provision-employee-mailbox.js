module.exports = async (req, res) => {
  try {
    const mod = await import("../email-app/api/provision-employee-mailbox.js");
    return mod.default(req, res);
  } catch (error) {
    return res.status(500).json({
      error: "Provision endpoint bootstrap failed",
      details: error?.message || String(error)
    });
  }
};
