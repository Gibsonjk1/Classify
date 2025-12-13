const router = require("express").Router();
const passport = require("passport");

// Initiate Google OAuth flow
router.get(
  "/google",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Initiate Google OAuth 2.0 authentication flow' */
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Handle Google OAuth 2.0 callback' */
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Successful authentication
    // Redirect to original URL if stored, otherwise redirect to home
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

// Logout endpoint
router.get(
  "/logout",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Logout and destroy session' */
  (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed", message: err.message });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Session destruction failed", message: err.message });
        }
        res.json({ message: "Logged out successfully" });
      });
    });
  }
);

// Authentication status endpoint (for debugging/testing)
router.get(
  "/status",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Check authentication status' */
  (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        authenticated: true,
        user: req.user,
      });
    } else {
      res.json({
        authenticated: false,
      });
    }
  }
);

// OAuth failure handler
router.get(
  "/failure",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'OAuth authentication failure endpoint' */
  (req, res) => {
    res.status(401).json({
      error: "Authentication failed",
      message: "Google OAuth authentication was unsuccessful",
    });
  }
);

module.exports = router;
