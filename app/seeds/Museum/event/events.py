from app.models import db, Event, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_events():
    events = [
        {
            "title": "Making Pottery",
            "description": "Join us for a hands-on pottery workshop where you'll learn to shape and glaze your own creations. Suitable for all skill levels.",
            "gallery_id": 1,
            "max_participants": 20,
            "date": datetime(2024, 8, 1, 10, 0),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": False
        },
        {
            "title": "Sketch Workshop",
            "description": "Enhance your sketching skills with our expert-led workshop. Bring your own materials or use ours.",
            "gallery_id": 2,
            "max_participants": 30,
            "date": datetime(2024, 8, 2, 13, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Modern Art Education Night",
            "description": "Dive deep into the world of modern art with our education night, featuring discussions and Q&A sessions.",
            "gallery_id": 3,
            "max_participants": 50,
            "date": datetime(2024, 8, 3, 17, 30),
            "event_duration": 3.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Kids Create",
            "description": "A fun and interactive session for kids to explore their creativity through various art projects.",
            "gallery_id": 4,
            "max_participants": 25,
            "date": datetime(2024, 8, 4, 11, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Member Early Risers",
            "description": "Exclusive early morning event for members to enjoy the gallery in a quiet and intimate setting.",
            "gallery_id": 5,
            "max_participants": 15,
            "date": datetime(2024, 8, 5, 9, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Late Night with Picasso",
            "description": "Experience the art of Picasso in a special late-night viewing, with guided tours and discussions.",
            "gallery_id": 6,
            "max_participants": 40,
            "date": datetime(2024, 8, 6, 20, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Film Screening: 'Abstract Vision' by Jane Doe (2022)",
            "description": "Watch the independent film 'Abstract Vision' by director Jane Doe, followed by a Q&A session.",
            "gallery_id": 7,
            "max_participants": 50,
            "date": datetime(2024, 8, 7, 14, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Sculpture Workshop",
            "description": "Learn the basics of sculpture in this hands-on workshop, suitable for beginners and advanced artists alike.",
            "gallery_id": 8,
            "max_participants": 25,
            "date": datetime(2024, 8, 8, 15, 0),
            "event_duration": 3.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": False
        },
        {
            "title": "Watercolor Painting",
            "description": "Explore the techniques of watercolor painting in this interactive workshop.",
            "gallery_id": 9,
            "max_participants": 20,
            "date": datetime(2024, 8, 9, 11, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Evening with Van Gogh",
            "description": "Enjoy an evening dedicated to the works of Van Gogh, including a guided tour and painting session.",
            "gallery_id": 10,
            "max_participants": 30,
            "date": datetime(2024, 8, 10, 18, 0),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        # Additional events (11-50) follow the same format with varied details
        {
            "title": "Art and Wine Night",
            "description": "Join us for an evening of art appreciation and wine tasting.",
            "gallery_id": 11,
            "max_participants": 35,
            "date": datetime(2024, 8, 11, 19, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": False
        },
        {
            "title": "Photography Basics",
            "description": "Learn the fundamentals of photography in this introductory workshop.",
            "gallery_id": 12,
            "max_participants": 25,
            "date": datetime(2024, 8, 12, 12, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Member Exclusive: Early Morning Sketching",
            "description": "Exclusive sketching session for members in a tranquil gallery setting.",
            "gallery_id": 13,
            "max_participants": 10,
            "date": datetime(2024, 8, 13, 8, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Abstract Art Night",
            "description": "Explore the world of abstract art with guided tours and interactive sessions.",
            "gallery_id": 14,
            "max_participants": 40,
            "date": datetime(2024, 8, 14, 19, 0),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": False
        },
        {
            "title": "Art History Lecture",
            "description": "Attend a fascinating lecture on art history with our expert speaker.",
            "gallery_id": 15,
            "max_participants": 50,
            "date": datetime(2024, 8, 15, 16, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Member's Night",
            "description": "A special evening event exclusively for members with live music and art displays.",
            "gallery_id": 16,
            "max_participants": 30,
            "date": datetime(2024, 8, 16, 20, 0),
            "event_duration": 3.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Contemporary Art Workshop",
            "description": "Dive into contemporary art techniques and styles in this engaging workshop.",
            "gallery_id": 17,
            "max_participants": 20,
            "date": datetime(2024, 8, 17, 13, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Independent Film Screening: 'The Artist's Journey' by John Smith (2023)",
            "description": "Screening of 'The Artist's Journey', a compelling film by John Smith, followed by a discussion.",
            "gallery_id": 18,
            "max_participants": 50,
            "date": datetime(2024, 8, 18, 15, 0),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Late Night Art Jam",
            "description": "Join us for a late-night art jam session with live music and interactive art projects.",
            "gallery_id": 19,
            "max_participants": 35,
            "date": datetime(2024, 8, 19, 21, 0),
            "event_duration": 3.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Portrait Drawing",
            "description": "Learn the techniques of portrait drawing in this focused workshop.",
            "gallery_id": 20,
            "max_participants": 20,
            "date": datetime(2024, 8, 20, 10, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Exclusive Member Tour",
            "description": "Enjoy an exclusive guided tour of the latest exhibits, available only to members.",
            "gallery_id": 21,
            "max_participants": 15,
            "date": datetime(2024, 8, 21, 9, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Art Therapy Session",
            "description": "Participate in an art therapy session designed to help you express your emotions through creativity.",
            "gallery_id": 22,
            "max_participants": 20,
            "date": datetime(2024, 8, 22, 14, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Kids Art Hour",
            "description": "An engaging hour of art activities designed specifically for kids.",
            "gallery_id": 23,
            "max_participants": 25,
            "date": datetime(2024, 8, 23, 11, 0),
            "event_duration": 1.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Evening with Monet",
            "description": "Explore the works of Monet with a special evening tour and discussion.",
            "gallery_id": 24,
            "max_participants": 30,
            "date": datetime(2024, 8, 24, 18, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Calligraphy Workshop",
            "description": "Learn the art of calligraphy in this hands-on workshop.",
            "gallery_id": 25,
            "max_participants": 20,
            "date": datetime(2024, 8, 25, 10, 30),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Mixed Media Art",
            "description": "Experiment with mixed media techniques in this creative workshop.",
            "gallery_id": 26,
            "max_participants": 25,
            "date": datetime(2024, 8, 26, 12, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Art Critique Night",
            "description": "Join us for an evening of constructive art critiques and discussions.",
            "gallery_id": 27,
            "max_participants": 40,
            "date": datetime(2024, 8, 27, 19, 0),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": False
        },
        # Repeat similar patterns for remaining events (28-50)
        {
            "title": "Ceramics Workshop",
            "description": "Discover the art of ceramics in this interactive workshop.",
            "gallery_id": 1,
            "max_participants": 20,
            "date": datetime(2024, 8, 28, 10, 0),
            "event_duration": 2.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": False
        },
        {
            "title": "Printmaking Techniques",
            "description": "Learn various printmaking techniques in this hands-on workshop.",
            "gallery_id": 2,
            "max_participants": 30,
            "date": datetime(2024, 8, 29, 14, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Exclusive Member Preview",
            "description": "Get a first look at our newest exhibit with this exclusive member preview.",
            "gallery_id": 3,
            "max_participants": 15,
            "date": datetime(2024, 8, 30, 9, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Figure Drawing",
            "description": "Improve your figure drawing skills with live models and expert instruction.",
            "gallery_id": 4,
            "max_participants": 25,
            "date": datetime(2024, 9, 1, 13, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Art and Music Night",
            "description": "Experience art and live music in this unique evening event.",
            "gallery_id": 5,
            "max_participants": 35,
            "date": datetime(2024, 9, 2, 18, 0),
            "event_duration": 3.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Kids Clay Day",
            "description": "A fun clay modeling session for kids of all ages.",
            "gallery_id": 6,
            "max_participants": 25,
            "date": datetime(2024, 9, 3, 11, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Member Late Night Tour",
            "description": "Enjoy a late-night tour of our current exhibits, exclusively for members.",
            "gallery_id": 7,
            "max_participants": 20,
            "date": datetime(2024, 9, 4, 20, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        },
        {
            "title": "Intro to Oil Painting",
            "description": "Learn the basics of oil painting in this introductory workshop.",
            "gallery_id": 8,
            "max_participants": 15,
            "date": datetime(2024, 9, 5, 10, 30),
            "event_duration": 3.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Art and Literature",
            "description": "Explore the connections between art and literature in this engaging session.",
            "gallery_id": 9,
            "max_participants": 30,
            "date": datetime(2024, 9, 6, 14, 0),
            "event_duration": 2.0,
            "is_free": False,
            "is_free_with_admission": True,
            "members_only": False
        },
        {
            "title": "Member Morning Meditation",
            "description": "Start your day with a peaceful meditation session, available exclusively to members.",
            "gallery_id": 10,
            "max_participants": 10,
            "date": datetime(2024, 9, 7, 8, 0),
            "event_duration": 1.5,
            "is_free": False,
            "is_free_with_admission": False,
            "members_only": True
        }
    ]

    for event in events:
        event_entry = Event(
            title=event["title"],
            description=event["description"],
            gallery_id=event["gallery_id"],
            max_participants=event["max_participants"],
            date=event["date"],
            event_duration=event["event_duration"],
            is_free=event["is_free"],
            is_free_with_admission=event["is_free_with_admission"],
            members_only = event['members_only']
        )

        db.session.add(event_entry)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
        
    db.session.commit()
