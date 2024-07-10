from app.models import db, environment, SCHEMA, Artist
from datetime import datetime
from sqlalchemy.sql import text

def seed_artists():
    artists = [
        Artist(name="Pablo Picasso", about="Spanish painter and sculptor, co-founder of Cubism.", born=datetime(1881, 10, 25), died=datetime(1973, 4, 8)),
        Artist(name="Frida Kahlo", about="Mexican painter known for her self-portraits.", born=datetime(1907, 7, 6), died=datetime(1954, 7, 13)),
        Artist(name="Andy Warhol", about="American artist, leading figure in the visual art movement known as Pop Art.", born=datetime(1928, 8, 6), died=datetime(1987, 2, 22)),
        Artist(name="Jackson Pollock", about="American painter and major figure in the abstract expressionist movement.", born=datetime(1912, 1, 28), died=datetime(1956, 8, 11)),
        Artist(name="Yayoi Kusama", about="Japanese contemporary artist who works primarily in sculpture and installation.", born=datetime(1929, 3, 22)),
        Artist(name="Damien Hirst", about="English artist, entrepreneur, and art collector, known for his controversial works.", born=datetime(1965, 6, 7)),
        Artist(name="Jeff Koons", about="American artist known for working with popular culture subjects and his reproductions of banal objects.", born=datetime(1955, 1, 21)),
        Artist(name="Banksy", about="Anonymous England-based street artist, political activist, and film director.", born=None),
        Artist(name="Jean-Michel Basquiat", about="American artist known for his graffiti-inspired paintings.", born=datetime(1960, 12, 22), died=datetime(1988, 8, 12)),
        Artist(name="Ai Weiwei", about="Chinese contemporary artist and activist.", born=datetime(1957, 8, 28)),
        Artist(name="Marina Abramović", about="Serbian conceptual and performance artist.", born=datetime(1946, 11, 30)),
        Artist(name="Cindy Sherman", about="American photographer and film director known for her conceptual portraits.", born=datetime(1954, 1, 19)),
        Artist(name="Kara Walker", about="American contemporary painter, silhouettist, print-maker, installation artist, and film-maker.", born=datetime(1969, 11, 26)),
        Artist(name="Takashi Murakami", about="Japanese contemporary artist known for blurring the line between high and low arts.", born=datetime(1962, 2, 1)),
        Artist(name="Gerhard Richter", about="German visual artist known for abstract as well as photorealistic paintings.", born=datetime(1932, 2, 9)),
        Artist(name="Anish Kapoor", about="British-Indian sculptor specializing in installation art and conceptual art.", born=datetime(1954, 3, 12)),
        Artist(name="Louise Bourgeois", about="French-American artist known for her large-scale sculpture and installation art.", born=datetime(1911, 12, 25), died=datetime(2010, 5, 31)),
        Artist(name="Olafur Eliasson", about="Danish-Icelandic artist known for sculptures and large-scale installation art.", born=datetime(1967, 2, 5)),
        Artist(name="David Hockney", about="English painter, draftsman, printmaker, stage designer, and photographer.", born=datetime(1937, 7, 9)),
        Artist(name="Cai Guo-Qiang", about="Chinese artist known for his explosion events and gunpowder drawings.", born=datetime(1957, 12, 8)),
        Artist(name="Tracey Emin", about="English contemporary artist known for her autobiographical and confessional artwork.", born=datetime(1963, 7, 3)),
        Artist(name="Richard Serra", about="American sculptor known for his large-scale abstract steel sculptures.", born=datetime(1938, 11, 2)),
        Artist(name="Yoko Ono", about="Japanese multimedia artist, singer, and peace activist.", born=datetime(1933, 2, 18)),
        Artist(name="Barbara Kruger", about="American conceptual artist known for her black-and-white photographs overlaid with declarative captions.", born=datetime(1945, 1, 26)),
        Artist(name="Wolfgang Tillmans", about="German photographer known for his diverse body of work.", born=datetime(1968, 8, 16)),
        Artist(name="Julian Schnabel", about="American painter and filmmaker.", born=datetime(1951, 10, 26)),
        Artist(name="Jenny Holzer", about="American neo-conceptual artist known for her use of words and ideas in public spaces.", born=datetime(1950, 7, 29)),
        Artist(name="Ed Ruscha", about="American artist associated with the Pop Art movement.", born=datetime(1937, 12, 16)),
        Artist(name="Chuck Close", about="American painter and photographer known for his large-scale photorealist portraits.", born=datetime(1940, 7, 5), died=datetime(2021, 8, 19)),
        Artist(name="Rineke Dijkstra", about="Dutch photographer known for her portraiture.", born=datetime(1959, 6, 2)),
        Artist(name="Kehinde Wiley", about="American portrait painter known for his highly naturalistic paintings of African Americans.", born=datetime(1977, 2, 28)),
        Artist(name="Sophie Calle", about="French writer, photographer, installation artist, and conceptual artist.", born=datetime(1953, 10, 9)),
        Artist(name="Bruce Nauman", about="American artist known for his work in sculpture, photography, neon, video, drawing, printmaking, and performance.", born=datetime(1941, 12, 6)),
        Artist(name="Kiki Smith", about="American artist known for her multidisciplinary practice relating to the human condition and the natural world.", born=datetime(1954, 1, 18)),
        Artist(name="Kerry James Marshall", about="American artist known for his large-scale paintings of Black figures.", born=datetime(1955, 10, 17)),
        Artist(name="Shirin Neshat", about="Iranian visual artist known for her work in film, video, and photography.", born=datetime(1957, 3, 26)),
        Artist(name="Nan Goldin", about="American photographer known for her intimate and often candid photographs.", born=datetime(1953, 9, 12)),
        Artist(name="Chris Ofili", about="British painter known for his paintings incorporating elephant dung.", born=datetime(1968, 10, 10)),
        Artist(name="Sarah Lucas", about="English artist known for her provocative and humorous sculptures and installations.", born=datetime(1962, 10, 14)),
        Artist(name="Matthew Barney", about="American artist known for his works in sculpture, photography, drawing, and film.", born=datetime(1967, 3, 25)),
        Artist(name="Isa Genzken", about="German artist known for her work in sculpture, painting, photography, collage, and installation art.", born=datetime(1948, 11, 27)),
        Artist(name="Zhang Huan", about="Chinese artist known for his performance art and use of his own body.", born=datetime(1965, 1, 10)),
        Artist(name="Andrea Fraser", about="American performance artist, mainly known for her work in institutional critique.", born=datetime(1965, 8, 26)),
        Artist(name="Mark Bradford", about="American artist known for his large-scale abstract paintings.", born=datetime(1961, 11, 20)),
        Artist(name="Adrian Piper", about="American conceptual artist and philosopher known for her work in social critique.", born=datetime(1948, 9, 20)),
        Artist(name="Glenn Ligon", about="American conceptual artist whose work explores race, language, desire, and identity.", born=datetime(1960, 10, 20)),
        Artist(name="Wangechi Mutu", about="Kenyan-American artist known for her work in painting, sculpture, film, and performance.", born=datetime(1972, 6, 22)),
        Artist(name="Tino Sehgal", about="British-German artist known for his 'constructed situations' in museums and galleries.", born=datetime(1976, 1, 20)),
        Artist(name="Lorna Simpson", about="American artist known for her photography, video, and multimedia works exploring identity, gender, and race.", born=datetime(1960, 8, 13)),
    ]

    for artist in artists:
        db.session.add(artist)
    
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))
        
    db.session.commit()
