# GitHub Setup Instructions

## Quick Setup Commands

After creating your GitHub repository, run these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Verify Your Credentials Are Safe

Before pushing, verify that `.env.local` is NOT tracked:

```bash
git status
```

You should NOT see `.env.local` in the output. Only `.env.local.example` should be visible.

## What Gets Pushed

✅ **Safe to push:**
- All source code
- `.env.local.example` (template without credentials)
- Configuration files
- README.md

❌ **NOT pushed (protected by .gitignore):**
- `.env.local` (your actual Supabase credentials)
- `node_modules/`
- `.next/`
- Build artifacts

## After Pushing

1. Your code will be on GitHub
2. Others can clone and use `.env.local.example` as a template
3. Your actual credentials remain local and secure
