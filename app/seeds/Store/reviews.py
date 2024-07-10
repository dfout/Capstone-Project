from app.models import db, Review, environment, SCHEMA
from datetime import datetime
import random
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        {"review": "Amazing quality and design!", "rating": 4.5, "item_id": 1, "user_id": 2},
        {"review": "Really beautiful print, love it!", "rating": 5.0, "item_id": 2, "user_id": 2},
        {"review": "The pen writes so smoothly.", "rating": 4.0, "item_id": 3, "user_id": 2},
        {"review": "Absolutely stunning chair!", "rating": 5.0, "item_id": 4, "user_id": 2},
        {"review": "Stylish and functional.", "rating": 4.5, "item_id": 5, "user_id": 2},
        {"review": "Great notebook, very elegant.", "rating": 4.0, "item_id": 6, "user_id": 2},
        {"review": "Nice set of postcards.", "rating": 3.5, "item_id": 7, "user_id": 2},
        {"review": "Perfect envelopes for my letters.", "rating": 4.0, "item_id": 8, "user_id": 2},
        {"review": "Beautiful earrings!", "rating": 5.0, "item_id": 9, "user_id": 2},
        {"review": "Unique and stylish ring.", "rating": 4.5, "item_id": 10, "user_id": 2},
        {"review": "The print quality is excellent.", "rating": 5.0, "item_id": 11, "user_id": 2},
        {"review": "Quirky and fun clock!", "rating": 4.0, "item_id": 12, "user_id": 2},
        {"review": "Luxurious stationery set.", "rating": 4.5, "item_id": 13, "user_id": 2},
        {"review": "Love the pop art design.", "rating": 5.0, "item_id": 14, "user_id": 2},
        {"review": "Sleek and modern lamp.", "rating": 4.0, "item_id": 15, "user_id": 2},
        {"review": "Cool abstract clock.", "rating": 4.5, "item_id": 16, "user_id": 2},
        {"review": "Elegant necklace, very happy.", "rating": 5.0, "item_id": 17, "user_id": 2},
        {"review": "Nice tote bag, good quality.", "rating": 4.0, "item_id": 18, "user_id": 2},
        {"review": "Interesting sculpture.", "rating": 4.0, "item_id": 19, "user_id": 2},
        {"review": "Minimalist and practical.", "rating": 4.0, "item_id": 20, "user_id": 2},
        {"review": "Beautiful surrealist prints.", "rating": 5.0, "item_id": 21, "user_id": 2},
        {"review": "Excellent quality ink.", "rating": 4.5, "item_id": 22, "user_id": 2},
        {"review": "Love the modern designs.", "rating": 5.0, "item_id": 23, "user_id": 2},
        {"review": "Beautiful bag with great art.", "rating": 4.0, "item_id": 24, "user_id": 2},
        {"review": "Starry Night mug is fantastic!", "rating": 5.0, "item_id": 25, "user_id": 2},
        
        {"review": "Very unique and beautiful.", "rating": 4.5, "item_id": 26, "user_id": 3},
        {"review": "Great quality earrings.", "rating": 4.0, "item_id": 27, "user_id": 3},
        {"review": "Love this art print!", "rating": 5.0, "item_id": 28, "user_id": 3},
        {"review": "Stunning sculpture.", "rating": 5.0, "item_id": 29, "user_id": 3},
        {"review": "Beautiful print, great quality.", "rating": 4.0, "item_id": 30, "user_id": 3},
        {"review": "Vibrant and beautiful print.", "rating": 5.0, "item_id": 31, "user_id": 3},
        {"review": "Amazing quality print.", "rating": 4.5, "item_id": 32, "user_id": 3},
        {"review": "Really cool art puzzle.", "rating": 4.0, "item_id": 33, "user_id": 3},
        {"review": "Very modern and stylish.", "rating": 5.0, "item_id": 34, "user_id": 3},
        {"review": "Love this pop art poster.", "rating": 4.5, "item_id": 35, "user_id": 3},
        {"review": "Beautiful abstract calendar.", "rating": 5.0, "item_id": 36, "user_id": 3},
        {"review": "Unique kinetic sculpture.", "rating": 4.0, "item_id": 37, "user_id": 3},
        {"review": "Great book on contemporary art.", "rating": 4.5, "item_id": 38, "user_id": 3},
        {"review": "Elegant brooch.", "rating": 5.0, "item_id": 39, "user_id": 3},
        {"review": "Fun painting kit.", "rating": 4.0, "item_id": 40, "user_id": 3},
        {"review": "Love the futuristic clock.", "rating": 4.5, "item_id": 41, "user_id": 3},
        {"review": "Really interesting puzzle.", "rating": 5.0, "item_id": 42, "user_id": 3},
        {"review": "Beautiful modern prints.", "rating": 4.5, "item_id": 43, "user_id": 3},
        {"review": "Nice high-end sketchbook.", "rating": 4.0, "item_id": 44, "user_id": 3},
        {"review": "Cool cubist poster.", "rating": 5.0, "item_id": 45, "user_id": 3},
        {"review": "Interesting abstract sculpture.", "rating": 4.5, "item_id": 46, "user_id": 3},
        {"review": "Great post-impressionist book.", "rating": 4.0, "item_id": 47, "user_id": 3},
        {"review": "Love the modern tote bag.", "rating": 4.5, "item_id": 48, "user_id": 3},
        {"review": "Beautiful geometric earrings.", "rating": 5.0, "item_id": 49, "user_id": 3},
        {"review": "High quality ring.", "rating": 4.5, "item_id": 50, "user_id": 3}
    ]

    for review in reviews:
        review_entry = Review(
            review=review["review"],
            rating=review["rating"],
            item_id=review["item_id"],
            user_id=review["user_id"]
        )
        db.session.add(review_entry)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
