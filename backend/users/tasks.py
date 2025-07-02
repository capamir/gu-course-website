from core.celery import app as celery_app
from users.models import Message, User
from asgiref.sync import async_to_sync

# Import the function that invokes your LangGraph chatbot agent.
# This assumes you placed the `invoke_chatbot_agent` function
# as discussed previously, for example, in `backend/core/chatbot_agent.py`.
# Adjust the import path if you placed it elsewhere.
from core.chatbot_agent import invoke_chatbot_agent


@celery_app.task
def generate_ai_response(user_message_id):
    """
    Celery task to generate an AI response for a user message
    and save it to the database.
    """
    try:
        # Retrieve the original user message
        user_message = Message.objects.get(id=user_message_id)
        user = user_message.user
        user_input_content = user_message.content

        # Call your asynchronous chatbot agent synchronously within this task.
        # This will handle fetching product info, managing chat history,
        # and interacting with the OpenRouter API.
        ai_response_content = async_to_sync(invoke_chatbot_agent)(user_input_content, user.id)

        # Save the AI's response as a new message.
        # It's linked to the same user but marked as an admin/AI response
        # and set as a reply to the original user message.
        Message.objects.create(
            user=user,
            content=ai_response_content,
            is_admin_response=True,  # Mark this message as an AI-generated response
            parent=user_message      # Link it as a reply to the user's message
        )
        print(f"AI response successfully generated and saved for message ID {user_message_id}.")

    except Message.DoesNotExist:
        print(f"Error: User message with ID {user_message_id} not found.")
    except Exception as e:
        # In a production environment, you would want to use a proper logging system here
        print(f"An unexpected error occurred while generating AI response for message {user_message_id}: {e}")