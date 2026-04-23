from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import logging

from database import RSVPResponse as RSVPModel, create_tables, get_db
from schemas import RSVPCreate, RSVPResponse, RSVPStats

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Wedding Invitation API",
    description="Backend API for Arjun & Priya's wedding invitation website",
    version="1.0.0",
)

# CORS — allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
@app.on_event("startup")
def startup_event():
    create_tables()
    logger.info("✅ Database tables created/verified")


# ─── Routes ────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
def root():
    return {
        "message": "🎊 Wedding API is running!",
        "couple": "Arjun & Priya",
        "date": "December 20, 2026",
    }


@app.post("/rsvp", response_model=RSVPResponse, status_code=201, tags=["RSVP"])
def create_rsvp(rsvp: RSVPCreate, db: Session = Depends(get_db)):
    """Submit an RSVP response."""
    logger.info(f"New RSVP from: {rsvp.name}, attending: {rsvp.attending}")

    # Check for duplicate (same name within last 24h) — soft check
    existing = db.query(RSVPModel).filter(
        func.lower(RSVPModel.name) == rsvp.name.lower()
    ).first()

    if existing:
        # Update existing instead of duplicate
        existing.attending = rsvp.attending
        existing.message = rsvp.message
        existing.guests = rsvp.guests or 1
        db.commit()
        db.refresh(existing)
        return existing

    new_rsvp = RSVPModel(
        name=rsvp.name,
        attending=rsvp.attending,
        message=rsvp.message,
        guests=rsvp.guests or 1,
    )
    db.add(new_rsvp)
    db.commit()
    db.refresh(new_rsvp)
    return new_rsvp


@app.get("/rsvp", response_model=List[RSVPResponse], tags=["RSVP"])
def get_all_rsvp(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    attending: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    """Fetch all RSVP responses with optional filtering."""
    query = db.query(RSVPModel)
    if attending is not None:
        query = query.filter(RSVPModel.attending == attending)
    responses = query.order_by(RSVPModel.submitted_at.desc()).offset(skip).limit(limit).all()
    return responses


@app.get("/rsvp/stats", response_model=RSVPStats, tags=["RSVP"])
def get_rsvp_stats(db: Session = Depends(get_db)):
    """Get summary statistics for RSVP responses."""
    total = db.query(func.count(RSVPModel.id)).scalar()
    attending = db.query(func.count(RSVPModel.id)).filter(RSVPModel.attending == True).scalar()
    not_attending = db.query(func.count(RSVPModel.id)).filter(RSVPModel.attending == False).scalar()
    total_guests = db.query(func.sum(RSVPModel.guests)).filter(RSVPModel.attending == True).scalar() or 0

    return RSVPStats(
        total=total,
        attending=attending,
        not_attending=not_attending,
        total_guests=total_guests,
    )


@app.delete("/rsvp/{rsvp_id}", status_code=204, tags=["RSVP"])
def delete_rsvp(rsvp_id: int, db: Session = Depends(get_db)):
    """Delete a specific RSVP response (admin use)."""
    rsvp = db.query(RSVPModel).filter(RSVPModel.id == rsvp_id).first()
    if not rsvp:
        raise HTTPException(status_code=404, detail="RSVP not found")
    db.delete(rsvp)
    db.commit()
    return None
