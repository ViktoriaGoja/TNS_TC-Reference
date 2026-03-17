# TNS T&C Reference Tool

Internal staff reference tool for The Next Street's Terms & Conditions.
Built with React. Includes search, section browser, and AI chat agent.

---

## Deploy to Netlify (10 minutes, no IT needed)

### Step 1 — Create a GitHub account
1. Go to **github.com** and sign up for a free account
2. Click **New repository**
3. Name it `tns-tc-reference`, set to **Private**, click **Create repository**

### Step 2 — Upload the code
1. In your new repo, click **uploading an existing file**
2. Drag and drop ALL files from this folder into the upload area
3. Click **Commit changes**

### Step 3 — Deploy on Netlify
1. Go to **app.netlify.com** and sign up free (use your email)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and authorize Netlify
4. Select your `tns-tc-reference` repo
5. Build settings will auto-fill from netlify.toml — just click **Deploy site**
6. Wait ~2 minutes — Netlify builds and gives you a live URL

### Step 4 — Set your API key (for AI Agent)
1. In Netlify dashboard, go to **Site settings → Environment variables**
2. Click **Add a variable**
3. Key: `REACT_APP_ANTHROPIC_KEY`
4. Value: your Anthropic API key (get one at console.anthropic.com)
5. Click **Save**, then go to **Deploys → Trigger deploy**

### Step 5 — Share the link
Your site will be live at something like:
`https://tns-tc-reference.netlify.app`

Share this link with staff via Teams or email. That's it!

---

## Rename your Netlify URL (optional)
1. Netlify dashboard → **Site settings → General → Site name**
2. Change to something like `tns-tc-reference`
3. Your URL becomes `https://tns-tc-reference.netlify.app`

---

## Update the T&C content
All content lives in `src/App.js` in the `SECTIONS` array at the top of the file.
To update a section: find it by title, edit the text in the `b` array, commit the change.
Netlify will automatically redeploy within ~2 minutes.

---

## Using the AI Agent without the env variable
Staff can also enter the API key directly in the app by clicking the 🔑 icon
in the AI Agent chat header. This is stored only in their browser session.
