from app.models import db, likes, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_likes():
    likes1 = likes(user_id=2, post_id=1)
    likes2 = likes(user_id=3, post_id=2)
    likes3 = likes(user_id=2, post_id=1)
    likes4 = likes(user_id=1, post_id=2)



    db.session.add(likes1)
    db.session.add(likes2)
    db.session.add(likes3)
    db.session.add(likes4)
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
    # db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    # db.session.commit()
