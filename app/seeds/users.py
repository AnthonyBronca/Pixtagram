from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        full_name='Pixta Demo', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        full_name='Marnie Friend', username='marnie', email='marnie@aa.io', password='password')
    beyonce = User(
        full_name='Beyonce', username='bey', email='bey@aa.io', password='queenB', bio='All the single ladies!', verified=True)
    maica = User(
        profile_pic_url='', full_name='Maica Santos', username='maicaS', email='maica@maica.io', bio="!false: it's funny because it's true.", verified=True, password='pixtagram')
    anthony = User(
        profile_pic_url='', full_name='Anthony Bronca', username='anthonybronca', email='abronca@admin.io', bio='Full Stack Software Engineer', verified=True, password='pixtagram')
    agustin = User(
        profile_pic_url='', full_name='Agustin Zucca', username='agustinZ', email='agustin@agus.io', bio='Software Engineer at JPMorgan Chase Texas', verified=True, password='pixtagramagus')
    briana = User(
        profile_pic_url='', full_name='Briana Robinson', username='brianaR', email='briana@bri.io', bio='ATLien that loves music and french fries', verified=True, password='pixtagrambri')
    leah = User(
        profile_pic_url='', full_name='Leah Stern', username='leahS', email='leah@leah.io', bio='Python enthusiast and best Python Instructor', verified=True, password='LeahIsTheBest')
    stee = User(
        profile_pic_url='', full_name='Stee', username='stee301', email='stee@stee.io', bio='DIT traveling everywhere, Where should I go next?', verified=False, password='stee301')
    chere = User(
        profile_pic_url='', full_name='Chere-Anne Luscina', username='coco_cherry', email='chere@chere.io', bio="making my way downtown walking fast faces past and I'm home bound", verified=False, password='CaptainAmerica')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(beyonce)
    db.session.add(maica)
    db.session.add(anthony)
    db.session.add(agustin)
    db.session.add(briana)
    db.session.add(leah)
    db.session.add(stee)
    db.session.add(chere)

    db.session.commit()


def undo_users():
    if(environment == "production"):
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()
