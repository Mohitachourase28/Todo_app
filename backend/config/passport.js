import { use, serializeUser, deserializeUser } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOne, create, findById } from './models/User'; // Your Mongoose User model

use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = await create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value
    });

    done(null, newUser);
  }
));

serializeUser((user, done) => done(null, user.id));
deserializeUser((id, done) => findById(id).then(user => done(null, user)));
