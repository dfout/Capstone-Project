from app.models import db, EventImage, environment, SCHEMA, Event
from sqlalchemy.sql import text
import random

def seed_event_images():
    urls = [
        "https://musee4.s3.us-east-2.amazonaws.com/events/wei-cheng-wu-R7lSwItK0LE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/taylor-heery-g7dUm6lRvtQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/tamarcus-brown-zuQDqLFavI4-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/sander-dalhuisen-NFlyFizf2JU-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/robert-mathews-xXaLfz6V9rQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/pauline-loroy-AlLKJ292jOQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/melanfolia-BX-xZAeYzQc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/kevin-laminto-4xbUFduTEY0-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/kelsey-todd-sUMHJe9FmqY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/jakob-dalbjorn-cuKJre3nyYc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/ioana-cristiana-FFBkz2lOTkE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/green-liu-LHkn9iu4Swk-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/grant-ritchie-p-4xI3UPCCY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/emily-webster-slHj-A9HQp0-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/eleonora-JcL5sCUnBeI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/devn-V7T7_A0FIIY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/bernard-hermant-bbuTpY447gA-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/austin-distel-rxpThOwuVgE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/antenna-cw-cj_nFa14-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/andrian-valeanu-yjXlyrKIz2A-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/al-elmes-ULHxWq8reao-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/AdobeStock_354120480.jpeg",
        "https://musee4.s3.us-east-2.amazonaws.com/events/aaina-sharma-nqj3ncOPS0g-unsplash.jpg"
    ]

    # # Fetch all event IDs
    # events = db.session.execute(text("SELECT id, title FROM events")).fetchall()

    if environment == "production":
    # Use SQLAlchemy declarative models (if applicable) for production
            events = db.session.execute(text("SELECT id FROM musee_schema.events")).fetchall()
        # Assuming StoreItem model exists
    else:
    # Use raw SQL for development to avoid relying on existing models
        events =Event.query.all()

    # Randomly assign images to each event
    for event in events:
        
        selected_url = random.choice(urls)  # Select a random URL for each event
        image = EventImage(
            event_id=event.id,
            name=event.title,
            url=selected_url
        )
        db.session.add(image)

    db.session.commit()

def undo_event_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_images"))

    db.session.commit()
