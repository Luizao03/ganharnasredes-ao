
// Exemplo simples - checkUsername (Cloud Function)
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
admin.initializeApp();

exports.checkUsername = functions.https.onCall(async (data, context) => {
  const { platform, username } = data;
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated','Login requerido');
  let url;
  if (platform === 'tiktok') url = `https://www.tiktok.com/@${username}`;
  if (platform === 'instagram') url = `https://www.instagram.com/${username}`;
  if (platform === 'facebook') url = `https://www.facebook.com/${username}`;
  try{
    const res = await fetch(url, {method:'HEAD'});
    return { exists: res.status === 200, status: res.status };
  } catch(err){ return { exists:false, error:err.toString() } }
});
