import os
import sqlite3
import time
from collections import defaultdict, deque

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

DB_PATH = os.getenv("DB_PATH", "messages.db")
ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")]
MAX_PER_HOUR = 5

app = FastAPI(title="Portfolio API")
app.add_middleware(CORSMiddleware, allow_origins=ALLOWED_ORIGINS, allow_methods=["POST", "GET"], allow_headers=["*"])

_hits: dict[str, deque] = defaultdict(deque)


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, name TEXT, email TEXT, message TEXT, created_at REAL)"
    )
    return conn


class Contact(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=2000)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact", status_code=201)
def contact(body: Contact, request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > 3600:
        q.popleft()
    if len(q) >= MAX_PER_HOUR:
        raise HTTPException(429, "Too many messages. Try again later.")
    q.append(now)
    with db() as conn:
        conn.execute(
            "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
            (body.name, body.email, body.message, now),
        )
    return {"ok": True}
