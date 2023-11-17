import datetime
from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    user = db.relationship('User', back_populates = 'posts')
    comments = db.relationship('Comment', back_populates = 'posts', cascade='all, delete')
    post_likes = db.relationship('User', secondary=likes, back_populates='user_likes')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'img_url': self.img_url,
            'post_likes': {user.id: user.to_dict() for user in self.post_likes},
            'caption': self.caption,
            'created_at': self.created_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }
