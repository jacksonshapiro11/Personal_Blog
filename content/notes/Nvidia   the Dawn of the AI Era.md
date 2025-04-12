# Nvidia —  the Dawn of the AI Era

![](https://wsrv.nl/?url=https%3A%2F%2Fimages.transistor.fm%2Ffile%2Ftransistor%2Fimages%2Fshow%2F39109%2Ffull_1677599150-artwork.jpg&w=100&h=100)

### Metadata

- Author: Acquired
- Full Title: Nvidia —  the Dawn of the AI Era
- Category: #podcasts



- URL: https://share.snipd.com/episode/3e46000d-e7f0-43b4-b6b9-904ef130463d

### Highlights

- Episode AI notes
  1. Nvidia's technology originally designed for graphics opened up new applications in AI and crypto, marking the beginning of a new era for AI.
  2. Three researchers from Toronto initiated a major advancement in AI with their work on algorithms for social media feeds, leading to significant value and acquisition by Google and Facebook.
  3. Infiniband, an open source standard, competes with Ethernet for data transfer in data centers, offering higher bandwidth and efficiency.
  4. Melanox is the main provider of Infiniband after most companies left the market.
  5. CUDA, with 4 million registered developers, is crucial for building a developer ecosystem and accelerating computing, giving Nvidia a significant advantage in the industry. ([Time 0:00:00](https://share.snipd.com/episode-takeaways/b45eccb6-003b-44d7-afca-a0bbd4bb37e6))
    - **Tags:** #seeing-from-the-front, #computation, #network-effects, #probability-(make-low-probability-predictions-leading-to-more-knowledge-gain), #right-time/place, #future, #foundings-of-a-movement, #counter-positioning, #founder-=-spirit-of-the-company, #bet-the-company, #luck-favors-the-prepared-mind, #world-altering-moment, #live-in-the-future, #platform-businesses, #paradigm-shift, #reinvention, #system-construction, #acquisitions, #system-destruction, #systems-thinking, #riding-the-wave-of-technology
    - **Note:** The nvidia story is luck favoring the prepared mind. They basically rearchitected the computer as it as well. They built their system intentionally counter positioned for a possible future and gained massive network effects and a lead. This company is Jenson with 10k lives. They’re on the bleeding edge.
      Platform businesses. Rode the Ai wave and built it too
      Cuda and value of platform business. How the web2 giants leveraged AI to make their businesses. AI transformed and enabled trillion dollar business models of web2
      Build with a vision of the future and you’re really right when you’re right. Importance of just not dying and eventually you win.
- The Parallel Computing Frontier and its Applications
  Key takeaways:
  - There was a parallel market called graphics that allowed pixels on a screen to be computed independently and output in parallel
  - Nvidia's technology originally developed for graphics opened up new applications in AI and crypto
  - Three researchers from Toronto initiated a major advancement in AI called the Big Bang moment
  - Their work led to the development of algorithms for social media feeds, creating significant value
  - Google and Facebook acquired the researchers and others working in the field
  Transcript:
  Speaker 1
  And it's so interesting that there was this first market called graphics that was obviously parallel, where every pixel on a screen is not sequentially dependent on the pixel next To it literally can be computed independently and output to the screen. So you have however many tens of thousands or now hundreds of thousands of pixels on a screen that can all actually be done in parallel. And little did Nvidia realize, of course, that AI and crypto and all this other linear algebra, matrix math based things that turned into accelerated computing, pulling things off The CPU and putting them on GPU and other parallel processors was an entire new frontier of other applications that could use the very same technology they had pioneered for graphics. Yeah, it was pretty useful stuff.
  Speaker 2
  And this Alex Knapp moment and these three researchers from Toronto kicked off, you know, Jensen calls it, and he's absolutely right, the Big Bang moment for AI.
  Speaker 1
  So David, the last time we told this story in full, we talked about this team from Toronto, we did not follow what this team of three went on to do afterwards.
  Speaker 2
  Yeah, so basically what we said was it turned out that a natural consequence of what these guys were doing was, oh, actually you can use this to surface the next post in a social media feed, Unlike an Instagram feed or the YouTube feed or something like that. And that unlocked billions and billions of value. And those guys and everybody else working in the field, they all got scooped up by Google and Facebook. ([Time 0:11:42](https://share.snipd.com/snip/2ff272f7-b5c9-4297-bd9e-fa357416579f))
    - **Note:** Gpus we’re used for graphics where each pixel was calculated in parallel but this parallel computation allowed for the use of neural networks which were extreme compute heavy but could be practicalized on 1k of parallel consumer hardware this lead to the AI revolution. Google and Facebook use this ai revolution for recommending and this helps them get massive. This leads to the use of nvidia chips In high quantities launches the company also catalyzes the founding of open ai. To make agi open before google and Facebook get there. This created a trillion in value to these companies. Then OpenAI comes up with the idea that if you understand sentence structure you can not only train Alexnet on 14mm images but the entire internet. This LLMs is a big unlock. Transformers were a big hack because they didnt need past steps to predict the future instead the used context clues to make probablistic bets which is O(n^2) but because it’s parallelyzed it’s not bad. Instead of translating word to word this makes a probablistic guess at the next word context dependent. Transformers need scale they’re very expensive and at 10bn inputs they’re not useful but they scale non linearly to 100bn. Open ai takes oursidevfundunf and goes commercial which allows them to scale. Generative AI becomes big. Now people need compute and they’re acccessing it in the cloud which is a giant boon for OpenAI
- Infiniband versus Ethernet: The Competition for Data Center Data Transfer
  Key takeaways:
  - Infiniband was an open source standard or managed by a consortium
  - Infiniband is a competing standard to Ethernet for moving data between racks in a data center
  - Ethernet was considered the lowest common denominator
  - Most companies exited the market, leaving Melanox as the only Infiniband spec provider
  - Infiniband provides significantly higher bandwidth for data transfer in a data center
  - Infiniband is crucial for addressing multiple GPUs as a single compute cluster for training AI models
  Transcript:
  Speaker 1
  And actually, Infiniband was an open source standard or managed by a consortium. There were a bunch of players in it, but the traditional wisdom was, well, Infiniband is way faster, way higher bandwidth, a much more efficient way to transfer data around a data center. At the end of the day, Ethernet is the lowest common denominator. And so everyone had to implement Ethernet anyway. And so most companies actually exited the market, and Melanox was kind of the only Infiniband spec provider left. Yeah, so you said, what is Infiniband?
  Speaker 2
  It is a competing standard to Ethernet. It is a way to move data between racks in a data center. And back in 2020, everybody was like, Ethernet's fine. Why do you need more bandwidth than Ethernet between racks in a data center? What could ever require 3,200 gigabits a second of bandwidth running down a wire in a data center? Well, it turns out if you're trying to address hundreds, maybe more than hundreds of GPUs as one single compute cluster to train a massive AI model, yeah, you want really fast data interconnects Between them. ([Time 1:01:50](https://share.snipd.com/snip/eb5b7669-321e-4a2e-9b0f-7c42ee624782))
    - **Note:** Normal computers run serial von Neumann architecture but ML needs parallel and the RAM or available memory of a program doesn’t need to be high for traditional compute but they do need to be when you’re doing everything in parallel so the data centers are important. Nvidia also buys a company that uses an open source standard different to Ethernet which is optimized for ML. they’re basically creating an entire different computing hardware and networking standard from the ground up and then this AI boom happened and they exploded. Jenson said the data center was the computer they then create a cpu to run the data center it used to be. Nvidia makes a chip on wafer on substrate cowos which helps solve the memory problem and is geared for AI unlike other more commoditized gpus which is less performant more open source and general purpose this is high performant IP and tsmc can’t make enough so there is a capacity issue. Supply is much lower than demand so prices are super high the computer architecture from the 30s is being reinvented. They basically have a plug in super computer for any company. The H100 is 10x better than the A100 from 2 years ago has 20k cores vs 1 and is 70 pounds. A ton of margin. They have these solutions for data centers and are now providing solutions for cloud.
- NVIDIA's CUDA: Building a Developer Ecosystem and Cementing Their Moat
  Key takeaways:
  - CUDA has 4 million registered developers
  - NVIDIA has a huge moat
  - NVIDIA envisions a world of accelerated computing
  - NVIDIA is building a developer ecosystem
  - NVIDIA is a platform company
  Transcript:
  Speaker 1
  So 13 years to add their first 13 million, then two years to add their second. 2022, they hit 3 million developers, and then just one year later, in May of 2023, CUDA has 4 million registered developers. At this point, there's a huge moat for NVIDIA. And I think when you talk to folks there, and frankly, when we did talk to folks there, they don't describe it this way. They don't think about it like, well, CUDA is our moat versus competitors. It's more like, well, look, we envisioned a world of accelerated computing in the future, and we thought there are way more workloads that should be paralyzed and made more efficient That we want people to run on our hardware. And we need to make it as easy as possible for them to do that. And we're going to go to great lengths and have one, 2,000 people that work at our company that are going to be full-time software engineers building this programming language and compiler And foundation and framework and everything on top of it to let the maximum number of people build on our stuff. That is how you build a developer ecosystem. It's different language, but the bottom line is they have a huge reference for the power that it gives them at the company.
  Speaker 2
  This is something we touched on in our last episode, but has really crystallized for me in doing this one. NVIDIA thinks of themselves as, and I believe is, a platform company, ([Time 1:40:07](https://share.snipd.com/snip/327a15e5-2174-4292-8591-6a2311e4d86d))
    - **Note:** Cuda has 4mm devs and is industry standard thisvgibte them a moat given the ecosystem around it and how all chips run on Cuda. This affirms them as a platform. This helps make them have stronger network effects than an intel. It’s more like ibm who makes the hardware software and then packages solutions. They went from 24% to 70% margin because of their deep moat. They also see where the ball is going on the ground. Their lead is just so big it’s scary dominant everyone at the company is doing their life’s work they have 10x fewer employees than Microsoft similar scale. Jenson is 60 gets up at 5 every day and his work is his relaxing time. Nvidia is Jenson with 10k lives doing their life’s work. There’s no wfh conversation they just get their job done regardless. “You build a company by doing things others can’t do not by fighting over something everyone can do”. They don’t build commodities. They invested 10 years ahead we’re wildly innovative and very right about huge markets.
