from app.models import db, Post

def seed_posts():
    post_1 = Post(
        user_id=1, img_url='https://pixtagrambucket.s3.amazonaws.com/Chris_chuckie.png', caption='Hello?!?!'
    )
    post_2 = Post(
        user_id=1, img_url='https://pixtagrambucket.s3.amazonaws.com/Meme-dev.png', caption='test'
    )
    post_3 = Post(
        user_id=2, img_url='https://pixtagrambucket.s3.amazonaws.com/meme_anotha.png', caption='test',
    )


    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)


    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
