
from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod


# class Likes(db.Model):
#     __tablename__ = 'likes'


#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)

likes = db.Table(
    'likes',
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        'post_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('posts.id')),
        primary_key=True
    )
)

if environment == "production":
    likes.schema = SCHEMA
