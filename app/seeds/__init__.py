from flask.cli import AppGroup
from .users import seed_users, undo_users
from .Museum.artists import seed_artists, undo_artists
from .Museum.admission.admissionTickets import seed_admission_tickets, undo_admission_tickets
from .Store.storeItems import seed_store_items, undo_store_items
from .Store.reviews import seed_reviews, undo_reviews
from .Museum.galleries import seed_galleries, undo_galleries
from .Museum.event.events import seed_events, undo_events
from .Store.storeItemImages import seed_store_item_images, undo_store_item_images
from .Museum.event.eventImages import seed_event_images, undo_event_images
from .Store.storeOrders import seed_store_orders, undo_store_orders
from .Store.orderedItems import seed_ordered_items, undo_ordered_items
from .Museum.expositions import seed_expositions, undo_expositions
from .Museum.expositionImages import seed_exposition_images, undo_exposition_images
from .Museum.membershipTypes import seed_membership_types, undo_membership_types

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_membership_types()
        undo_exposition_images()
        undo_expositions()
        undo_ordered_items()
        undo_store_orders()
        undo_event_images()
        undo_store_item_images()
        undo_events()
        undo_galleries()
        undo_reviews()
        undo_store_items()
        undo_admission_tickets()
        undo_artists()
        undo_users()
    seed_users()
    seed_artists()
    seed_admission_tickets()
    seed_store_items()
    seed_reviews()
    seed_galleries()
    seed_events()
    seed_store_item_images()
    seed_event_images()
    seed_store_orders()
    seed_ordered_items()
    seed_expositions()
    seed_exposition_images()
    seed_membership_types()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_membership_types()
    undo_exposition_images()
    undo_expositions()
    undo_ordered_items()
    undo_store_orders()
    undo_event_images()
    undo_store_item_images()
    undo_events()
    undo_galleries()
    undo_reviews()
    undo_store_items()
    undo_admission_tickets()
    undo_artists()
    undo_users()
    # Add other undo functions here
