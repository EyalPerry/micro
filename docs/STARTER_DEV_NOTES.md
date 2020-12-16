# Manual Test Checklist
When editing the template, make sure none of these are broken:

For developers
- start server
- stop server
- debug server
- change server code and observe changes
- connect to db via client app
- run test script via npm run test
- debug a test via VSCode Jest (currently not working due to wsl compat)
- run a test via VSCode Jest (currently not working due to wsl compat)

- DB connection - create entity
- HTTP Request - get created entity

# Upcoming Feature Roadmap
- Logging
- OAuth2 / OIDC
- K8S (health/readiness probes)
- CI : test & build & containerize & push to registry.
- CD : deploy to common runtimes.
- GitHub Actions integration.
