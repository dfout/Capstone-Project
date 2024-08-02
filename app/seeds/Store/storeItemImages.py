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
              "item_id":1,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.38.37.png'
              
         },
         {
             "item_id": 1,
             "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.35.27.png"
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
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-30+at+10.44.25.png"
              
         },
        {
              "item_id": 5, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-30+at+10.44.33.png"
              
         },
         {
              "item_id":6,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+10.46.16.png'
              
         },
               {
              "item_id": 7, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/two+way+table+1.png"
              
         },
         {
             "item_id":7,
             "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/two+way+table+2.png"
         },

        
        {
              "item_id": 8, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/grids-new.png"
              
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
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/coffee+table.png"
              
         },
         {
             "item_id": 12,
             "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/coffee+table+3+.png"
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
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/hilma.png"
              
         },
        {
              "item_id": 15, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/womb+chair.png"
              
         },
         
        {
              "item_id": 16, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/flask-pantone.png"
              
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
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/modern+print.png"
              
         },
        {
              "item_id": 19, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/sunglasses.png"
              
         },
         {
             "item_id": 19, 
             "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/haring-sunglasses.png"
             
         },
        

         {
              "item_id":20,
             "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/picasso+print2.png '
         }, 
         {
              "item_id": 21,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/gloopy1.png"
         },
         {
             "item_id": 21, 
             "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/gloopy2.png"
         },
         {
              "item_id": 22,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/pop+art+leavin.png"
              
         },
         {
              "item_id":23,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/espresso.png"

         },
         {
              "item_id": 24,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/eames+ele+2+.png"

         },
         {
              "item_id":24,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/eames+ele.png"
              
         },
                  {
              "item_id": 25,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/lamy+pen+2.png"
              
         },
         {
              "item_id": 25, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/lamy+pen+1+.png"
         },
                  {
              "item_id": 26,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/pantone+notebook+1.png"
              
         },
                  {
              "item_id": 27,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/german+yellow+pen.png"
              
         },
                  {
              "item_id": 28,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/warhol-print.png"
              
         },
                  {
              "item_id": 29,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/designer+chair.png"
              
         },
        {
              "item_id": 30,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/new-keng.png"
              
         },
                 {
              "item_id": 30,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/kingston+2.png"
              
         },
                  {
              "item_id": 31,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/duchamp+print.png"
              
         },
         {
              "item_id":32,
              "url":'https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-21+at+09.42.20.png'
         },

         # "contemporary art puzzle " : 33 = Boiler
        {
              "item_id": 33,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/saarin+table.png"
              
         },
         {
             "item_id": 33,
             "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/saarin+table+2.png"
             
         },
                  {
              "item_id": 34,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/picasso+coloring+book.png"
              
         },
         {
              "item_id": 35, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/bd+toutes.png"
         },
                  {
              "item_id": 36,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/musee+print.png"
              
         },
         {
              "item_id": 37, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/magritte.png"
              
         },
        {
              "item_id": 38,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/yayoi+book+3.png"
              
         },
               {
              "item_id": 38,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/yayoi+book.png"
              
         },
               {
              "item_id": 38,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/yayoi+book+2.png"
              
         },
                  {
              "item_id": 39,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/Screenshot+2024-07-22+at+15.02.15.png"
              
         },
                  {
              "item_id": 40,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/picasso+print.png"
              
         },
                  {
              "item_id": 41,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/toy+buzzle.png"
              
         },
                  {
              "item_id": 42,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/banan+toy.png"
              
         },
         {
              "item_id": 42,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/banantoy1.png"
         },
            {
              "item_id": 43,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/skull+toys.png"
              
         },
        {
              "item_id": 43,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/skull+toy.png"
              
         },
        {
              "item_id": 44,
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/wright+puzzle.png"
              
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
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/yayoi+print.png"
              
         },
         {
              "item_id": 48, 
              "url": "https://musee4.s3.us-east-2.amazonaws.com/new-store-items/bauhaus+print.png"
  
         },
         {
              "item_id": 49,
              "url":"https://musee4.s3.us-east-2.amazonaws.com/new-store-items/german+notebook.png"
         }
    ]
    

    for image in item_images:
        item_image = StoreItemImage(
            item_id= image["item_id"],
            url=image["url"]
        )
        db.session.add(item_image)
    db.session.commit()


def undo_store_item_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.store_item_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM store_item_images"))

    db.session.commit()
