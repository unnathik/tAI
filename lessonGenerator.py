import os

from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq
from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/api/lesson', methods=['GET'])
def generate_lesson():
    student_input = request.json
    return ta_interaction(student_input)


@app.route('/api/audio', methods=['GET'])
def test():
    student_input = request.json
    return ta_interaction(student_input)



def ta_interaction(student_req):

    model = 'llama3-8b-8192'
    
    groq_chat = ChatGroq(
            groq_api_key=os.getenv("GROQ_KEY"), 
            model_name=model
    )
    
    system_prompt = 'You are a teaching assistant at a university for a college class given by the student. You have to provide detailed and personalized feedback to help the student learn the content and really understand it. Take the question from the user and help them understand the concept.'
    conversational_memory_length = 5 

    memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)


    #chat_history = []
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(
                content=system_prompt
            ),  

            MessagesPlaceholder(
                variable_name="chat_history"
            ),  

            HumanMessagePromptTemplate.from_template(
                "{human_input}"
            ),  
        ]
    )

    conversation = LLMChain(
        llm=groq_chat,  
        prompt=prompt,  
        verbose=False,   
        memory=memory, 
    )

    response = conversation.predict(human_input=student_req["question"])
    return response

# if __name__ == "__main__":
#     ta_interaction()


if __name__ == '__main__':
    app.run(debug=True)