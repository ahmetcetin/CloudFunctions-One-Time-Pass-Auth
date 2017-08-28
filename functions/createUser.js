const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body || !req.body.phone) return res.status(422).send({ error: 'Missing phone' });
  if (!req.body.country) return res.status(422).send({ error: 'Missing country' });

  const phone = `+${String(req.body.country).replace(/[^\d]/g, '')}${String(req.body.phone).replace(/[^\d]/g, '')}`;

  admin.auth().createUser({ uid: phone })
       .then(user => res.send({ user, body: req.body }))
       .catch(error => res.status(422).send({ error }));
};
