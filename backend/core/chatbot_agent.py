# backend/core/chatbot_agent.py

import os
from typing import TypedDict, Annotated, List, Union
import operator

# LangChain and LangGraph imports
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, ToolMessage
from langchain_core.tools import tool
from langchain_community.chat_models import ChatOpenRouter
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolExecutor, ToolInvocation

# Import your Django tool functions
# Ensure that backend/store/chatbot_tools.py exists and contains these functions
from store.chatbot_tools import get_product_info, get_chat_history


# --- 1. OpenRouter LLM Setup ---
# It's highly recommended to load this from environment variables or a secure configuration
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
# Replace with your actual site URL and name for OpenRouter analytics
YOUR_SITE_URL = os.environ.get("OPENROUTER_SITE_URL", "http://localhost:8000")
YOUR_SITE_NAME = os.environ.get("OPENROUTER_SITE_NAME", "GU Course Website Chatbot")

llm = ChatOpenRouter(
    openai_api_key=OPENROUTER_API_KEY,
    openai_api_base="https://openrouter.ai/api/v1",
    model_name="deepseek/deepseek-chat:free", # You can choose other models as well
    headers={
        "HTTP-Referer": YOUR_SITE_URL,
        "X-Title": YOUR_SITE_NAME,
    },
    # Optional: Configure timeout for the API call
    request_timeout=60.0
)

# --- 2. Define Tools for the AI ---
# These functions allow your AI to interact with your Django backend
@tool
def product_info_tool(query: str) -> str:
    """
    Use this tool to get detailed information about courses or products.
    Input should be a concise search query (e.g., 'Django course', 'Python advanced').
    This tool queries the database for product details.
    """
    return get_product_info(query)

tools = [product_info_tool]
tool_executor = ToolExecutor(tools)


# --- 3. Define LangGraph Agent State ---
# This defines the structure of data passed between nodes in your graph
class AgentState(TypedDict):
    """
    Represents the state of the agent in the conversation.
    """
    messages: Annotated[List[BaseMessage], operator.add] # Accumulates conversation history


# --- 4. Define the Graph Nodes ---

def call_llm(state: AgentState):
    """
    Node to invoke the Large Language Model (LLM) with the current messages.
    """
    messages = state['messages']
    # Use bind_tools to allow the LLM to call the defined tools
    response = llm.bind_tools(tools).invoke(messages)
    return {"messages": [response]}

def call_tool(state: AgentState):
    """
    Node to execute the tool chosen by the LLM.
    """
    messages = state['messages']
    last_message = messages[-1]

    # Ensure the last message is an AIMessage containing tool_calls
    if not isinstance(last_message, AIMessage) or not last_message.tool_calls:
        # This case indicates an unexpected state, you might want more robust error handling
        return {"messages": [AIMessage("Error: AI did not provide a valid tool call.")]}

    tool_outputs = []
    for tool_call in last_message.tool_calls:
        # Construct ToolInvocation from the LLM's tool_call
        action = ToolInvocation(tool=tool_call.name, tool_input=tool_call.args)
        # Execute the tool
        output = tool_executor.invoke(action)
        # Append the tool's output as a ToolMessage to the history
        tool_outputs.append(ToolMessage(content=str(output), tool_call_id=tool_call.id))

    return {"messages": tool_outputs}


# --- 5. Define the Conditional Edge Logic ---

def should_continue(state: AgentState) -> str:
    """
    Determines whether the graph should continue by calling a tool or end
    the turn by returning the LLM's final answer.
    """
    messages = state['messages']
    last_message = messages[-1]

    # If the LLM has called a tool, we need to run the tool node
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        return "continue"
    # Otherwise, the LLM has provided a final answer, so we end the graph
    return "end"


# --- 6. Build the LangGraph Workflow ---

workflow = StateGraph(AgentState)

# Add nodes to the graph
workflow.add_node("llm", call_llm)   # Node for LLM interaction
workflow.add_node("tool", call_tool) # Node for tool execution

# Define the entry point of the graph
workflow.set_entry_point("llm")

# Define conditional edges from the LLM node
workflow.add_conditional_edges(
    "llm",
    should_continue, # This function decides the next step
    {
        "continue": "tool", # If tool call, go to 'tool' node
        "end": END          # If final answer, end the graph
    }
)

# After a tool call, always go back to the LLM to process the tool's output
workflow.add_edge('tool', 'llm')

# Compile the graph into an executable application
app = workflow.compile()


# --- 7. The main function to invoke the chatbot ---
async def invoke_chatbot_agent(user_message_content: str, user_id: int) -> str:
    """
    Invokes the LangGraph chatbot agent with a new user message.
    Loads previous chat history and returns the AI's response.
    """
    # Load previous chat history from your Django Message model
    chat_history_from_db = get_chat_history(user_id) # Uses your function from store.chatbot_tools.py

    # Convert database history into LangChain BaseMessage format
    converted_history = []
    for msg in chat_history_from_db:
        if msg["role"] == "user":
            converted_history.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            # For AI responses stored in your DB, you might need to infer if it was a tool call
            # For simplicity, assuming all is_admin_response are direct AI text messages for now.
            converted_history.append(AIMessage(content=msg["content"]))

    # Combine historical messages with the new user message
    input_messages = converted_history + [HumanMessage(content=user_message_content)]

    # Invoke the compiled LangGraph application
    # The 'stream' method is good for async operations
    final_state = await app.ainvoke({"messages": input_messages})

    # Extract the AI's final response from the state
    ai_response = final_state['messages'][-1].content
    return ai_response