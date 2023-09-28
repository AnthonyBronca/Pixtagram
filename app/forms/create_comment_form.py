import imp
from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

# Trying input required might need to changeto DataRequired later -ms
def length_check(form, field):
    comment = field.data
    if len(comment) > 140:
        raise ValidationError(f'{field.label.text} must be less than 140 characters')

class CreateCommentForm(FlaskForm):
    text = TextAreaField("Comment", validators=[DataRequired(message='Cannot post empty comment.'), length_check])
