from app.models import db, Exposition, Gallery, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random

def seed_expositions():
    expositions = [
        {"name": "Impressionist Art", "description": "An exhibition showcasing the best of Impressionist Art."},
        {"name": "Modern Sculpture", "description": "A collection of modern sculptures from renowned artists."},
        {"name": "Renaissance Paintings", "description": "Explore the masterpieces from the Renaissance era."},
        {"name": "Abstract Art", "description": "A dive into the world of abstract art."},
        {"name": "Photography", "description": "A showcase of stunning photographs from around the world."},
        {"name": "Ancient Artifacts", "description": "Discover the wonders of ancient civilizations."},
        {"name": "Contemporary Art", "description": "The latest trends and works in contemporary art."},
        {"name": "Pop Art", "description": "An exploration of the pop art movement."},
        {"name": "Digital Art", "description": "A look into the future with digital art creations."},
        {"name": "Nature and Wildlife", "description": "Art inspired by nature and wildlife."}
    ]

    galleries = db.session.query(Gallery).all()

    # Define holidays
    holidays = [
        datetime(2024, 8, 15),  # Example holiday
        datetime(2024, 9, 4),   # Example holiday
        datetime(2024, 10, 31), # Example holiday
        datetime(2024, 11, 11), # Example holiday
    ]

    start_date = datetime(2024, 8, 1)
    end_date = datetime(2024, 11, 30)

    def random_date(start, end):
        while True:
            random_days = random.randint(0, (end - start).days)
            date = start + timedelta(days=random_days)
            if date not in holidays and date.weekday() not in [5, 6]:  # Exclude weekends
                return date

    for exposition in expositions:
        gallery = random.choice(galleries)
        showing_start_date = random_date(start_date, end_date)
        showing_end_date = showing_start_date + timedelta(days=random.randint(7, 30))  # Duration between 1 to 4 weeks

        exposition_entry = Exposition(
            name=exposition["name"],
            description=exposition["description"],
            gallery_id=gallery.id,
            showing_start_date=showing_start_date,
            showing_end_date=showing_end_date
        )
        db.session.add(exposition_entry)

    db.session.commit()

def undo_expositions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expositions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expositions"))

    db.session.commit()
