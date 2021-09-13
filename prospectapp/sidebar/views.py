from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
import requests
import json

### api/v1/sidebar?org=5336&user=244&token=FGEZJJ-ZFDGB-FDGG

@api_view(['GET'])
def sidebar(request):
    if request.method == 'GET':
        if request.GET.get('token') and request.GET.get('user') and request.GET.get('org')  :

            token = request.GET.get('token')
            user_id = request.GET.get('user')
            org = request.GET.get('user')

            

            headers = {
                'Authorization': f'Bearer {token}',
            }

            response = requests.get(f'https://api.zuri.chat/users/{user_id}', headers=headers)

            res = json.loads(response.text)
            if res['status'] == 200:
                data = {
                    "name": settings.PLUGIN_NAME,
                    "plugin_id": settings.PLUGIN_ID,
                    "description": settings.DESCRIPTION,
                    "organisation_id": org,
                    "group_name": "Company Sales Prospects",
                    "user_id": f"{user_id}",
                    "show_group": False,
                    "joined_rooms": [],
                    "public_rooms": [
                        {
                            "title": "prospects",
                            "id": "DFGfH-EDDDDS-DFDDF",
                            "unread": 0,
                            "members": 32,
                            "icon" : "https://i.pinimg.com/564x/98/8e/ba/988eba187975cb426cd5226c1bd54e65.jpg",
                            "action" : "open",
                            "auto-join" : True
                        },

                        {
                            "title": "deals",
                            "id": "DFGfH-EDDDDS-DFDDF",
                            "unread": 0,
                            "members": 32,
                            "icon" : "https://i.pinimg.com/564x/98/8e/ba/988eba187975cb426cd5226c1bd54e65.jpg",
                            "action" : "open",
                            "auto-join" : True
                        },
                    ]
                }
                return Response(data, status=status.HTTP_200_OK)
            else:
                data = {
                    "error": res['status'],
                    "message": res['message']
                }
                print(res)
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {
                "error": "400",
                "message": "check your query paramters"
            }
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        