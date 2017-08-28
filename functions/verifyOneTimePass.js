const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body || !req.body.phone) return res.status(422).send({ error: 'Missing phone ' });
  if (!req.body.country) return res.status(422).send({ error: 'Missing country' });
  if (!req.body.code) return res.status(422).send({ error: 'Missing code' });

  const phone = `+${String(req.body.country).replace(/[^\d]/g, '')}${String(req.body.phone).replace(/[^\d]/g, '')}`;
  const code = parseInt(req.body.code, 10);

  admin.auth().getUser(phone)
       .then(() => {
         const ref = admin.database().ref(`users/${phone}`);

         ref.on('value', snapshot => {
           ref.off();
           const user = snapshot.val();
           if (user.code !== code || !user.codeValid)
             return res.status(422).send({ error: 'Code is not valid' });

           ref.update({ codeValid: false });
           admin.auth().createCustomToken(phone)
                .then(token => res.send({ token }))
                .catch(error => res.status(422).send({ error }));
         })
       })
       .catch(error => res.status(422).send({ error }));

};
