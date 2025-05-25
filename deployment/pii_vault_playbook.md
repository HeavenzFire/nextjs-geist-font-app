# PII Vault Microservice Deployment Playbook

## Overview
This playbook guides you through deploying the PII Vault Microservice, a Node.js/Express service that securely encrypts and decrypts Personally Identifiable Information (PII) using AES-256-CBC.

## Prerequisites
- Node.js 16+
- npm or yarn
- Secure key management system (e.g., AWS KMS, HashiCorp Vault)

## Installation

1. Clone the repository or copy the `pii_vault.js` file.
2. Install dependencies:
   ```bash
   npm install express crypto
   ```
3. Set environment variable for encryption key:
   ```bash
   export PII_KEY='32characterslongpassphrase!'
   ```
4. Run the service:
   ```bash
   node pii_vault.js
   ```

## Configuration

- Replace the default encryption key with a secure, randomly generated 32-byte key.
- Integrate with your database to store encrypted PII securely.
- Implement access controls and audit logging for PII access.

## Deployment

- Use Docker for containerized deployment:
  ```dockerfile
  FROM node:16-alpine
  WORKDIR /app
  COPY pii_vault.js package*.json ./
  RUN npm install
  ENV PII_KEY=your-secure-key
  CMD ["node", "pii_vault.js"]
  ```
- Deploy on Kubernetes or cloud services with secrets managed securely.

## Security Best Practices

- Rotate encryption keys regularly.
- Use TLS for all communications.
- Limit access to the microservice via network policies and authentication.

## Monitoring & Logging

- Log all encryption/decryption requests.
- Integrate with SIEM for compliance monitoring.

---

For API usage and integration details, refer to the project README.
