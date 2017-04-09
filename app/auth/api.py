from flask_restful import Api, Resource

from app import api


class Signup(Resource):

    def get(self):
        """
        Get a list of users
        First line is the summary
        All following lines until the hyphens is added to description
        ---
        tags:
          - auth
        parameters:
          - name: id
            in: path
            description: ID of team (type any number)
            required: true
            type: integer
            default: 1
        responses:
          200:
            description: Returns a list of users
            schema:
                type: string
                name: username
                value: 'flatcoke'
        """


api.add_resource(Signup, '/auth/{id}')
