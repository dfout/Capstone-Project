from app.models import db, OrderedItem, StoreOrder, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_ordered_items():
    # Get all reviews
    reviews = db.session.query(Review).all()

    # Get a dictionary mapping user_id to their order
    user_orders = {order.purchaser_id: order.id for order in db.session.query(StoreOrder).all()}

    for review in reviews:
        ordered_item = OrderedItem(
            order_id=user_orders[review.user_id],
            item_id=review.item_id,
            quantity=1  # Assuming quantity is 1 for each review
        )
        db.session.add(ordered_item)

    db.session.commit()

def undo_ordered_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ordered_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ordered_items"))

    db.session.commit()
