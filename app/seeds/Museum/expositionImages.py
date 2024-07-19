from app.models import db, Exposition, ExpositionImage, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_exposition_images():
    image_urls = [
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/xavier-von-erlach-g_2U9j6uIEw-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/roberto-contreras-KyFajImq1-A-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/noah-black-0r7Rxh7-IlM-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mike-von-SBSMmcVPfk4-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mike-von-PWY0iDa_L2Q-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mahdis-mousavi-MJ-bloex-zs-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mahdis-mousavi-KXnWBvUTwww-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mahdis-mousavi-d8ZlAqUDPZM-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mahdis-mousavi-6QNeQyNgANM-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/luis-villasmil-PaXfY3qNCKI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/ioana-cristiana-FFBkz2lOTkE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/grant-ritchie-p-4xI3UPCCY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/clem-onojeghuo-1PI1fUtQsd8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/charlesdeluvio-ZBsqJwNOSoE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/catalina-johnson-TPZuVgMhaaE-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-XYcgAcXEmbQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-V083yGBW7bI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-UWdCEH9gxss-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-uCUBswPHQJ4-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-pJaR19XLsJ0-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-NM8czx6S2dk-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-jmL5tZycink-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-IW_gv2XUrxI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-HOkx92fAs-w-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-HcOvFBXR8dI-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-GlotUMPtNtQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-FOM8031NAG8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-bXcrTXeHync-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-bbKuBkVvUMA-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-B1YnGt8m2u0-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-9lUfbPGeNMQ-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-9GlmeyU5FM8-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/arno-senoner-9dendog0rHs-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/antonin-maurice-Lirw_e4hNCc-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/antenna-jqh0GEvuNBY-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/adrien-olichon-vLSewZXPDFs-unsplash.jpg",
        "https://musee4.s3.us-east-2.amazonaws.com/exhibitions/aaina-sharma-nqj3ncOPS0g-unsplash.jpg",
    ]

    expositions = db.session.query(Exposition).all()

    for index, url in enumerate(image_urls):
        exposition = random.choice(expositions)
        image_entry = ExpositionImage(
            name=f"Exposition Image {index + 1}",
            exposition_id=exposition.id,
            url=url
        )
        db.session.add(image_entry)

    db.session.commit()

def undo_exposition_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exposition_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exposition_images"))

    db.session.commit()
