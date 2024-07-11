from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review, User, AdmissionTicket


              


class TicketForm(FlaskForm):
    selected_date = SubmitField("Select Date")
   