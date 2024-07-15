

from app.models import db, MembershipType, Member, environment, SCHEMA
from sqlalchemy.sql import text

def seed_membership_types():
    types = [
        {
            "name": "Access",
            "description": "Unlimited free admission. Free film tickets. $5 guest tickets. Member Evenings and exhibition preview days. Exclusive digital offerings. 10%% discount at Musée 4 stores",
            "billing_cycle": "Annual",
            "price_per_cycle": "110",
            "cardholders": 1
            

    }, {
        "name": "Explore",
        "description": "All Acess benefits, plus. Free admission for one guest per cardholder. Curatorial conversations. Premium screenings and programs with filmmakers. Special family-oriented events",
        "billing_cycle": "Annual",
        "price_per_cycle": "200",
        "cardholders": 2

    },{
        "name": "Supporting",
        "description": "All Explore benefits, plus. Free admission for four guests per cardholder. Invites to exhibition openings. Guided collection tours. Cultural events in NYC & beyond",
        "billing_cycle": "Annual",
        "price_per_cycle": "600",
        "cardholders": 2

    }
    ]
