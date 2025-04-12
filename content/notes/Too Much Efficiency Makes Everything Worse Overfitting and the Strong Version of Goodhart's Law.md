# Too Much Efficiency Makes Everything Worse: Overfitting and the Strong Version of Goodhart's Law

![](https://news.ycombinator.com/favicon.ico)

### Metadata

- Author: Jascha Sohl-Dickstein
- Full Title: Too Much Efficiency Makes Everything Worse: Overfitting and the Strong Version of Goodhart's Law
- Category: #articles

- Summary: Increased efficiency can lead to worse outcomes, a phenomenon seen in machine learning called overfitting. This occurs when optimizing a proxy measure makes it a poor reflection of the actual goal. To mitigate these issues, we can adjust our approaches, like adding regularization or ensuring our models are appropriately complex. 

- URL: https://sohl-dickstein.github.io/2022/11/06/strong-Goodhart.html

### Highlights

- The strong version of Goodhart's law: as we become too efficient, the thing we care about grows worse
  If we keep on optimizing the proxy objective, even after our goal stops improving, something more worrying happens. The goal often starts getting *worse*, even as our proxy objective continues to improve. Not just a little bit worse either — often the goal will diverge towards infinity.
  This is an [extremely](https://www.cs.princeton.edu/courses/archive/spring16/cos495/slides/ML_basics_lecture6_overfitting.pdf) [general](https://www.cs.mcgill.ca/~dprecup/courses/ML/Lectures/ml-lecture02.pdf) [phenomenon](https://scholar.google.com/scholar?hl=en&q=overfitting) in machine learning. It mostly doesn't matter what our goal and proxy are, or what model architecture we use[3](https://sohl-dickstein.github.io/2022/11/06/strong-Goodhart.html?s=09#endnote-overfittinggenerality). If we are very efficient at optimizing a proxy, then we make the thing it is a proxy for grow worse. ([View Highlight](https://read.readwise.io/read/01j9had4rytqbyt0ng0gn0e8q9))
    - **Tags:** #goodhart's-law, #overoptimizing
    - **Note:** We can overoptimize to out detrement
- Increasing efficiency is permeating almost every aspect of our society. If the thing that is being made more efficient is beneficial, then the increased efficiency makes the world a better place (overall, the world [seems to be becoming a better place](https://ourworldindata.org/a-history-of-global-living-conditions-in-5-charts)). If the thing that is being made more efficient is socially harmful, then the consequences of greater efficiency are scary or depressing (think mass surveillance, or robotic weapons). What about the most common case though — where the thing we are making more efficient is related, but not identical, to beneficial outcomes? What happens when we get better at something which is merely correlated with outcomes we care about?
  In that case, we can overfit, the same as we do in machine learning. The outcomes we care about will improve for a while ... and then they will grow dramatically worse.
  Below are a few, possibly facile, examples applying this analogy.
  > **Goal:** Educate children well 
  > **Proxy:** [Measure student and school performance](https://en.wikipedia.org/wiki/No_Child_Left_Behind_Act) on standardized tests 
  > **Strong version of Goodhart's law leads to:** Schools narrowly focus on teaching students to answer questions like those on the test, at the expense of the underlying skills the test is intended to measure
  > **Goal:** Rapid progress in science 
  > **Proxy:** Pay researchers a [cash bonus for every publication](https://www.science.org/content/article/cash-bonuses-peer-reviewed-papers-go-global) 
  > **Strong version of Goodhart's law leads to:** Publication of incorrect or incremental results, collusion between reviewers and authors, research paper mills
  > **Goal:** A well-lived life 
  > **Proxy:** Maximize the reward pathway in the brain 
  > **Strong version of Goodhart's law leads to:** Substance addiction, gambling addiction, days lost to doomscrolling Twitter ([View Highlight](https://read.readwise.io/read/01j9habp06931e956ax2ryk6mg))
    - **Note:** We need proper incentive alignment to be happy we cannot just be satisfied with rule beating system and overoptimize
- **Figure 1:** **Models often suffer from the strong version of Goodhart's law, and overfit catastrophically, when their complexity is well matched to the complexity of the proxy task.** If a model is instead much more or much less capable than required, it will overfit less. Here, models are trained to map from a one-dimensional input to a one-dimensional output . All models are trained on the same 10 datapoints, in red. The model with 4 parameters is too weak to exactly fit the datapoints, but it smoothly approximates them. The model with 10,000 parameters is strong enough to easily fit all the datapoints, and also smoothly interpolate between them. The model with 10 parameters is exactly strong enough to fit the datapoints, but it can only contort itself to do so by behaving in extreme ways away from the training data. If asked to predict for a new value of , the 10 parameter model would perform extremely poorly. For details of this toy experiment, which uses linear random feature models, see this [colab notebook](https://colab.research.google.com/drive/1mAqCsCE-6biiFxQu8swlc5MygmI9lMJA?usp=sharing). ([View Highlight](https://read.readwise.io/read/01j9ha94e376849nb7zkbe48jm))
    - **Note:** This is an ironic example where when you have 4 parameters the model is bad and when you have 10000 paramters the model it bad you need to view things at the right level of emergence and not overfit
