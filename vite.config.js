import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

`.gitignore`:
```
# Dependencies
node_modules/

# Build output
dist/

# Environment variables
.env
.env.local

# Editor
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db