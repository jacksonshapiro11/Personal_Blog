# Prompt Engineering for Generative AI

![](https://readwise-assets.s3.amazonaws.com/media/reader/parsed_document_assets/192636948/jZ15Z7resmuJnUB4qnK9ERDEju09vLlxuLxZiYyFB68-cove_SQiT5vC.png)

### Metadata

- Author: James Phoenix and Mike Taylor
- Full Title: Prompt Engineering for Generative AI
- Category: #articles

- Summary: Large language models (LLMs) and diffusion models such as ChatGPT and Stable Diffusion have unprecedented potential. Because they have been trained on all the public text and images on the internet, they can make useful contributions to a wide variety of tasks. And with the barrier to entry greatly reduced today, practically any developer can harness LLMs and diffusion models to tackle problems previously unsuitable for automation.  With this book, you'll gain a solid foundation in generative AI, including how to apply these models in practice. When first integrating LLMs and diffusion models into their workflows, most developers struggle to coax reliable enough results from them to use in automated systems. Authors James Phoenix and Mike Taylor show you how a set of principles called prompt engineering can enable you to work effectively with AI. 

- URL: https://readwise.io/reader/fd/192636948

### Highlights

- However, if you planned to put this prompt into production, you’d benefit from investing more work into getting it right. Mistakes cost you money in terms of the fees OpenAI charges based on the length of the prompt and response, as well as the time spent fixing mistakes. If you were building a product name generator with thousands of users, there are some obvious issues you’d want attempt to fix: Vague direction You’re not briefing the AI on what style of name you want, or what attributes it should have. Do you want a single word or a concatenation? Can the words be made up, or is it important that they’re in real English? Do you want the AI to emulate somebody you admire who is famous for great product names?
  Unformatted output You’re getting back a list of separated names line by line, of unspecified length.
  When you run this prompt multiple times, you’ll see sometimes it comes back with a numbered list, and often it has text at the beginning, which makes it hard to parse programmatically.
  Missing examples You haven’t given the AI any examples of what good names look like. It’s auto‐ completing using an average of its training data, i.e., the entire internet (with all its inherent bias), but is that what you want? Ideally you’d feed it examples of successful names, common names in an industry, or even just other names you like.
  Limited evaluation You have no consistent or scalable way to define which names are good or bad, so you have to manually review each response. If you can institute a rating system or other form of measurement, you can optimize the prompt to get better results and identify how many times it fails.
  No task division You’re asking a lot of a single prompt here: there are lots of factors that go into product naming, and this important task is being naively outsourced to the AI all in one go, with no task specialization or visibility into how it’s handling this task for you. ([View Highlight](https://read.readwise.io/read/01jan9jgyw8nwwjprxjxw761t3))
    - **Note:** Issues with bad prompts and what makes a good one
- Give Direction Describe the desired style in detail, or reference a relevant persona Specify Format Define what rules to follow, and the required structure of the response Provide Examples Insert a diverse set of test cases where the task was done correctly Evaluate Quality Identify errors and rate responses, testing what drives performance.
  Divide Labor Split tasks into multiple steps, chained together for complex goals ([View Highlight](https://read.readwise.io/read/01jan9dbjxq6c6jp4vkkpsrtjt))
    - **Note:** Prompting. If you can divide labor effectively and break it down like you're programming that makes it much easier for the system
