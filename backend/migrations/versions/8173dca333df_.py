"""empty message

Revision ID: 8173dca333df
Revises: 0e6ae3b3ec68
Create Date: 2022-01-31 19:29:32.591211

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8173dca333df'
down_revision = '0e6ae3b3ec68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('challenges', sa.Column('description', sa.String(length=300), nullable=True))
    op.add_column('challenges', sa.Column('resource_link', sa.String(length=500), nullable=False))
    op.drop_column('challenges', 'resource')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('challenges', sa.Column('resource', sa.VARCHAR(length=500), autoincrement=False, nullable=False))
    op.drop_column('challenges', 'resource_link')
    op.drop_column('challenges', 'description')
    # ### end Alembic commands ###
