# Technology Radar: An Opinionated Guide to Today’s Technology Landscape

![](https://readwise-assets.s3.amazonaws.com/media/uploaded_book_covers/profile_941292/q7wU7e2qCtRzRF6D_906K1okkJQXwT9DY510Yx9hPOE-cove_THCn1kq.png)

### Metadata

- Author: Thoughtworks
- Full Title: Technology Radar: An Opinionated Guide to Today’s Technology Landscape
- Category: #articles

- Summary: The text discusses various AI tools and emerging architecture patterns for software development, emphasizing the importance of team vigilance and collaboration in leveraging these technologies effectively. It also highlights the benefits of tools like GitHub Copilot and Winglang in streamlining development workflows and enhancing infrastructure management through innovative approaches. The text showcases how tools like LitcLLM aim to standardize interactions with large language models, providing a seamless integration framework for developers working with different AI models. 

- URL: https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/technology-radar-an-opinionate/tr_technology_radar_vol_30_en.pdf

### Highlights

- 12. LLM-powered autonomous agents Assess LLM-powered autonomous agents are evolving beyond single agents and static multi-agent systems with the emergence of frameworks like Autogen and CrewAI. These frameworks allow users to define agents with specific roles, assign tasks and enable agents to collaborate on completing those tasks through delegation or conversation. Similar to single-agent systems that emerged earlier, such as AutoGPT, individual agents can break down tasks, utilize preconfigured tools and request human input. Although still in the early stages of development, this area is developing rapidly and holds exciting potential for exploration. ([View Highlight](https://read.readwise.io/read/01hvfe7sr5nv8de0yqc0r72rxf))
    - **Tags:** #ai-agents, #ai
    - **Note:** Autonomous AI agents. Able to do complex multi step tasks.
- 15. Broad integration tests Hold While we applaud a focus on automated testing, we continue to see numerous organizations over- invested in what we believe to be ineffective broad integration tests. As the term “integration test” is ambiguous, we’ve taken the broad classification from Martin Fowler’s bliki entry on the subject which indicates a test that requires live versions of all run-time dependencies. Such a test is obviously expensive, because it requires a full-featured test environment with all the necessary infrastructure, data and services. Managing the right versions of all those dependencies requires significant coordination overhead, which tends to slow down release cycles. Finally, the tests themselves are often fragile and unhelpful. For example, it takes effort to determine if a test failed because of the new code, mismatched version dependencies or the environment, and the error message rarely helps pinpoint the source of the error. Those criticisms don’t mean that we take issue with automated “black box” integration testing in general, but we find a more helpful approach is one that balances the need for confidence with release frequency. This can be done in two stages by first validating the behavior of the system under test assuming a certain set of responses from run-time dependencies, and then validating those assumptions. The first stage uses service virtualization to create test doubles of run-time dependencies and validates the behavior of the system under test. This simplifies test data management concerns and allows for deterministic tests. The second stage uses contract tests to validate those environmental assumptions with real dependencies. ([View Highlight](https://read.readwise.io/read/01hvfeajyd2hdqmdq9n5ybyg3q))
