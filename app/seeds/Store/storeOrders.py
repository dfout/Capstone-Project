from app.models import db, StoreOrder, User, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_store_orders():
    # Get all users who have left reviews
    users_with_reviews = db.session.query(User).join(Review).distinct().all()

    for user in users_with_reviews:
        order = StoreOrder(
            purchaser_id=user.id,
            status='completed'
        )
        db.session.add(order)

    db.session.commit()

def undo_store_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.store_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM store_orders"))

    db.session.commit()
