---
name: backend-api
description: Backend API rules used for the quiz project.
---

# Backend API

This local project copy documents the backend rules because the requested original
`ressurser/skills/backend-api/` directory was not available in the workspace.

- Keep routes small and explicit, with JSON responses and meaningful HTTP status codes.
- Validate every client-controlled field on the server; do not trust frontend scores.
- Return clear 400-level messages for invalid input and a safe generic message for
  unexpected 500-level failures.
- Use bounded JSON request bodies, avoid exposing filesystem details, and render
  user-controlled data safely on the frontend.
- Keep filesystem access in focused helpers and serialize writes so concurrent requests
  cannot overwrite one another.
- Preserve existing data, use generated timestamps, and fail safely when stored JSON
  is malformed rather than silently destroying it.
