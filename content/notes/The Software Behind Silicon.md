# The Software Behind Silicon

![](https://wsrv.nl/?url=https%3A%2F%2Fimg.transistor.fm%2FdNnf6LpAQWE0wpAoTx8uJ_UxFunnfOPHNZNgYIvAjcY%2Frs%3Afill%3A3000%3A3000%3A1%2Fq%3A60%2FaHR0cHM6Ly9pbWct%2FdXBsb2FkLXByb2R1%2FY3Rpb24udHJhbnNp%2Fc3Rvci5mbS9zaG93%2FLzQwNjY1LzE2OTE0%2FMjk2ODItYXJ0d29y%2Fay5qcGc.jpg&w=100&h=100)

### Metadata

- Author: ACQ2 by Acquired
- Full Title: The Software Behind Silicon
- Category: #podcasts



- URL: https://share.snipd.com/episode/e38302d7-4a71-4c92-827f-bd1081d5e958

### Highlights

- Episode AI notes
  1. Increasing performance in the semiconductor industry can be achieved through the development of specialized hardware tailored to specific workloads.
  2. Horizontal scaling by connecting multiple dies or chips together can significantly increase compute power.
  3. The combination of specialized hardware development and horizontal scaling provides a multiplier effect for performance improvements.
  4. Systemic complexity has a greater impact on overall performance in the semiconductor industry compared to scale complexity. ([Time 0:00:00](https://share.snipd.com/episode-takeaways/1b8b0ffd-1988-4e53-8c1f-ded16d02829e))
- Embracing Specialized Hardware and Horizontal Scaling for Enhanced Performance
  Summary:
  In the quest for increased performance, two key strategies are highlighted.
  Firstly, by developing specialized hardware tailored to specific workloads, it unlocks the potential for substantial performance enhancements. Secondly, through horizontal scaling by connecting multiple dies or chips together, a significant increase in compute power can be achieved.
  The combination of these approaches provides a multiplier effect, allowing improvements at various levels of abstraction to positively impact overall performance, emphasizing the importance of systemic complexity over scale complexity.
  Transcript:
  Speaker 3
  If I could just entertain a thought exercise, what do we need to do to get 4X, 8X, 16X more performance from here? What are the innovations that need to happen for that to be possible?
  Speaker 1
  The two things. The first one is well understood from many years ago, which is develop the hardware for the specific workload. Somewhat overly simplified, the first years of Moore's Law is here are more transistors, better circuitry, write your software and people said, wow, I can now do so many more. And then he's, oh, you need more memory. Here's more memory. Write your software and make the world happen, right? And then came gradually sort of this conundrum of, oh yeah, but can you not make it faster like a lot faster, especially all that visual stuff on the screen, it's so slow. And then out of nowhere somebody says, oh, why don't we not use a general purpose processor to do pixels? And then the thing becomes called the GPU. And what does the GPU do? It loves pixels. It doesn't only pixels. It can do them forward and backwards and sideways and so on. And out of that is essentially a specialized accelerator. And then of course, they discover that, well, it would be better to have two or four or 16 actually multi core, even smaller processors. And essentially what you have is now a workload that has determined the hardware that you need. Now, advance that to 15, 20 years later and say the workload is driving a car without accidents. You can imagine that by saying, well, let's take your old 386 and see what you can do with that. You're going to go nowhere, right? You need actually a whole bunch of specialized machines from the anything that takes the many sensors data and compresses it or transports it and so on to ultimately the AI algorithms That can run preferably a real time to drive the car. And so one of the statements on that is called software defined architectures. And I show it sort of as this V from top down because you're starting with high level functionality, drive it correctly and get there at the same time. And it's literally at the same time, you come to the conclusion that, you know, chips that are more than one and a half inch square. And I know there's some people do whole wafers, but you know, it quickly gets to an end and adding another zero in the number of transistor is going to be a really long, long home. And so you say, well, what if we split functionality into multiple chips? What if we brought them really close together and therein lies the essence? We work close together because the notion of heavy multiple die, maybe on an interposer, which is itself a chip, right, is not new, but a, it was difficult. It was expensive and be it was slow. And if you look at the evolution of the last 20 years, the single thing, in my opinion, that is empowering multi die is connectivity, meaning we have improved dramatically, dramatically, Not only reducing the distance, but the bandwidth, meaning how many pins you can do, how small these spins are, and how little energy they need to flip a bit or to pass a bit from one chip To another, still way more than keeping it on the same chip. It could just keep it on the same chip that would be cool, but that's not going to be possible.
  Speaker 3
  And this is, of course, the Blackwell, that's an example as the new Nvidia Blackwell chip is that silicon interposer between two dies that enable super fast information to flow between The two dies.
  Speaker 1
  And Intel and AMD have very similar constructs and they all increasingly now look like they're 12 to 20 or so chips. And by the way, these chips don't all don't have all be processors actually need memories. And the cool thing with memories, you gradually can stack them and they stack potentially better because they don't create the heat that Cezin was creating in his processors. Thermal is absolutely one of the big killers and all of this and a few others, but the enabler is connectivity. And so if you now look at a picture of sort of bottom up from physics, you come to this whole new architecture that's really connectivity driven, you come down from software as in software Driven, the word architecture has a functional perspective and it has a physical perspective. And so that opens an entire new age. We call it Sysmores, so systemic complexity with a Moore's Law exponential ambition. And I like to use the word exponential because I'm a strong believer that what we see happening is another 20 years of additional complexity and speed may have to be redefined as well. We do a whole bunch of things in parallel, but that's a different form of speed, right? But any speed you can improve is still valuable.
  Speaker 3
  So with Sysmore, what you're basically saying is we are going to abstract up one level what the notion of the system is. We're not measuring Moore's Law specifically on this one chip anymore. We're measuring it for your whole system that where the goal might be drive this car safely. Are we able to optimize more components of it to work together harmoniously to continue to achieve Moore's Law like outcomes?
  Speaker 1
  Yeah, I said what I would add is it's not abstracting one level. We've been abstracting more levels already for many years. And I think that includes the software, the embedded software, the software that connects to other pieces, then ultimately the various forms of AI optimizations and then still the Domain specific knowledge of that. A great example of this is if you were to ask us, hey, you know, if you really wanted to cut another 20% of the power, which layer would you start with? I can tell you, it would not be the transistor. It would be the software somewhere.
  Speaker 3
  It's kind of like whenever I'm tempted to buy a lighter carbon bicycle, I realize that instead of spending $3,000 to shave an ounce, I could probably lose a pound and it would be nothing But advantageous. Yeah. And example in case you are the software and you're a little too soft here. Oh, of course. What's the old phrase about bicycles? N plus one is the right number of bikes to have.
  Speaker 5
  Exactly.
  Speaker 1
  I have a T-shirt that says just one more guitar and it's the same. One more guitar and you're going to be a great musician. The difference between you and greatness is right there.
  Speaker 3
  That's awesome. If I could perhaps paraphrase the two things that you said, it's this idea that, hey, what if we admit that density is going to be really, really hard from here to get even more density On a chip? So either A, we can ([Time 0:40:51](https://share.snipd.com/snip/7ccadcd5-767f-4b0c-b6b4-030794301c58))
    - **Tags:** #transitor, #inversion, #unique-problem-solving, #complexity, #system-construction, #systems-thinking, #scale
    - **Note:** Improving transitiors no longer on the chip but in the system design. Systemic complexity is multiplicative but scale complexity is additive. Finding improvements in other areas considering the entire system in the future of computing. Building special more optimized chips instead of general purpose chips and combining them in novel ways to optimize output.
