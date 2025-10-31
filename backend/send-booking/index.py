import json
import os
import http.client
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr

class BookingRequest(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=5)
    message: str = Field(default="")

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send booking request from hiking website to owner's email
    Args: event - dict with httpMethod, body; context - object with request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    api_key = os.environ.get('RESEND_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email service not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    booking = BookingRequest(**body_data)
    
    email_html = f"""
    <h2>Новая заявка на поход</h2>
    <p><strong>Имя:</strong> {booking.name}</p>
    <p><strong>Телефон:</strong> {booking.phone}</p>
    <p><strong>Сообщение:</strong> {booking.message if booking.message else 'Не указано'}</p>
    """
    
    payload = json.dumps({
        "from": "Походы Красноярск <onboarding@resend.dev>",
        "to": ["elenashander88@gmail.com"],
        "subject": f"Новая заявка от {booking.name}",
        "html": email_html
    })
    
    conn = http.client.HTTPSConnection("api.resend.com")
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    conn.request("POST", "/emails", payload, headers)
    res = conn.getresponse()
    data = res.read()
    
    if res.status == 200:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
        }
    else:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Failed to send email', 'details': data.decode('utf-8')})
        }
