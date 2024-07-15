from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review, User


def minLengthReview(form, field):
    if len(field.data) < 10:
                raise ValidationError('Review must be at least 10 characters long')

def minStars(form, field):
       if( not field.stars or field.stars == None):
                      raise ValidationError('Star rating of at least 1 is required')
              


class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    stars = RadioField('stars', choices=[1,2,3,4,5], validators=[DataRequired()])
    submit = SubmitField("Post Review")
