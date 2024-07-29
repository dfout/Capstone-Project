from app.models import db, StoreItemImage, environment, SCHEMA, StoreItem
import random
from sqlalchemy.sql import text

def seed_store_item_images():
    
    item_images = [
         {
              "item_id":1,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.38.44.png'
              
         },
         {
              "item_id":2,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/sketchbook.png"
              
         },
         {
              "item_id":3,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/red+chair.png"
              
         },
         {
              "item_id":4,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/candle.png"
              
         },
         {
              "item_id": 5, 
              "url": ""
              
         },
         {
              "item_id":6,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.46.16.png'
              
         },
               {
              "item_id": 7, 
              "url": ""
              
         },
        {
              "item_id": 8, 
              "url": ""
              
         },
        {
              "item_id":9,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.17.41.png'
         },
        {
              "item_id":10,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.44.49.png"
              
         },
        {
              "item_id":11,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.07.51.png"
              
         },
        {
              "item_id": 12, 
              "url": ""
              
         },
         {
              "item_id": 13,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.03.28.png'
              
         },
         {
              "item_id":13,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.03.57.png'
              
         },
         {
              "item_id": 13,
              "url": 'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.03.34.png'
              
         },
        {
              "item_id": 14, 
              "url": ""
              
         },
        {
              "item_id": 15, 
              "url": ""
              
         },
        {
              "item_id": 16, 
              "url": ""
              
         },
         {
              "item_id": 17,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.42.44.png"
         },
         {
              "item_id": 17, 
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.42.59.png"
              
         },
        {
              "item_id": 18, 
              "url": ""
              
         },
        {
              "item_id": 19, 
              "url": ""
              
         },
        # cubist sculpture needs to be changed
        # Romare bearden ?
        # Eames chair 
        # pop art mug? 

         {
              "item_id":20,
             "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/picasso+print2.png '
         }, 
         {
              "item_id": 21,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/warhol-print.png"
         },
         {
              "item_id": 22,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/pop+art+leavin.png"
              
         },
         {
              "item_id":23,

         },
         {
              "item_id": 24,

         },
                  {
              "item_id": 25,
              
         },
                  {
              "item_id": 26,
              
         },
                  {
              "item_id": 27,
              
         },
                  {
              "item_id": 28,
              
         },
                  {
              "item_id": 29,
              
         },
                  {
              "item_id": 30,
              
         },
                  {
              "item_id": 31,
              
         },
         {
              "item_id":32,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.42.20.png'
         },
                  {
              "item_id": 33,
              
         },
                  {
              "item_id": 34,
              
         },
         {
              "item_id": 35, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/bd+toutes.png"
         },
                  {
              "item_id": 36,
              
         },
         {
              "item_id": 37, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/magritte.png"
              
         },
        {
              "item_id": 38,
              
         },
                  {
              "item_id": 39,
              
         },
                  {
              "item_id": 40,
              
         },
                  {
              "item_id": 41,
              
         },
                  {
              "item_id": 42,
              
         },
                  {
              "item_id": 43,
              
         },
                  {
              "item_id": 44,
              
         },
        {
              "item_id": 45,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/helvetica.png"
              
         },

         {
              "item_id": 46, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/agnes+varda+book.png"
         }, 
         {
              "item_id": 47, 
              "url": ""
              
         },
         {
              "item_id": 48, 
  
         },
         {
              "item_id": 49,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/german+notebook.png"
         }
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
