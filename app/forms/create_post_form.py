from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


class CreatePostForm(FlaskForm):
    img_url = StringField("img_url", validators=[DataRequired(message='Cannot share post without image')])
    caption = TextAreaField("caption")

class EditPostForm(FlaskForm):
    caption = StringField("caption")
