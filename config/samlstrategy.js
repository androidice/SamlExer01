const SamlStrategy = require('passport-saml').Strategy;

module.exports = function(config) {
  var samlStrategy = new SamlStrategy({
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert,
      decryptionPvk: config.passport.saml.decryptionPvk,
      acceptedClockSkewMs: -1
    },
    function(profile, done) {
      return done(null, {
        id: profile.uid || profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: profile.email|| profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        displayName: profile.cn || profile['http://schemas.auth0.com/nickname'],
        firstName: profile.givenName || "",
        lastName: profile.sn | ""
      });
    });
  return samlStrategy;
}