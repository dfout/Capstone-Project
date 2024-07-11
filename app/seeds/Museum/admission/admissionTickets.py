from app.models import db, AdmissionTicket, environment, SCHEMA
from datetime import datetime, timedelta
from sqlalchemy.sql import text

def seed_admission_tickets():
    start_date = datetime(2024, 8, 1)
    end_date = datetime(2024, 11, 30)
    holidays = [
        datetime(2024, 9, 2),  # Labor Day
        datetime(2024, 10, 14), # Columbus Day
        datetime(2024, 11, 11), # Veterans Day
        datetime(2024, 11, 28)  # Thanksgiving Day
    ]

    delta = end_date - start_date
    tickets = []

    for i in range(delta.days + 1):
        day = start_date + timedelta(days=i)
        day_of_week = day.strftime('%A')
        max_admissions = 0 if day in holidays else 500

        ticket = AdmissionTicket(
            day=day,
            max_admissions=max_admissions,
            day_of_week=day_of_week
        )
        tickets.append(ticket)

    for ticket in tickets:
        db.session.add(ticket)

    db.session.commit()

def undo_admission_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.admission_tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM admission_tickets"))
        
    db.session.commit()