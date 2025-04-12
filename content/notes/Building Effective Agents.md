# Building Effective Agents

![](https://cdn.sanity.io/images/4zrzovbb/website/b05cf65de663b0b93909dee5071c73b273a3cef3-2560x1344.png)

### Metadata

- Author: anthropic.com
- Full Title: Building Effective Agents
- Category: #articles

- Summary: Anthropic has learned from working with various teams to build effective language model (LLM) agents across different industries. They differentiate between workflows, which follow predefined paths, and agents, which operate autonomously and flexibly. Their principles emphasize starting simple, ensuring transparency, and carefully designing the agent's interface for better reliability and user trust. 

- URL: https://www.anthropic.com/research/building-effective-agents

### Highlights

- At Anthropic, we categorize all these variations as **agentic systems**, but draw an important architectural distinction between **workflows** and **agents**:
  • **Workflows** are systems where LLMs and tools are orchestrated through predefined code paths.
  • **Agents**, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.
  Below, we will explore both types of agentic systems in detail. In Appendix 1 (“Agents in Practice”), we describe two domains where customers have found particular value in using these kinds of systems. ([View Highlight](https://read.readwise.io/read/01jgs745qdj9ch4p26k040ymt8))
    - **Tags:** #agency-(figure-things-out), #ai-agents, #ai, #agency, #problem-solving
    - **Note:** Agent are systems not workflows that use their code to think through a problem not just follow steps. One defines a process one directs a process towards a goal through its tools. Agents goal set and think for themselves not told what to do.
- Building block: The augmented LLM
  The basic building block of agentic systems is an LLM enhanced with augmentations such as retrieval, tools, and memory. Our current models can actively use these capabilities—generating their own search queries, selecting appropriate tools, and determining what information to retain.
  ![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fd3083d3f40bb2b6f477901cc9a240738d3dd1371-2401x1000.png&w=3840&q=75)
  The augmented LLM
  We recommend focusing on two key aspects of the implementation: tailoring these capabilities to your specific use case and ensuring they provide an easy, well-documented interface for your LLM. While there are many ways to implement these augmentations, one approach is through our recently released [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), which allows developers to integrate with a growing ecosystem of third-party tools with a simple [client implementation](https://modelcontextprotocol.io/tutorials/building-a-client#building-mcp-clients).
  For the remainder of this post, we'll assume each LLM call has access to these augmented capabilities. ([View Highlight](https://read.readwise.io/read/01jgs7byrkh230c9cynat3hq6f))
    - **Note:** Augmenting the LLM to give it tools to use to act more agentically
- Agents
  Agents are emerging in production as LLMs mature in key capabilities—understanding complex inputs, engaging in reasoning and planning, using tools reliably, and recovering from errors. Agents begin their work with either a command from, or interactive discussion with, the human user. Once the task is clear, agents plan and operate independently, potentially returning to the human for further information or judgement. During execution, it's crucial for the agents to gain “ground truth” from the environment at each step (such as tool call results or code execution) to assess its progress. Agents can then pause for human feedback at checkpoints or when encountering blockers. The task often terminates upon completion, but it’s also common to include stopping conditions (such as a maximum number of iterations) to maintain control.
  Agents can handle sophisticated tasks, but their implementation is often straightforward. They are typically just LLMs using tools based on environmental feedback in a loop. It is therefore crucial to design toolsets and their documentation clearly and thoughtfully. We expand on best practices for tool development in Appendix 2 ("Prompt Engineering your Tools"). ([View Highlight](https://read.readwise.io/read/01jgs7z31e7v92vs2xwyt1z06e))
    - **Note:** agent definition
- **When to use agents:** Agents can be used for open-ended problems where it’s difficult or impossible to predict the required number of steps, and where you can’t hardcode a fixed path. The LLM will potentially operate for many turns, and you must have some level of trust in its decision-making. Agents' autonomy makes them ideal for scaling tasks in trusted environments.
  The autonomous nature of agents means higher costs, and the potential for compounding errors. We recommend extensive testing in sandboxed environments, along with the appropriate guardrails. ([View Highlight](https://read.readwise.io/read/01jgs7zdbgzqb8g0agatydr58b))
    - **Note:** when to use agents more emergent ideas
- One rule of thumb is to think about how much effort goes into human-computer interfaces (HCI), and plan to invest just as much effort in creating good *agent*-computer interfaces (ACI). Here are some thoughts on how to do so:
  • Put yourself in the model's shoes. Is it obvious how to use this tool, based on the description and parameters, or would you need to think carefully about it? If so, then it’s probably also true for the model. A good tool definition often includes example usage, edge cases, input format requirements, and clear boundaries from other tools. ([View Highlight](https://read.readwise.io/read/01jgs7y0qqg2w6ysa8qb7we1r1))
    - **Tags:** #ai-agents
    - **Note:** make the code easy for the agent to use
