from flask.cli import AppGroup

from .follows import seed_follows, undo_follows
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments,undo_comments
# from .likes import seed_likes, undo_likes
from .post_user_seeder import seeder, undo_seeder
from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # undo_users()
        # undo_posts()
        undo_seeder()
        undo_follows()
        undo_comments()
        # undo_likes()
    # seed_users()
    seeder()
    # seed_posts()
    seed_follows()
    seed_comments()
    # Add other seed functions here
    # seed_posts()
    # seed_likes()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_users()
    # undo_posts()
    undo_seeder()
    # Add other undo functions here
    undo_follows()
    undo_comments()
    # undo_likes()
