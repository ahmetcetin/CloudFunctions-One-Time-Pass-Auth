const admin = require('firebase-admin');

const twilio = require('./twilio');

module.exports = (req, res) => {
  if (!req.body || !req.body.phone) return res.status(422).send({ error: 'Missing phone ' });
  if (!req.body.country) return res.status(422).send({ error: 'Missing country' });

  const phone = `+${String(req.body.country).replace(/[^\d]/g, '')}${String(req.body.phone).replace(/[^\d]/g, '')}`;

  admin.auth().getUser(phone)
       .then(() => {
         const code = Math.floor(Math.random() * 8999 + 1000);

         twilio.messages.create({
                 body: `Your code is ${code}`,
                 to: phone,
                 from: '+14159148801',
               })
               .then(() => {
                 admin.database().ref(`users/${phone}`)
                      .update({ code, codeValid: true })
                      .then(() => res.send({ success: true }))
                      .catch(error => res.status(422).send({ error }));
               })
               .catch(error => res.status(422).send({ error }));
       })
       .catch(error => res.status(422).send({ error }));
};
