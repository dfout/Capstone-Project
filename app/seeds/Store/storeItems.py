from app.models import db, StoreItem, environment, SCHEMA
import random
from datetime import datetime
from sqlalchemy.sql import text

def seed_store_items():
    items = [
        {
            "name": "Frida Kahlo Art Print",
            "description": "A vibrant art print of Frida Kahlo's self-portrait.",
            "price": 45.99,
        },
        {
            "name": "Abstract Modern Mug",
            "description": "A ceramic mug with an abstract design inspired by Wassily Kandinsky.",
            "price": 15.99,
        },
        {
            "name": "Luxury Calligraphy Pen",
            "description": "A high-end calligraphy pen with an ergonomic design.",
            "price": 120.00,
        },
        {
            "name": "Designer Wooden Chair",
            "description": "A modern wooden chair with a sleek design by Charles Eames.",
            "price": 450.00,
        },
        {
            "name": "Geometric Paperweight",
            "description": "A stylish geometric paperweight inspired by Piet Mondrian.",
            "price": 30.00,
        },
        {
            "name": "Elegant Notebook",
            "description": "A high-quality notebook with a minimalist design.",
            "price": 25.00,
        },
        {
            "name": "Vincent van Gogh Postcard Set",
            "description": "A set of postcards featuring Vincent van Gogh's famous paintings.",
            "price": 12.50,
        },
        {
            "name": "Modern Envelopes",
            "description": "A set of 20 modern designed envelopes.",
            "price": 10.00,
        },
        {
            "name": "Stylish Earrings",
            "description": "A pair of stylish earrings inspired by contemporary art.",
            "price": 75.00,
        },
        {
            "name": "Artisan Ring",
            "description": "A handmade ring with a unique design.",
            "price": 95.00,
        },
        {
            "name": "Monet Art Print",
            "description": "A beautiful art print of Claude Monet's Water Lilies.",
            "price": 60.00,
        },
        {
            "name": "Dali Clock",
            "description": "A melting clock inspired by Salvador Dali's 'The Persistence of Memory'.",
            "price": 80.00,
        },
        {
            "name": "High-End Stationery Set",
            "description": "A luxurious stationery set with designer paper and envelopes.",
            "price": 55.00,
        },
        {
            "name": "Pop Art Mug",
            "description": "A colorful mug featuring pop art by Andy Warhol.",
            "price": 18.00,
        },
        {
            "name": "Modernist Table Lamp",
            "description": "A sleek table lamp with a modernist design.",
            "price": 150.00,
        },
        {
            "name": "Abstract Wall Clock",
            "description": "A wall clock with an abstract design inspired by Joan Miró.",
            "price": 65.00,
        },
        {
            "name": "Art Deco Necklace",
            "description": "A necklace with an elegant Art Deco design.",
            "price": 130.00,
        },
        {
            "name": "Contemporary Art Tote Bag",
            "description": "A stylish tote bag featuring a contemporary art print.",
            "price": 25.00,
        },
        {
            "name": "Cubist Sculpture",
            "description": "A small sculpture inspired by Cubism.",
            "price": 200.00,
        },
        {
            "name": "Minimalist Desk Organizer",
            "description": "A desk organizer with a minimalist design.",
            "price": 40.00,
        },
        {
            "name": "Surrealist Print Set",
            "description": "A set of prints featuring surrealist art by René Magritte.",
            "price": 75.00,
        },
        {
            "name": "Modern Calligraphy Ink",
            "description": "A bottle of high-quality calligraphy ink.",
            "price": 25.00,
        },
        {
            "name": "Designer Coasters",
            "description": "A set of coasters with modern art designs.",
            "price": 35.00,
        },
        {
            "name": "Frida Kahlo Tote Bag",
            "description": "A tote bag featuring a print of Frida Kahlo's artwork.",
            "price": 30.00,
        },
        {
            "name": "Vincent van Gogh Mug",
            "description": "A mug featuring a print of Vincent van Gogh's Starry Night.",
            "price": 20.00,
        },
        {
            "name": "Leonardo da Vinci Notebook",
            "description": "A notebook with sketches from Leonardo da Vinci.",
            "price": 25.00,
        },
        {
            "name": "Gustav Klimt Earrings",
            "description": "Earrings featuring designs from Gustav Klimt's The Kiss.",
            "price": 80.00,
        },
        {
            "name": "Andy Warhol Art Print",
            "description": "A print of Andy Warhol's famous Campbell's Soup Cans.",
            "price": 45.00,
        },
        {
            "name": "Marcel Duchamp Sculpture",
            "description": "A replica of Marcel Duchamp's famous Fountain.",
            "price": 250.00,
        },
        {
            "name": "Henri Matisse Art Print",
            "description": "A print of Henri Matisse's iconic The Dance.",
            "price": 50.00,
        },
        {
            "name": "Jackson Pollock Art Print",
            "description": "A print of Jackson Pollock's No. 5.",
            "price": 60.00,
        },
        {
            "name": "Mark Rothko Art Print",
            "description": "A print of Mark Rothko's abstract color fields.",
            "price": 55.00,
        },
        {
            "name": "Contemporary Art Puzzle",
            "description": "A puzzle featuring a contemporary art design.",
            "price": 25.00,
        },
        {
            "name": "Modernist Vase",
            "description": "A vase with a sleek, modernist design.",
            "price": 70.00,
        },
        {
            "name": "Pop Art Poster",
            "description": "A poster featuring a pop art design.",
            "price": 20.00,
        },
        {
            "name": "Abstract Art Calendar",
            "description": "A calendar featuring abstract art prints.",
            "price": 15.00,
        },
        {
            "name": "Kinetic Sculpture",
            "description": "A small kinetic sculpture that moves with the wind.",
            "price": 180.00,
        },
        {
            "name": "Contemporary Art Book",
            "description": "A book featuring contemporary art and artists.",
            "price": 40.00,
        },
        {
            "name": "Art Nouveau Brooch",
            "description": "A brooch with an Art Nouveau design.",
            "price": 95.00,
        },
        {
            "name": "Expressionist Painting Kit",
            "description": "A painting kit inspired by expressionist art.",
            "price": 65.00,
        },
        {
            "name": "Futurist Clock",
            "description": "A clock inspired by the Futurist art movement.",
            "price": 85.00,
        },
        {
            "name": "Surrealist Puzzle",
            "description": "A puzzle featuring a surrealist design.",
            "price": 25.00,
        },
        {
            "name": "Modern Art Print Set",
            "description": "A set of prints featuring modern art designs.",
            "price": 90.00,
        },
        {
            "name": "High-End Sketchbook",
            "description": "A sketchbook with high-quality paper for artists.",
            "price": 30.00,
        },
        {
            "name": "Cubist Art Poster",
            "description": "A poster featuring a cubist art design.",
            "price": 20.00,
        },
        {
            "name": "Abstract Sculpture",
            "description": "A small abstract sculpture for home decor.",
            "price": 220.00,
        },
        {
            "name": "Post-Impressionist Art Book",
            "description": "A book featuring post-impressionist art and artists.",
            "price": 35.00,
        },
        {
            "name": "Modern Art Tote Bag",
            "description": "A tote bag featuring modern art designs.",
            "price": 30.00,
        },
        {
            "name": "Geometric Earrings",
            "description": "Earrings with a geometric, modern design.",
            "price": 70.00,
        }
    ]

    for item in items:
        store_item = StoreItem(
            name=item["name"],
            description=item["description"],
            price=item["price"],
            stock=random.randint(5, 100)
        )
        db.session.add(store_item)

    db.session.commit()

def undo_store_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.store_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM store_items"))

    db.session.commit()
