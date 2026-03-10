# GitHub Setup Instructions

Follow these steps to publish your portfolio website to GitHub and make it live:

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Repository name: `portfolio-website` (or any name you prefer)
4. Make sure it's set to "Public"
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

Run these commands in your terminal (replace `your-username` with your actual GitHub username):

```bash
git remote add origin https://github.com/your-username/portfolio-website.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and click "Save"
6. Wait a few minutes, then your site will be live at: `https://your-username.github.io/portfolio-website`

## Step 4: Verify Your Live Site

1. Visit your GitHub Pages URL
2. Your portfolio website should be live and accessible
3. Share the link with potential employers or clients!

## Troubleshooting

If you encounter issues:
- Make sure you're logged into GitHub in your terminal (you may need to set up SSH keys or use HTTPS with your credentials)
- Check that the repository name matches exactly
- Ensure you're on the correct branch (main/master)

## Next Steps

Once your site is live:
1. Update the README.md with your actual GitHub Pages URL
2. Add a custom domain if desired
3. Consider adding a custom favicon
4. Share your portfolio on LinkedIn and with potential employers!

---

**Your portfolio website is now ready to showcase your skills to the world! 🚀**