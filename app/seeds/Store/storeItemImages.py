from app.models import db, StoreItemImage, environment, SCHEMA, StoreItem
import random
from sqlalchemy.sql import text

def seed_store_item_images():
    urls = [
        "https://musee4.s3.us-east-2.amazonaws.com/items/boston-public-library-YoK5pBcSY8s-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/brando-makes-branding-smTDI-z1rlY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/diana-light-u_jt9A7FADk-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/nam-quach-AZPHz_5xc3Q-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/michael-soledad-B4GwdlgTh5Y-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/melanfolia-BX-xZAeYzQc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/martin-pechy-iXHdGk8JVYU-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/markus-spiske-d_TY1dVTEQI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/marcus-urbenz-Ky24fCpz1IE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/library-of-congress-7QytS-1kuIA-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/library-of-congress-7QytS-1kuIA-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/kelly-sikkema-eLKb7DdiCbM-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jingyu-liu-RhPM8AE51f8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-Zkw1u_F6Otw-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-yvsam13wnB8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-Xff03SVhSrA-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-WnSu40IFycQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-vDLjmBwmTbI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-lTQ4QG8N9J4-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-EPfBNIKZ0W8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-AddxUGgVonQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/fons-heijnsbroek-abstract-art-0Ns8v-5550M-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/IMG_3454.HEIC",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jon-tyson-6I6kwRnRhIk-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jocelyn-morales-SvIYuIdUN8s-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jon-tyson-2Fu2HCWt-jo-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jingyu-liu-RhPM8AE51f8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jingxi-lau-XYbcyeKEJWM-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jean-philippe-delberghe-HhAhlXc-ZP0-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jeet-dhanoa-nHH0ivMd9gw-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jeet-dhanoa-tGHkC5ntUGc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/irene-strong-SQEP7N858_E-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/library-of-congress-7QytS-1kuIA-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/library-of-congress-UIj6zCF5nnE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/library-of-congress-t6gqrQb3CL4-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/laura-adai-YlR_JL8mMio-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/laura-cleffmann-xN2QbcKtUEg-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/kari-shea-dC8NC2QBFyQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/koby-QnuXKSUodJc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jon-tyson-KLdTPek0Poo-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jon-tyson-KYyj2DrjRnw-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/jon-tyson-dFFhFELNcDU-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/piotr-miazga-zYGtxp8H5sY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/nordwood-themes-nDd3dIkkOLo-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/michael-soledad-B4GwdlgTh5Y-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/metin-ozer-20lYyolI8Ts-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/mcgill-library-Tf6aZ_QU6Yg-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/mcgill-library-_UVPhmEFMUQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/mathilde-langevin-uUxn6rDi7Kk-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/markus-spiske-d_TY1dVTEQI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/loren-cutler-iOw8bQJQKvo-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/lara-john-6yQbd-Feahc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/trew-xT4pNx4KyJY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/the-blowup-IX0Zy52iG2I-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/surja-sen-das-raj-trZ5LUY10KE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/shio-yang-wUcnlW5c19M-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/items/roman-kraft-sXKoi7ifLno-unsplash.jpg",
    ]
    if environment == "production":
        # Use SQLAlchemy declarative models (if applicable) for production
                store_items = db.session.execute(text("SELECT id FROM musee_schema.store_items")).fetchall()
          # Assuming StoreItem model exists
    else:
        # Use raw SQL for development to avoid relying on existing models
        store_items =StoreItem.query.all()

    # Randomly assign images to each store item
    for store_item in store_items:
        selected_urls = random.sample(urls, k=2)  # Select 2 unique URLs for each item
        for url in selected_urls:
            image = StoreItemImage(
                item_id=store_item.id,
                url=url
            )
            db.session.add(image)

    db.session.commit()

def undo_store_item_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.store_item_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM store_item_images"))

    db.session.commit()
