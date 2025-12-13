const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Determine callback URL based on environment
const getCallbackURL = () => {
  if (process.env.HOST) {
    return `https://${process.env.HOST}/auth/google/callback`;
  } else if (process.env.NODE_ENV === "production") {
    return "https://classify-7nzc.onrender.com/auth/google/callback";
  } else {
    return `http://localhost:${process.env.PORT || 3000}/auth/google/callback`;
  }
};

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
