# Deployment Guide

## Local Server Deployment (192.168.0.20:4173)

The CI/CD pipeline deploys build artifacts to `/var/www/monarch/` on the GitLab runner server. For the preview URL to work, the following infrastructure must be configured.

### Prerequisites

1. **Create deployment directory:**
   ```bash
   sudo mkdir -p /var/www/monarch
   sudo chown gitlab-runner:gitlab-runner /var/www/monarch
   ```

2. **Install and configure nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

3. **Create nginx configuration:**
   Create `/etc/nginx/sites-available/monarch`:
   ```nginx
   server {
       listen 4173;
       server_name 192.168.0.20 localhost;

       root /var/www/monarch;
       index index.html;

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # SPA fallback - serve index.html for all routes
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
   }
   ```

4. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/monarch /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Open firewall (if applicable):**
   ```bash
   sudo ufw allow 4173/tcp
   ```

### Verification

After the CI/CD pipeline runs `deploy-preview`:

1. Check the deployed files:
   ```bash
   ls -la /var/www/monarch/
   cat /var/www/monarch/.deployed
   ```

2. Test the site:
   ```bash
   curl http://192.168.0.20:4173/
   ```

3. Open in browser: http://192.168.0.20:4173

### Troubleshooting

**Site not accessible:**
- Check nginx is running: `sudo systemctl status nginx`
- Check nginx config: `sudo nginx -t`
- Check firewall: `sudo ufw status`
- Check if port 4173 is in use: `sudo lsof -i :4173`

**Permission denied errors in CI:**
- Ensure gitlab-runner owns the directory: `ls -la /var/www/monarch`
- Fix with: `sudo chown -R gitlab-runner:gitlab-runner /var/www/monarch`

**Stale content:**
- Check `.deployed` file for last deployment time
- Clear browser cache
- Check rsync output in CI job logs
