# 170 - Burning MEV With Justin Drake and Dom

![](https://wsrv.nl/?url=https%3A%2F%2Fssl-static.libsyn.com%2Fp%2Fassets%2Fc%2Ff%2Fd%2F4%2Fcfd431701301218b%2Fbankless-logo_1.png&w=100&h=100)

### Metadata

- Author: Bankless
- Full Title: 170 - Burning MEV With Justin Drake and Dom
- Category: #podcasts



- URL: https://share.snipd.com/episode/813f7c62-b51d-4f26-ada4-c16ce6e143cc

### Highlights

- Breaking Down Ethereum's Block Space Demand: Congestion vs Contention
  Summary:
  Justin Drake: I'm mostly interested in the way we quantify MEV. We're working with the auction model or having proposers, like, impose their view of bids from bloodbuilders. So this is like step one of MEV burn is actually quantifying the bids. But Dom, where do you fit inside of this conversation? Where have you specialized? What's your role here when you do a lot of the Ethereum research? And what should we know before we go through this conversation?
  Transcript:
  Speaker 2
  As a podcaster, one of the reasons why I love doing a podcast with Justin Drake is because he provides very robust agendas, which makes my job very, very easy. So Justin, we've got four parts that we're going to walk through. Just part zero, the intro, setting the stage, part one, the mental model, congestion and contention, which you've already established. And then after this, we go into smoothing, which we're talking about the security benefits for Ethereum and then redistribution, which are the economic benefits. And so the way I see this conversation going forward is we're just going to start to set the stage, continuing to define some terms a little bit. And then we're going to really unpack that mental model of what Justin calls congestion versus contention. And both of these are block space demand, but one is just congestion is just like basal block space demand, the average transaction. And then contention is the demand to be first in a block. And these different demands have different properties. Smoothing is MEV smoothing and redistribution is MEV burn, redistricting into all the eth holders. But Dom, I'm wondering, where do you fit inside of this conversation? Where have you specialized? What's your role here when you do a lot of the Ethereum research? What are you specifically researching?
  Speaker 4
  And what should we know before we go through this conversation? Yeah, I'm mostly interested in the way we quantify MEV. We're working with the auction model or having proposers, like, impose their view of bids from bloodbuilders. So this is like step one of MEV burn is actually quantifying the bids. ([Time 0:14:33](https://share.snipd.com/snip/0e971a05-d8ac-4025-ab46-b3d804c40d73))
    - **Note:** High level agenda
- Efficiency of Contentious Blocks in the MEV Landscape
  Key takeaways:
  - The contention part of a block is an efficient place due to the MEV landscape as a whole.
  - Transaction bundlers search through transactions to make a bundle which becomes a block.
  - MEV bots, liquidation bots, and arbitrage all contribute to the MEV landscape.
  Transcript:
  Speaker 2
  Okay, so to put that, I really like that metaphor. So like the average consumer, the average operator of a combustion engine uses the average gas. And when I send Ether from David Hoffman to Ryan Sean Adams, that's actually not Ryan's Ether, you know, that's name. I just use normal oil. And that's fine. That's great. That's what I need to do to get from point A to point B. What you're saying is like the contention part of a block, which is that first slot in the block is a insanely efficient place in the block because of this, what you're calling an engine, because the reason why you're using that word is because you're looking at the MEV landscape as a general. We have the MEV landscape as a system as a whole. We have transactions and then we have transaction bundlers, searchers who search through the transactions to make a bundle and that bundle gets conversion to a larger bundle and that ultimately becomes a block. And we have MEV bots. We have liquidation bots. We have people that are micro arbitrage and uniswap. We have everything, all the MEV that's all happening, a massive industry and they're all fighting for that one slot that in the block, the top transaction slot, because that is where they fight for. They fight for all of that economic activity. And you're saying that that one slot consumes ether to get into that one slot and that's just a highly refined version of ether. Even though it's the same ether that we all use, it's still highly refined because of the net output of that one slot is this massive explosion of economic activity inside of that one block. That's the metaphor, correct? Right, that's correct.
  Speaker 3
  So ether is oil. It's money to purchase oil, I suppose.
  Speaker 2
  And then there's a flip side, which is just congestion. But I think that's not the subject of this podcast. That was the subject of our older podcast. That was just about EIP 1559, right? So this podcast about MEV burn is just primarily about the activity in the contention part of the block space, correct? Right, that's correct. ([Time 0:19:51](https://share.snipd.com/snip/ccf62eef-5a02-450c-8177-bb672aa06ee9))
    - **Note:** Eth is like oil. In your wallet it’s like it’s in the ground it can also be used like gas as the base fee or it can be used like rocket fuel as MEV that reorders transactions and makes you a very efficient gas user v
- Understanding the Ethereum Blockchain Supply Chain: Proposer Builder Separation
  Key takeaways:
  - Attesters can impose their view of bids on the proposer to prevent the proposer from stealing MEV
  - Proposer Builder Separation (PBS) is a future Ethereum protocol roadmap item that aims to achieve attester-imposed bid views on proposers
  - PBS is not expected to happen this year and is a more distant future goal.
  Transcript:
  Speaker 4
  And once we have that, then we can have the attesters impose their view of bids on the proposer so that if they say they're all hearing builders bid one and then the proposer says, okay, I'm going to bid zero and then I'm going to just steal the MEV, then that's not going to work because other attesters are just not going to vote for that block. So that's like one high level overview of how we can have not only be aware of bids, but also impose this view on the proposer.
  Speaker 3
  So, Dom, are you saying that PBS, by the way, a bankless nation, if you're not familiar with that term, it's not the broadcasting network in the US PBS stands for Proposer Builder Separation. We've done entire episodes on this and we will include links in the show notes to get you caught up. But this is a future Ethereum protocol roadmap item that we've been wanting to achieve. And it's not going to happen this year. It's in the more distant future than this year. Proposer Builder Separation. Are you saying Dom that PBS, some version of it is a requirement to get us to MEV burn and MEV smoothing that we're going to talk about in the rest of this episode? So first things first, we need PBS at the protocol layer. We need to deploy that. Then we'll have visibility into the MEV. Is that what you just said? Yes.
  Speaker 2
  Got it. And I think really the episode that we did with Matt Cutler from Block Native talked about the Ethereum blockchain supply chain, which is fun to say. And really the Proposer Builder Separation Proposers are people who are proposing a block. That's Ether Stakers. Trust me if I'm wrong with Proposers and Ether Stakers are largely synonymous. And then before that are the Block Builders. So instead of the Ether Stakers, again, which we want the supply chain of the Ethereum blockchain to be maximally accessible to the Ethereum platform, we need to be able to do that. So we're going to be maximally accessible to the average retail individual. So we've separated the role of building a block from the Ether Stakers. And the Block Builders just compete by submitting bids to Ether Stakers as to which Block to propose. And so the Proposers select the highest bid block because they want to be paid the most amount of Ether. And all of the very computationally intensive and high resource constraining role of building a block, putting all the transactions in the correct order, running all the computation to make sure you're maximizing MEV. All of that is done by a very specialized entity that's hard to compete with. But they just bid for block inclusion by Ether Stakers. And I think, Don, what you're saying is that through the process of Proposer Builder Separation and then also the earlier step of transaction bundling, there is a pseudo oracle process that is able to be contained step by step by step that ultimately becomes converged onto the actual Block Builder and Block Proposer. And because of the each transaction inside of a block has a small amount of value associated with it, all of that gets aggregated into some sort of oracle that gets passed along to the Block Proposer and the Ethereum in blockchain actually can ingest that information and use that as an oracle. That was my best explanation at this. ([Time 0:29:52](https://share.snipd.com/snip/4fc8d291-8c9b-4bf7-a5d1-3dfc738c35a6))
    - **Note:** Proposer builder separation creates the validation of a block from the computation that creates an optimal block which can help avoid mev when enshrined. Right now it’s based on 3rd parties
- Enforcing Contention Pricing and MEV Burn in Ethereum 1,559 and EIP-159
  Key takeaways:
  - The burn makes it real by preventing artificial inflation of the oracle
  - The attesters prevent artificially low bids from winning
  - Enforcing the correctness of the bid value is achieved through the attesters
  - The true oracle value is burned once its correctness is ensured
  Transcript:
  Speaker 1
  And what the burn does is that it makes it real in the sense that you're no longer incentivized to kind of cheat by artificially inflating the oracle. But then there's this other thing that you want to prevent is people artificially putting a low value of the burn. And the way that you do that is you invoke the attesters. So anyone can observe this bid pool. In particular, the attesters can observe the bid pool. And if you pick a value of the bid which is too low, which is not the highest bid, then the attesters are just going to say, beep, your block is just not going to make it on chain. And so you lose any opportunity to build a block. So basically we're enforcing the correctness of this bid value, the fact that it reflects reality as the highest paying bid using the attesters. And now that we know that this is a true oracle value that reflects reality, we can go ahead and burn it. ([Time 0:33:49](https://share.snipd.com/snip/1a9da51b-36d2-4e7a-9ca8-26ab374a2fa6))
    - **Note:** We have the proposer ensure it’s the best construction then the attesters agree then we burn the bid for the block returning the money to the protocol.
- The Risks of Validator Lottery and Bitcoin Mining Pools
  Key takeaways:
  - Validator's huge APR resembles a winning ticket by chance as everyone else is a loser in the wild of cryptocurrency, similar to playing a lottery.
  - Bitcoin miners might never earn any bitcoin by using an inefficient rig and hence are forced to join mining pools to earn rewards.
  Transcript:
  Speaker 1
  They were just lucky. They bought a lottery ticket by being a validator, and everyone's in the wild, we have this massive jackpot. And so this one validator, he has a huge amount of APR, whatever it is, like a thousand percent or ten thousand percent. The entire loaf of bread here is what we're talking about. Yes. And then everyone else who didn't get a cut of that one thousand ETH is a loser. And it's just like when you're playing lottery, right? Everyone spends one dollar buying the lottery ticket, and almost everyone loses the one dollar. But then there's this one guy who just happens to win, you know, a hundred million dollars. And so right now we're all losers, and we're risking a situation where we're with Bitcoin mining. So there's this incredible statistic with Bitcoin mining is that if you buy a Bitcoin mining rig, and you run it for five years, continuously plugged in, more likely than not, this mining rig will never produce a block. So it will never earn Bitcoin. And so Bitcoin miners are economically forced to join mining pools. Otherwise, you know, they're just playing a lottery. They're just gambling. It's forced centralization. It's forced centralization. And the same thing is happening with Ethereum to a lower extent, but it's still happening. And so if we can give everyone the same APR, the same average APR, then we're kind of allowing solar validators to enjoy this average APR without having to join a pool.
  Speaker 4
  Yeah, to really drive this point home, I would say bring back the concept of MEV spikes. And you can think of, let's say it spikes over the length of 10 blocks. ([Time 0:40:25](https://share.snipd.com/snip/a33cc4d8-5bf2-42b7-a3a7-5efb0e66d3ab))
    - **Note:** Because mev isn’t evenly distributed some builders/validator get much more reward for being lucky this socializies the gains.
- The Business Models of Blockchains & Comparing Blockchains to Apple
  Key takeaways:
  - Nielsen's law states that every year, consumer bandwidth grows by 50%
  - Exponential growth of block space supply could lead to infinite supply and congestion fees going to zero
  - Contention is always present and derives from market inefficiencies that can be arbitrashed out
  - Blockchains sell blocks as their product
  Transcript:
  Speaker 1
  But we live in an exponential world with technology. We live in a world where supply grows exponentially. There's this equivalent of more lawful bandwidth, which is called Nielsen's law. Nielsen's law says that every year, consumer bandwidth grows by 50%. And so if we have this exponential growth of block space supply, then we might essentially have infinite supply and the congestion fees will go to zero. Whereas contention is something that's kind of always there. It's latent. It derives from these market inefficiencies that can be arbitrashed out. And so now we have these two business models. If one of them fails, it's maybe okay because the other business model comes in.
  Speaker 3
  That's really fascinating that business model idea, Justin, because one thing we've tried to reinforce on bankless and people are trying to understand blockchains is what products do blockchains produce. We always say this. Blockchains sell blocks. That's the product that they actually sell, right?
  Speaker 2
  Blockchains sell blocks. Yeah.
  Speaker 3
  And we've compared it to sort of like Apple, right? So the value of an iPhone is worth more than sort of a commodity phone. You could see that in the profit margin. So Apple sells really good phones. And so they're able to charge a premium. That's why there's a premium on Ethereum block space. But what's also interesting is this idea of a second business model here. If you notice a company like Apple, their first business model is they sell the phone. They sell the hardware. They make a thousand dollars a phone. That's fantastic. ([Time 1:02:45](https://share.snipd.com/snip/22f5c02e-487b-4c03-8e4d-3a3a43ca7a66))
    - **Note:** Second business model not only is eth selling blocks but it’s monetizing use of the network created by mev. Burning mev also socializes to all holders not just stakers so it gives incentive to just hold. If it went to just stakers then it may create more staked eth and suck economic activity out of the network.
- Benefits of MEV burn: Saving ETH and Increasing Efficiency
  Key takeaways:
  - MEV burn could save approximately 250,000 ETH per year
  - A more efficient consensus through MEV burn could result in a savings of around 200,000 ETH
  - MEV burn provides two major benefits to the Ethereum ecosystem
  Transcript:
  Speaker 1
  I just wanted to make that point. I think you had another comment on this as well about the benefits. Right. So we can try and quantify whether the benefits of adding this second business model running in parallel with the first business model. And the way that we can quantify that is by just asking ourselves how much more burn would we have had we had MEV burn. And the answer is on the order of 250,000 ETH per year. And that's during the current conditions, kind of the bare market conditions. Wow. But actually the story gets even better because remember how I was saying that by burning the MEV, you actually have a more efficient consensus. So that means that you're issuing less. You have to issue less to pay for security because the more validators come in, the more issuance there is. And that is a roughly 200,000 ETH improvement over the status quo. So we have two benefits to MEV burn. The first one is that we'd be burning on the order of 250,000 ETH per year. And on top of that, we'd be saving 200 ETH that we wouldn't be printing, that we wouldn't be issuing. So roughly speaking, it's a half a million ETH per year optimization that we have as an option.
  Speaker 3
  So MEV burn is a half a million per year optimization? Yes. ([Time 1:04:46](https://share.snipd.com/snip/a78211a5-5d1e-45aa-b0a1-ef2c311ec2c2))
    - **Note:** Mev burn will burn 250k eth and cause 200k less eth to be printed in rewards due to less incentive to be a staker. 250k eth is this year and mev is higher in a bull market. Will also be a provision to return bad mev like sandwich attacks back to individual holders while allowing for things like arbitrage better mev to be socialized.
