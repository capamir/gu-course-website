from store.models import Product
from users.models import Message, User
from django.db.models import Q

def get_product_info(query: str):
    """
    Retrieves information about products based on a query.
    This function acts as a tool for the AI.
    """
    products = Product.objects.filter(
        Q(title__icontains=query) |
        Q(description__icontains=query) |
        Q(bio__icontains=query)
    ).distinct()

    if not products.exists():
        return "No product found matching the query."

    response = "Here's what I found about the products:\n"
    for product in products:
        response += f"- **{product.title}** (Price: {product.price} | Available: {product.available})\n"
        if product.bio:
            response += f"  Bio: {product.bio}\n"
        if product.description:
            response += f"  Description: {product.description}\n"
        response += "\n"
    return response

def get_chat_history(user_id: int):
    """
    Retrieves chat history for a given user from the Message model.
    """
    user = User.objects.get(id=user_id)
    messages = Message.objects.filter(user=user).order_by('created_at')

    history = []
    for msg in messages:
        if msg.is_admin_response: # Assuming admin response is AI's response in new setup
            history.append({"role": "assistant", "content": msg.content})
        else:
            history.append({"role": "user", "content": msg.content})
    return history