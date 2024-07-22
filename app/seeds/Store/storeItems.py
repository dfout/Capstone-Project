from app.models import db, StoreItem, environment, SCHEMA
import random
from datetime import datetime
from sqlalchemy.sql import text

def seed_store_items():
    items = [
        {
            "name": "Pratone Lounge Chair",
            "description": "Gufram 'Pratone' lounge chair designed by Pietro Derossi, Giorgio Ceretti and Riccardo Rosso.",
            "price": 10000.00,
        },
        {
            "name": "Maruman Soho Sketchbook B4",
            "description": "Named for New York's famous SoHo district, Maruman Soho sketch books are perfect for sketching at home or on the go. This New Soho Series sketchbook features a colored cardstock cover, thick cardboard backing, and 70 pages of lightly textured, acid-free heavyweight art paper suitable for watercolors, pens, and colored pencils. Its glue binding lets you pull out finished pages cleanly and easily.",
            "price": 20.99,
        },
        {
            "name": "Panton Chair Classis",
            "description": "Having conceived a design for an all-plastic chair made from one piece, it took Verner Panton several years to find a manufacturer. He first came into contact with Vitra in 1963 and together they developed the Panton Chair, which was presented in 1967. It was hailed as a sensation and received numerous prizes. The original version of the chair with a glossy lacquer finish is still marketed today under the name Panton Chair Classic. Referring to the 50th anniversary of the Panton Chair, Marianne Panton talks about living with her husband, the creation of the chair icon and the two limited editions Panton Chrome and Panton Glow from 2018.",
            "price": 2370.00,
        },
        {
            "name": "The Original Tinned Fish Candle | Pulpo in Tomato Sauce",
            "description": "Introducing the latest addition to the Original Tinned Fish Candle line - Pulpo in Tomato Sauce , AKA, 'I Like It When You Call Me Big Pulpo.' This extraordinary candle is a true masterpiece, combining the essence of the ocean with the warmth of a cozy, candlelit atmosphere. Captivating Design: Encased in a charming tinned fish container, 'I Like It When You Call Me Big Pulpo' features two intricately crafted octopus shapes. This stunning centerpiece is not only a visual delight but also a symbol of the ocean's mystique and the beauty it holds within.",
            "price": 65.00,
        },
        {
            "name": "Eames Chair",
            "description": "The epitome of mid-century modern design, the Eames® Lounge Chair and Ottoman is at home both in great museums and wherever you live. Its sophisticated style and luxurious comfort only get better with age.",
            "price": 8965.00,
        },
        {
            "name": "Georges Braque",
            "description": """In this volume, Henry R. Hope of the University of Indiana and editor of the College Art Journal, faithfully and clearly traces Braque's life, his triumphs and failures, from the date of his birth-May 13, 1882- to the present. We see him as the adolescent who loves sailing, the awkward student of impressionism, the young fauve, the cubist master, the ballet designer, the sculptor, the gourmet and connoisseur to whom 'even the act of stopping his work to smoke a cigarette is something to be done with relish and enjoyment.' Changes of attitude, style, motive, friends, even of summer houses, are carefully documented and described in a succinct, lucid style. 170 pp.; 135 illus. Published in 1948 and edited by Henry R. Hope, this rare book from MoMA Publications is available in extremely limited quantities. Each book from this special selection has been stored for decades in MoMA’s warehouse. MoMA’s award-winning publications program has been an integral part of the Museum’s mission since its founding in 1929. These exhibition- and collection-related titles are renowned for their high production values. Please note that the cover photo is for reference only and does not reflect the actual condition of the book being sold.""",
            "price": 25.00,
        },
        {
            "name": "Two-Way Side Table-Blue",
            "description": """ Cleverly designed for versatility, the Two-Way Side Table is a strikingly simple, shape-shifting piece. Crafted from planes of transparent acrylic, this small table playfully interacts with its surroundings, creating new colors and reflections specific to the space it lives in. The 16h x 18w x 10" design can be used horizontally as an eye-catching side table, or vertically as a stand that intersects a sofa to keep drinks and remotes handy. Designed in Montreal, the Two-Way Side Table is as versatile as it is sculptural.""",
            "price": 195.00,
        },
        {
            "name": "Modern Envelopes",
            "description": "A set of 20 modern designed envelopes.",
            "price": 10.00,
        },
        {
            "name": "Jean-Michel Basquiat: Untitled, 1981 Framed Print",
            "description": """"This framed print features a reproduction of Untitled, 1981 by Jean-Michel Basquiat, an artist whose work is featured in MoMA's collection. It's printed on heavy watercolor paper with a black wood frame, white acid-free mat and gallery acrylic finish and wired for hanging. Measures 23.25h x 28.5"w" """,
            "price": 300.00,
        },
        {
            "name": "Keith Haring",
            "description": """
        Closely based on Haring's own concept for the monograph he wanted to publish before his untimely death this volume represents more than a decade of research and contains a wealth of unpublished photographic and written material including drawings studio photographs and journal entries. From chalk drawings deep in the New York City subways to murals in Pisa and Berlin; collaborations with William Burroughs and the famous body painting of Grace Jones this book follows the incredible trajectory of Keith Haring's artistic career: how a young man from a small town in rural Pennsylvania came to revolutionize the art world and the course of art history within little more than a decade. An incredibly prolific artist Keith Haring created countless bold provocative endearing and unforgettable images that continue to inspire artists and delight children ”worldwide. Tracing the arc from his early subway "tags" to his poignant work on social issues as diverse as AIDS illiteracy and apartheid this visually stunning book is the definitive work on Keith Haring.""",
            "price": 55.00,
        },
        {
            "name": "Eero Saarinen: Furniture for Everyman",
            "description": """
One of the most celebrated, prolific, and unorthodox architects and designers of the twentieth century, Eero Saarinen has become a beacon of American modernism. While famous for his sculptural and bold architecture, such as the Gateway Arch in St. Louis, Missouri and the TWA Terminal at the John F. Kennedy International Airport in New York, Eero Saarinen: Furniture for Everyman is the first monograph to focus exclusively on his furniture designs. A self-declared “form-giver,” his furniture, like his architecture, is characterized by its sleek and expressive forms.

Taken into production by the furniture company Knoll, which was co-owned by his friend Florence Knoll, Saarinen’s designs were trend-setting and revolutionary. As many of them continue to be produced today, such as the well-known and loved Womb chair and his Pedestal Collection, they are ubiquitous. Featuring rare and never-before-seen archival photographs that span Saarinen’s technical work to his personal life, a preface by Florence Knoll, and a piece by designer and Saarinen protégé Niels Diffrient, Eero Saarinen: Furniture for Everyman is the authoritative and comprehensive guide to the furniture designs and legacy of the modern master.""",
            "price": 250.00,
        },
        {
            "name": "Noguchi Coffee Table from Herman Miller",
            "description": """
The Noguchi Coffee Table was originally designed in 1939 as a commission from the president of MoMA and is now featured in the Museum's collection. Noguchi modified the design in 1944 to accompany an article by designer George Nelson, entitled, "How to Make a Table." This design reflects the biomorphic imagery of Noguchi's contemporary sculpture. It consists of just three pieces: a free-form plate-glass top with flat polished edges, and a self-stabilizing tripod made of two interlocking curved legs of solid or ebonized walnut. With its successful balance of sculptural form and everyday function, this piece is one of Isamu Noguchi's best-known designs. Made by Herman Miller®. Some assembly required.""",
            "price": 2295,
        },
        {
            "name": "Bubbles Bookend",
            "description": """
Crafted from weighty, polished stainless steel yet visually airy, this bookend is composed of ten connected silver balls that evoke thought bubbles—a perfect complement to your bookshelf. The Bubbles Bookend measures 5.3h x 5.7w x 5.7”d. Each bookend is sold separately.
""",
            "price": 89.00,
        },
        {
            "name": "Pop Art Mug",
            "description": "A colorful mug featuring pop art by Andy Warhol.",
            "price": 18.00,
        },
        {
            "name": "Eero Saarinen: Womb Chair",
            "description": """"One of the most iconic and comfortable chairs of the modern furniture movement, the womb chair was born from Florence Knoll's request for Eero Saarinen to create her a chair that she could "curl up in like a basket of pillows.""""",
            "price": 5800.00,
        },
        {
            "name": "Keith Haring Sunglasses",
            "description": """"“Art is for everybody” was a motto of artist Keith Haring—and these sunglasses live up to that philosophy. These minimalist sunglasses pay homage to the Pop art legend’s work with temple tips shaped like his famous line work. Inspired by glasses that Haring wore, these limited edition sunglasses have frames that are handmade from an eco-friendly cellulose acetate and come in a Keith Haring cork leather case with a custom cleaning cloth featuring Haring's artwork. Keith Haring is an artist represented in Musée 4's

The Keith Haring Sunglasses have a cellulose acetate frame and Optical Class 1 nylon lenses with anti-reflective coating that provide 100% UVA/UVB protection. The riveted 5-barrel hinges have stainless steel temple cores for durability. """"",
            "price": 65.00,
        },
        {
            "name": "Yayoi Kusama Balloon Plush",
            "description": """Based on Yayoi Kusama’s polka-dot, soft balloon sculptures, this plush is a statement-making home accent that can live on your sofa, bed or floor. The Yayoi Kusama Balloon Plush is made from synthetic leather and measures 19.7l x 9.9”diam. Please note that the Plush is a decorative object and should not be used as a pillow or have pressure applied to it. Yayoi Kusama is an artist with work in MoMA’s collection.""",
            "price": 199.95,
        },
        {
            "name": "Romare Bearden: In the Garden (from the Portfolio: Prevalence of Ritual), 1974 Framed Print",
            "description":"""This print features a reproduction of In the Garden (1974) by Romare Bearden, an artist in MoMA's collection. It's mounted, laminated and floated in a 2"- deep black ash wood frame. Hanging kit included.  It measures 24.87h x 20.25w x 2"d.""",
            "price": 25.00,
        },
        {
            "name": "Cubist Sculpture",
            "description": "A small sculpture inspired by Cubism.",
            "price": 200.00,
        },
        {
            "name": "Pablo Picasso Linocuts Framed Poster",
            "description": """
This rare poster was produced in 1968 to promote an exhibition in Baltimore of Pablo Picasso’s linocut prints, produced between 1958 and 1963. Picasso’s work is represented in MoMA’s collection. This poster is in good vintage condition, mounted with a mat in a thin black aluminum frame. Wired for hanging. The poster is unmounted and archivally framed without glue or tape to avoid possible damage to the paper. Framing includes 99.9% UV acrylic glazing to protect from UV damage. Framed with acid-free foamcore backing to secure poster in frame. The framed poster measures 20 x 28.5”. Returns not accepted. Extremely limited quantities.""",
            "price": 1000.00,
        },
        {
            "name": "Andy Warhol: Everybody Should Print",
            "description": "This print features a famous quote by Andy Warhol, whose work is featured in Musée 4's collection",
            "price": 18.95,
        },
        {
            "name": "John Baldesarri-Margo Leavin Pop-Art Gray Framed Poster",
            "description": """Details
Shipping & Returns
This rare poster, featuring the work of John Baldesarri, was produced to promote an exhibiton of the artist's work in California in 1990. This poster is in good vintage condition and framed in a 1” deep black gesso frame. Wired for hanging. The poster is unmounted and archivally framed without glue or tape to avoid possible damage to the paper. Framing includes 99.9% UV acrylic glazing to protect from UV damage. Framed with acid-free foamcore backing to secure poster in frame. Returns not accepted. Extremely limited quantities.""",
            "price": 25.00,
        },
        {
            "name": "Gemini Espresso Maker",
            "description": """Keep flavor and temperature intact from stovetop to cup with the Gemini Express Espresso Set. Place the cups side by side after adding water and espresso grounds to the bottom chamber. Brew on your stovetop and the Gemini delivers two perfect cups simultaneously. Comes with two cups and saucers. Gemini Express can be used on electric stoves and on gas stoves; it is not good for induction. Made from aluminum, the Gemini Express Espresso maker measures 6.5h x 5w 3.5"d. The porcelain cups (set of two) measure 3.5h x 5w x 6.5"d each with 4.3"diam. saucers""",
            "price": 56.00,
        },
        {
            "name": "Eames Plywood Elephant",
            "description": """This playful pachyderm was designed by Charles and Ray Eames in 1945 and exhibited in prototype form at MoMA in 1946 as an offshoot to the couple’s experiments in molded plywood. The Eameses were fascinated with elephants and they can be found in Charles’ photo documentation of India and the circus world. Creating the elephant was technically challenging due to its tight compound curves. Only two were made in Charles and Ray’s lifetime and were never mass produced. Made in Switzerland from maple plywood, the Eames Elephant makes a striking statement in your living room or as an object of whimsy in a child’s bedroom. It measures 16.5h x 31w x 16.25"d. Both Vitra and Charles and Ray Eames have work in MoMA’s collection. This special edition is produced by Vitra in a numbered series of 1,000 (Red and Natural) in limited quantities""",
            "price": 56.00,
        },
        {
            "name": "Lamy Pico Ballpoint Pen",
            "description": """The LAMY pico reaches unimagined greatness under pressure: the innovative pocket pen transforms into a full-size biro with just one finger movement thanks to an ingenious double push mechanism inside. Strikingly different and surprising, it brings a piece of innovation to even the smallest pencil case or even trouser pocket as a handy everyday companion. And as a gift, too, it guarantees the wow effect - not least because of the extraordinary choice of colours. Sometimes it is the proverbial little things in life.
Pocket pen / shiny neon pink lacquer finish / with compact refill LAMY M 22 M black
Item number: 4032075
Size (W x H x L): 0.47 x 0.47 x 4.88 mm
Weight: 0 g""",
            "price": 20.00,
        },
        {
            "name": "Pantone Booklets: Set of Two",
            "description": """Colorful dotted notebooks to brighten up your day!
Dotted Pages
Dimensions: 170 x 120 x 5 mm (small) / 220 x 170 x 5 mm (large)
Copenhagen Design is a Danish company that designs, develops and produces high-end products under the license of PANTONE LLC, within home, office and lifestyle products. Copenhagen Design is the only licensee that produces with the original color chip code, that is an exact match to the PANTONE professional color system.""",
            "price": 20.00,
        },
        {
            "name": "Drehgriffel Nr. 1 Bauhaus Edition Lemon/Black",
            "description": """Drehgriffel Nr. 1 Bauhaus Edition ballpoint pen.

• Ballpoint pen made from precision-milled aluminium and brass
• Document proof
• Strength M
• With ink in Royal Blue
• Refillable (refill also available in black)
• Length 5.1 in.""",
            "price": 32.95,
        },
        {
            "name": "Andy Warhol Art Print",
            "description": "A print of Andy Warhol's famous Campbell's Soup Cans.",
            "price": 45.00,
        },
        {
            "name": "Zaha Hadid Chair 'UltraStellar",
            "description": "Zaha Hadid's Famous 2016 'UltraStellar' design",
            "price": 9000.00,
        },
        {
            "name": "Kensington Table",
            "description": "Kengsington table with structure in bronzo with spatula effect and top in black elm. Stanford Bridge chairs with armrests, non-removeable cover in fabric Kitami 04 sabbia, swivel base in glossy brown nickel.",
            "price": 3666.00,
        },
        {
            "name": "Marcel Duchamp Galerie Claude Givaudan Framed Poster",
            "description": """This rare poster features a reproduction of an artwork by Marcel Duchamp that was printed in 1967 for Expo 67 - Galerie Claude Givaudan. The poster is in good vintage condition and is framed in a black aluminum frame. Wired for hanging. The poster is archivally framed without glue or tape to avoid possible damage to the paper. The framed poster measures 27h x 19w”. Returns not accepted. Extremely limited quantities.""",
            "price": 6700.00,
        },
        {
            "name": "Flos Bellhop Lamp",
            "description": "This portable, wireless lamp can be carried from room to room like a high-tech candle, providing light where you need it. An Italian-made design by Edward Barber and Jay Osgerby, the Bellhop Lamp casts a pool of direct light, and has a mushroom shape that shields its carrier from interfering rays while walking through dark rooms. The Bellhop Lamp has a four-step dimmer, operated by a push-button switch at its base, and charges via micro USB-C to provide four hours of light. Designed by Edward Barber and Jay Osgerby for FLOS.",
            "price": 319.00,
        },
        {
            "name": "Contemporary Art Puzzle",
            "description": "A puzzle featuring a contemporary art design.",
            "price": 25.00,
        },
        {
            "name": "Colorie l'art",
            "description": "Des coloriages, certes, mais pas seulement : cette très belle nouvelle collection a pour objectif de mieux faire connaître les oeuvres de Picasso en reproduisant et en coloriant ses tableaux les plus connus. Par exemple, l'incontournable peinture Autoportrait de Pablo Picasso.",
            "price": 7.00,
        },
        {
            "name": """Art Print "La BD à tous les étages", Fanny Michaëlis """,
            "description": "Fine art, gallery quality giclée print on natural white, matte, archival paper using UV pigment 12 colors Epson archival inks for crisp contrasts and 100+ years longevity.",
            "price": 29.00,
        },
        {
            "name": """Framed Art Print "Une cité moderne : musée """,
            "description": "Robert Mallet-Stevens (1886-1945) Une cité moderne : musée 1917 Chinese ink and watercolour on paper 29,9 x 42,9 cm This work of art is from the Projet pour une cité moderne set, a compilation of boards representing public edifices and peculiar constructions.",
            "price": 119.00,
        },
        {
            "name": "Taschen Basic Art Series: Magritte",
            "description": "This book explores Magritte's vast palette of visual humor, paradox, and surprise that still leads us today to contemplate his paintings as well as our conception of the world and ourselves.",
            "price": 15.00,
        },
        {
            "name": "Louis Vuitton Yayoi Kusama",
            "description": """Louis Vuitton, purveyor of exquisite fashion, teams up with the venerable Yayoi Kusama to create an unparalleled collaboration. A testament to the brand's illustrious history of collaborating with renowned artists, this initiative is their most ambitious yet.

This volume celebrates the momentous partnership between Yayoi Kusama and Louis Vuitton, offering a glimpse at the seminal artistic ideas that informed the collaboration. Within these pages, the visionary artist's works are paired with the stunningly innovative fashion collection she created with the luxury brand.""",
            "price": 85.00,
        },
        {
            "name": """Art Print: "Rythme, Joie de vivre""",
            "description": "Robert Delaunay (1885 - 1941) Rythme, Joie de vivre 1930 Oil on canvas 200 x 228 cm About the work: In 1930, Robert Delaunay renews with abstraction and circular forms by creating a monumental decor for Doctor Viard's living room, in Paris. This painting, Rythme, Joie de vivre, is a representation of the union between colour and non-objective art.",
            "price": 95.00,
        },
        {
            "name": """Framed Art Print: "Nu debout, fougère noire" """,
            "description": "Henri Matisse (1869-1954) Nu debout, fougère noire 1948 China ink on paper 105 x 75 cm ",
            "price": 65.00,
        },
        {
            "name": "Bumble Gustav Ehrenreich Green",
            "description": "Strongly convinced by the power of smiling, Gustav Ehrenreich created the joyful Hoptimist movement in the late 1960s. The goal was to design a miniature that would remind us of the importance of staying positive and optimistic.",
            "price": 19.00,
        },
        {
            "name": "Kidrobot Warhol Banana Plush",
            "description": "Fusing iconic artistry with the creativity of Kidrobot, this limited edition plush is an exquisite representation of the groundbreaking 1967 album, The Velvet Underground & Nico, graced by the beloved cover art of Andy Warhol. Originally meant to serve as a sticker to cover a nude-colored banana, now a rare piece of memorabilia, Warhol's banana art has become one of the most recognizable iconic pieces in pop culture. From the exclusive 14 inch yellow plush, stylishly grace your abode with some collectible pop art from the genius of Andy Warhol.",
            "price": 20.00,
        },
        {
            "name": "Skeleton Micro Cubebot",
            "description": """Cubebot® is a wooden toy robot inspired by Japanese Shinto Kumi-ki puzzles. Made from wood and elastic, Cubebot can be positioned to hold dozens of poses. When it's time to rest, Cubebot folds back into a perfect cube. A classic toy for all ages that will endure generations of play. This cubebot is available in size small. 

Ages 3 and up. Wipe clean with a soft, damp cloth.""",
            "price": 12.00,
        },
        {
            "name": "Frank Lloyd Wright Midway Mural Puzzle",
            "description": """Boasting iconic artwork from Frank Lloyd Wright, The Frank Lloyd Wright Midway Mural 750 Piece Shaped Foil Puzzle from Galison is an exciting and daunting challenge that is elevated by its foil embellishments. With a matte-finish, sturdy box perfect for gifting, storage, and reuse, this puzzle is a luxurious experience.

• 750 Piece Puzzle: 25" x 20.4"
• Foil Details
• Includes Puzzle Insert
• Puzzle greyboard contains 90% recycled paper. Packaging contains 70% recycled paper and is made responsibly from FSC-certified material. Printed with nontoxic soy-based inks.""",
            "price": 30.00,
        },
        {
            "name": "Helvetica : Homage to a Typeface",
            "description": "Helvetica is a sans-serif font with a simple and clean design. It is commonly used in advertising, signage, and literature. The R's leg curves, while the i and j have square dots. The Q's tail is angled straight, and the O, Q, and C have oval counterforms. This all-purpose type design can clearly and efficiently convey any message. It is considered one of the most popular typefaces of all time. Helvetica: Homage to a Typeface showcases 400 examples of its use, selected from two contrasting worlds. It features stunning applications by renowned designers alongside an anonymous collection of both clever and questionable examples.",
            "price": 25.00,
        },
        {
            "name": "Agnès Varda: Director's Inspiration",
            "description": "A visual tribute to Agnès Varda’s three lives as a photographer, filmmaker and artist, with previously unseen archival materials, texts and personal reflections from Jane Birkin, Martin Scorsese, JR and more.",
            "price": 35.00,
        },
        {
            "name": "Inifnity Nets Inspired by Yayoi Kusama Art Print ",
            "description": "Terracotta Infinity Nets inspired Yayoi Kusama. Wall art is an affordable and easy way to refresh your space instantly! These are high-quality art prints made on museum-grade fine art paper with a premium matte finish that yields long-lasting brilliance to brighten up any room.",
            "price": 12.00,
        },
        {
            "name": "Bauhaus Geometric Circles Art Print",
            "description": "Abstract Bauhaus inspired geometric circles art. Wall art is an affordable and easy way to refresh your space instantly! These are high-quality art prints made on museum-grade fine art paper with a premium matte finish that yields long-lasting brilliance to brighten up any room.",
            "price": 14.00,
        },
        {
            "name": "LEUCHTTURM1917 Notebook",
            "description": "The A5 medium notebooks come with a durable hardcover.Thread-bound to open flat. Acid-free paper to help prevent bleed through.Founded in the year 1917, LEUCHTTURM1917's rich heritage acts as a testament to over a century of evolution and unwavering quality in the world of superior notebooks, journals, and writing instruments, marking a journey that has extended beyond 100 years. ",
            "price": 24.50,
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
