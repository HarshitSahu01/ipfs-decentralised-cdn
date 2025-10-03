# IPFS Decentralised CDN

A simple decentralized content delivery system built on **IPFS**.  
It allows users to upload, download, list, and delete files through a web interface and backend APIs.

---

## Features
- Upload files to IPFS and get a unique content hash (CID).  
- Download files directly via CID or file ID.  
- List all files uploaded by a user with metadata.  
- Delete (unpin) files from your node.  
- Basic authentication for user sessions.  
- Web frontend (Vue.js) + Node.js backend.

---

## Getting Started

### Prerequisites
- Node.js and npm  
- A running IPFS daemon (local or remote)  

### Installation
```bash
git clone https://github.com/HarshitSahu01/ipfs-decentralised-cdn.git
cd ipfs-decentralised-cdn
```
Install backend:

```bash
Copy code
cd backend
npm install
npm start
```
Install frontend:

```bash
Copy code
cd ../frontend
npm install
npm run serve
```

Visit http://localhost:8080 to use the app.

### API Endpoints
- POST /login – authenticate user

- POST /uploadFile – upload file to IPFS

- GET /downloadFile – download file

- DELETE /deleteFile – remove file

-  GET /getFiles – list user files

### Limitations
Deletion only unpins from your node; other nodes may still host the file.

For reliable availability, files must be pinned.

Access control is basic; IPFS itself is public by default.
