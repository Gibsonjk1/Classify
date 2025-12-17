const router = require("express").Router();
const passport = require("passport");

// Initiate Google OAuth flow
router.get(
  "/google",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Initiate Google OAuth 2.0 authentication flow' */
  (req, res, next) => {
    // If returnTo is not set, try to get it from query parameter (fallback)
    if (!req.session.returnTo && req.query.returnTo) {
      req.session.returnTo = req.query.returnTo;
    }
    
    // Log for debugging (development only)
    if (process.env.NODE_ENV !== 'production' && !process.env.HOST) {
      console.log('[OAuth Init] Session returnTo:', req.session?.returnTo);
    }
    
    // Ensure session is saved before redirecting to OAuth
    // This is critical for preserving returnTo across the OAuth flow
    req.session.save((err) => {
      if (err) {
        console.error('[OAuth Init] Error saving session:', err);
        return res.status(500).json({
          error: "Server Error",
          message: "Failed to save session",
        });
      }
      next();
    });
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Handle Google OAuth 2.0 callback' */
  (req, res, next) => {
    // Log session state for debugging (development only)
    if (process.env.NODE_ENV !== 'production' && !process.env.HOST) {
      console.log('[OAuth Callback] Session returnTo:', req.session?.returnTo);
      console.log('[OAuth Callback] Session ID:', req.sessionID);
      console.log('[OAuth Callback] Query params:', req.query);
    }
    next();
  },
  (req, res, next) => {
    // Wrap passport.authenticate to catch errors during token exchange
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        // Log the error for debugging
        console.error('[OAuth Callback] Authentication error:', err);
        console.error('[OAuth Callback] Error code:', err.code);
        console.error('[OAuth Callback] Error message:', err.message);
        
        // Check if it's an invalid_client error (common OAuth issue)
        if (err.code === 'invalid_client') {
          // Enhanced error message with specific guidance
          const errorMessage = process.env.NODE_ENV !== 'production' && !process.env.HOST
            ? `OAuth client configuration error. The 'invalid_client' error during token exchange typically means your CLIENT_SECRET is incorrect or doesn't match your CLIENT_ID. 
            
Troubleshooting steps:
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Find your OAuth 2.0 Client ID (the one matching the CLIENT_ID shown in server logs)
3. Click on it to view details
4. Verify the CLIENT_SECRET in your .env file matches the "Client secret" shown in Google Console
5. If the secret was reset or regenerated, copy the new secret to your .env file
6. Make sure there are no extra spaces or line breaks in your .env file
7. Restart your server after updating .env

Note: Swagger uses OAuth2 implicit flow (no CLIENT_SECRET needed), but Passport uses authorization code flow (requires CLIENT_SECRET). Both must use the same OAuth client credentials.`
            : "OAuth client configuration error. Please verify CLIENT_ID and CLIENT_SECRET in your environment variables match your Google Console OAuth client settings. The CLIENT_SECRET must be correct for the authorization code flow.";
          
          return res.status(401).json({
            error: "Authentication Error",
            message: errorMessage,
          });
        }
        
        // Generic error response
        return res.status(500).json({
          error: "Server Error",
          message: err.message || "An error occurred during authentication",
        });
      }
      
      if (!user) {
        // Authentication failed but no error thrown
        return res.redirect("/auth/failure");
      }
      
      // Capture returnTo BEFORE logIn (which might regenerate session)
      const returnTo = req.session.returnTo || "/";
      
      // Authentication successful - log in the user
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error('[OAuth Callback] Login error:', loginErr);
          return res.status(500).json({
            error: "Server Error",
            message: "Failed to establish session",
          });
        }
        
        // Restore returnTo after logIn (in case session was regenerated)
        req.session.returnTo = returnTo;
        
        // Ensure session is saved before redirecting
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error('[OAuth Callback] Error saving session:', saveErr);
            return res.status(500).json({
              error: "Server Error",
              message: "Failed to save session",
            });
          }
          
          // Redirect to original URL if stored, otherwise redirect to home
          const redirectUrl = req.session.returnTo || "/";
          
          // Log redirect for debugging (development only)
          if (process.env.NODE_ENV !== 'production' && !process.env.HOST) {
            console.log('[OAuth Callback] Session returnTo after logIn:', req.session.returnTo);
            console.log('[OAuth Callback] Redirecting to:', redirectUrl);
          }
          
          delete req.session.returnTo;
          res.redirect(redirectUrl);
        });
      });
    })(req, res, next);
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
