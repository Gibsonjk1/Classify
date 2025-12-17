const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Determine callback URL based on environment
const getCallbackURL = () => {
  let callbackURL;
  if (process.env.HOST) {
    callbackURL = `https://${process.env.HOST}/auth/google/callback`;
  } else if (process.env.NODE_ENV === "production") {
    callbackURL = "https://classify-7nzc.onrender.com/auth/google/callback";
  } else {
    callbackURL = `http://localhost:${process.env.PORT || 3000}/auth/google/callback`;
  }
  
  // Log callback URL in development for debugging
  if (process.env.NODE_ENV !== 'production' && !process.env.HOST) {
    console.log('[Passport Config] OAuth Callback URL:', callbackURL);
    console.log('[Passport Config] CLIENT_ID set:', !!process.env.CLIENT_ID);
    console.log('[Passport Config] CLIENT_SECRET set:', !!process.env.CLIENT_SECRET);
    // Show first 10 chars of CLIENT_ID for verification (safe to log)
    if (process.env.CLIENT_ID) {
      console.log('[Passport Config] CLIENT_ID (first 10 chars):', process.env.CLIENT_ID.substring(0, 10) + '...');
    }
    // Show last 4 chars of CLIENT_SECRET for verification (safe to log)
    if (process.env.CLIENT_SECRET) {
      console.log('[Passport Config] CLIENT_SECRET (last 4 chars):', '...' + process.env.CLIENT_SECRET.slice(-4));
      console.log('[Passport Config] CLIENT_SECRET length:', process.env.CLIENT_SECRET.length, '(should typically be 24-40 chars)');
    }
  }
  
  return callbackURL;
};

// Export callback URL for diagnostic endpoint
module.exports.getCallbackURL = getCallbackURL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: getCallbackURL(),
    },
    (accessToken, refreshToken, profile, done) => {
      // Store user profile in session
      // You can customize what user data to store
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value,
      };
      return done(null, user);
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
