# Docker + NPM 502 Bad Gateway — Issue Summary

## Environment
- **VPS:** Contabo (4 vCPU / 8GB RAM)
- **Reverse Proxy:** Nginx Proxy Manager (NPM) running as a Docker container
- **DNS:** Cloudflare → A record `vault` → VPS public IP (Proxied)
- **Target:** `https://vault.zaverous.com` → Next.js frontend on port 3000

## Stack (docker ps)
| Container | Image | Ports |
|---|---|---|
| npm-app-1 | jc21/nginx-proxy-manager | 0.0.0.0:80-81, 0.0.0.0:443 |
| vault-frontend-1 | ghcr.io/zaverous/vault-frontend | 127.0.0.1:3000->3000/tcp |
| vault-backend-1 | ghcr.io/zaverous/vault-backend | 127.0.0.1:3001->3001/tcp |
| vault-db-1 | postgres:16-alpine | 5432/tcp |

## Root Cause
Two compounding issues:
1. Frontend bound to `127.0.0.1:3000` — only reachable from the host loopback, not from other containers
2. NPM is itself a container — pointing it to `http://PUBLIC_IP:3000` routes through Cloudflare and loops back

## Fix Attempted
- Created a shared Docker bridge network named `proxy`
- Attached both NPM and vault stack to the `proxy` network
- Removed the `127.0.0.1` host port binding from frontend
- Updated NPM proxy host destination from `http://PUBLIC_IP:3000` → `http://frontend-1:3000`

## Current Status
Still returning 502. All containers are confirmed healthy via logs. The fix is architecturally correct but something in the network wiring didn't apply cleanly.

## Suspected Remaining Issues
- Container name in NPM destination doesn't match actual Docker container name
- Vault frontend not actually joined to the `proxy` network after compose changes
- NPM container not on the `proxy` network

## Next Debug Commands (not yet run)
```bash
docker network inspect proxy
docker ps --format "table {{.Names}}\t{{.Networks}}\t{{.Ports}}"
```
The `docker network inspect proxy` output should list BOTH npm and frontend under `Containers`. If either is missing → full `docker compose down && docker compose up -d` on that stack.

## Key Principle
NPM and all proxied containers MUST share a Docker bridge network. NPM's destination should always use the container name, never the public IP:
```
# Wrong
http://PUBLIC_IP:3000

# Right
http://your-container-name:3000
```
