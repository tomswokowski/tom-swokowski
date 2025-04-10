const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_GITHUB_ID, JWT_SECRET } = process.env;

// Step 1: Redirect to GitHub
router.get('/github', (req, res) => {
  const redirect = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;
  res.redirect(redirect);
});

// Step 2: Handle GitHub callback
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

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Fetch GitHub profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/json',
      },
    });

    const githubUser = await userRes.json();

    if (String(githubUser.id) !== String(ALLOWED_GITHUB_ID)) {
      return res.status(401).json({ error: 'Not allowed' });
    }

    // Sign JWT
    const token = jwt.sign({ id: githubUser.id, login: githubUser.login }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Send cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    res.status(500).json({ error: 'GitHub login failed' });
  }
});

module.exports = router;
