# Mapping the Mind of a Large Language Model

![](https://cdn.sanity.io/images/4zrzovbb/website/7dd6783d4407d0b155766918579d0d848f67726b-1200x630.png)

### Metadata

- Author: anthropic.com
- Full Title: Mapping the Mind of a Large Language Model
- Category: #articles

- Summary: Researchers have made progress in understanding how concepts are represented inside AI models. This discovery could help make AI models safer by uncovering how they work and behave. By identifying and manipulating features within the model, researchers aim to enhance safety measures and ensure honest and harmless behavior. 

- URL: https://www.anthropic.com/research/mapping-mind-language-model

### Highlights

- We were able to measure a kind of "distance" between features based on which neurons appeared in their activation patterns. This allowed us to look for features that are "close" to each other. Looking near a "Golden Gate Bridge" feature, we found features for Alcatraz Island, Ghirardelli Square, the Golden State Warriors, California Governor Gavin Newsom, the 1906 earthquake, and the San Francisco-set Alfred Hitchcock film *Vertigo*.
  This holds at a higher level of conceptual abstraction: looking near a feature related to the concept of "inner conflict", we find features related to relationship breakups, conflicting allegiances, logical inconsistencies, as well as the phrase "catch-22". This shows that the internal organization of concepts in the AI model corresponds, at least somewhat, to our human notions of similarity. This might be the origin of Claude's excellent ability to make analogies and metaphors. ([View Highlight](https://read.readwise.io/read/01hzcxpn3q340nsqyyj0132v5g))
    - **Tags:** #structural-knowledge, #structured-thought, #nature-of-thought, #ai, #knowledge-gain
    - **Note:** The concept of structured thought in AI models what does it tell us about the nature of thought. Knowledge is clumped builds on itself and lies in the connections.
- Importantly, we can also *manipulate* these features, artificially amplifying or suppressing them to see how Claude's responses change.
  For example, amplifying the "Golden Gate Bridge" feature gave Claude an identity crisis even Hitchcock couldn’t have imagined: when asked "what is your physical form?", Claude’s usual kind of answer – "I have no physical form, I am an AI model" – changed to something much odder: "I am the Golden Gate Bridge… my physical form is the iconic bridge itself…". Altering the feature had made Claude effectively obsessed with the bridge, bringing it up in answer to almost any query—even in situations where it wasn’t at all relevant.
  We also found a feature that activates when Claude reads a scam email (this presumably supports the model’s ability to recognize such emails and warn you not to respond to them). Normally, if one asks Claude to generate a scam email, it will refuse to do so. But when we ask the same question with the feature artificially activated sufficiently strongly, this overcomes Claude's harmlessness training and it responds by drafting a scam email. Users of our models don’t have the ability to strip safeguards and manipulate models in this way—but in our experiments, it was a clear demonstration of how features can be used to change how a model acts.
  The fact that manipulating these features causes corresponding changes to behavior validates that they aren't just correlated with the presence of concepts in input text, but also causally shape the model's behavior. In other words, the features are likely to be a faithful part of how the model internally represents the world, and how it uses these representations in its behavior. ([View Highlight](https://read.readwise.io/read/01hzcxze75gfvdsnrhhe7vy4fa))
    - **Note:** These models are more mirrors than transformation functions
