
from openai import OpenAI 
import os

## Set the API key and model name
MODEL="gpt-4o"
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "sk-proj-CxzocoZmYugwgyl9ED1YT3BlbkFJqWIr26zypbi0eGbGgItf"))

# visual_description = client.chat.completions.create(
#   model=MODEL,
#   messages=[
#     {"role": "system", "content": "You are a helpful manim assistant. The user is going to want to learn a certain concept, and you need to determine the best visualizations to create in manim to help the user understand that concept. I want you to just describe the visualizations in detail so that description could then be used to generate manim code."},
#     {"role": "user", "content": "I want to learn about vector spaces."}  
#   ]
# )

# description = visual_description.choices[0].message.content
# print(description)

completion = client.chat.completions.create(
  model=MODEL,
  messages=[
    {"role": "system", "content": "You are a helpful manim assistant. The user is going to want to learn a certain concept, and you need to determine the best visualizations to create in manim to help the user understand that concept. I want you to just give the code for the generating the diagram or visualization using manim. DON'T HAVE ANY OTHER CONTENT THAN THE CODE. DON'T WRITE python at the start of the output."},
    {"role": "user", "content": "I want to learn about vector spaces."}  
  ]
)


manim_code = completion.choices[0].message.content
print(manim_code)
exec(manim_code)