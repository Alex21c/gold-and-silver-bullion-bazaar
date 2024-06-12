import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import "dotenv/config";
import SellerModel from "../Models/SellerModel.mjs";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const JwtStrategy = new Strategy(opts, async function (jwt_payload, done) {
  try {
    const user = await SellerModel.findById(jwt_payload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.log(error.message);
    return done(err, false);
  }
});

passport.use(JwtStrategy);
export default passport;
