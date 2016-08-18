module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 80
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || '',
        issuer: process.env.ISSUER || '',
        cert: process.env.SAML_CERT || null,
        decryptionPvk: process.env.decryptionPvk||''
      }
    }
  }
};
