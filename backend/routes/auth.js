const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_GITHUB_ID, JWT_SECRET, NODE_ENV } =
  process.env;

const isProd = NODE_ENV === 'production';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'Strict' : 'Lax',
  path: '/',
};

// Redirect user to GitHub for login
router.get('/github', (req, res) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;
  res.redirect(githubAuthURL);
});

// GitHub callback
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const { access_token } = await tokenRes.json();

    // Fetch user profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: 'application/json',
      },
    });

    const githubUser = await userRes.json();

    if (String(githubUser.id) !== String(ALLOWED_GITHUB_ID)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Sign and set cookie
    const token = jwt.sign({ id: githubUser.id, login: githubUser.login }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, COOKIE_OPTIONS);

    const redirectTo = isProd ? '/dashboard' : 'http://localhost:5173/dashboard';
    res.redirect(redirectTo);
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    res.status(500).json({ error: 'GitHub login failed' });
  }
});

// Logout: clear the cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
