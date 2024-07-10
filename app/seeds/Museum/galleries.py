from app.models import db, Gallery, environment, SCHEMA
from sqlalchemy.sql import text

def seed_galleries():
    galleries = [
        {"name": "200", "floor": "2"},
        {"name": "201", "floor": "2"},
        {"name": "202", "floor": "2"},
        {"name": "203", "floor": "2"},
        {"name": "204", "floor": "2"},
        {"name": "205", "floor": "2"},
        {"name": "206", "floor": "2"},
        {"name": "300", "floor": "3"},
        {"name": "301", "floor": "3"},
        {"name": "302", "floor": "3"},
        {"name": "303", "floor": "3"},
        {"name": "304", "floor": "3"},
        {"name": "305", "floor": "3"},
        {"name": "306", "floor": "3"},
        {"name": "400", "floor": "4"},
        {"name": "401", "floor": "4"},
        {"name": "402", "floor": "4"},
        {"name": "403", "floor": "4"},
        {"name": "404", "floor": "4"},
        {"name": "405", "floor": "4"},
        {"name": "406", "floor": "4"},
        {"name": "500", "floor": "5"},
        {"name": "501", "floor": "5"},
        {"name": "502", "floor": "5"},
        {"name": "503", "floor": "5"},
        {"name": "504", "floor": "5"},
        {"name": "505", "floor": "5"}
    ]

    for gallery in galleries:
        gallery_entry = Gallery(
            name=gallery["name"],
            floor=gallery["floor"]
        )
        db.session.add(gallery_entry)

    db.session.commit()

def undo_galleries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.galleries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM galleries"))

    db.session.commit()
