import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "daanelson/minigpt-4:b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423",
  {
    input: {
      image: "https://replicate.delivery/pbxt/IqG1MbemhULihtfr62URRZbI29XtcPsnOYASrTDQ6u5oSqv9/llama_13b.png",
      top_p: 0.9,
      prompt: "This llama's name is Dave. Write me a story about how Dave found his skateboard.",
      num_beams: 5,
      max_length: 4000,
      temperature: 1.32,
      max_new_tokens: 3000,
      repetition_penalty: 1
    }
  }
);

/*
https://replicate.delivery/pbxt/IqG1MbemhULihtfr62URRZbI29XtcPsnOYASrTDQ6u5oSqv9/llama_13b.png

JSON response
{
  "completed_at": "2023-05-17T23:27:47.968519Z",
  "created_at": "2023-05-17T23:27:31.030303Z",
  "error": null,
  "id": "u6yurll6v5f6xjl2q47dudq3sy",
  "input": {
    "image": "https://replicate.delivery/pbxt/IqG1MbemhULihtfr62URRZbI29XtcPsnOYASrTDQ6u5oSqv9/llama_13b.png",
    "top_p": 0.9,
    "prompt": "This llama's name is Dave. Write me a story about how Dave found his skateboard.",
    "num_beams": 5,
    "max_length": 4000,
    "temperature": 1.32,
    "max_new_tokens": 3000,
    "repetition_penalty": 1
  },
  "logs": null,
  "metrics": {
    "predict_time": 16.967653
  },
  "output": "Dave the llama was feeling very bored one day. He had been wandering around the city for hours, but there was nothing interesting to do. Suddenly, he saw a skateboard lying on the ground. He decided to try it out, and as soon as he started riding it, he felt a rush of excitement. He rode around the city, enjoying the feeling of the wind in his hair and the freedom of being on his own. As he rode, he saw all sorts of interesting things that he had never noticed before. He even met some new friends along the way. After a while, Dave realized that he had found his true passion - skateboarding. From then on, he spent all his free time riding his skateboard and exploring the city.",
  "started_at": "2023-05-17T23:27:31.000866Z",
  "status": "succeeded",
  "urls": {
    "get": "https://api.replicate.com/v1/predictions/u6yurll6v5f6xjl2q47dudq3sy",
    "cancel": "https://api.replicate.com/v1/predictions/u6yurll6v5f6xjl2q47dudq3sy/cancel"
  },
  "version": "b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423"
}
*/


import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "alaradirik/nougat:fbf959aabb306f7cc83e31da4a5ee0ee78406d11216295dbd9ef75aba9b30538",
  {
    input: {
      document: "https://replicate.delivery/pbxt/JbMUOcGjsnHOnQlLDA6dPwxH9StGCDhIS3AOEomBYdYvqDb9/sample2.pdf",
      postprocess: false,
      early_stopping: false
    }
  }
);

/* JSON Response
{
  "completed_at": "2023-09-27T16:24:31.144845Z",
  "created_at": "2023-09-27T16:22:07.213657Z",
  "error": null,
  "id": "pzvg6udbb2bqbmxpbozi6tsi34",
  "input": {
    "document": "https://replicate.delivery/pbxt/JbMUOcGjsnHOnQlLDA6dPwxH9StGCDhIS3AOEomBYdYvqDb9/sample2.pdf",
    "postprocess": false,
    "early_stopping": false
  },
  "logs": "0%|          | 0/1 [00:00<?, ?it/s][nltk_data] Downloading package words to /root/nltk_data...\n[nltk_data]   Unzipping corpora/words.zip.\nProcessing file /tmp/tmpui_a8edwsample2.pdf with 4 pages\n100%|██████████| 1/1 [00:24<00:00, 24.52s/it]\n100%|██████████| 1/1 [00:24<00:00, 24.52s/it]",
  "metrics": {
    "predict_time": 25.952627
  },
  "output": "https://pbxt.replicate.delivery/PHmHkYx0RZYhL1t4yzCIpm6S1KNRiQL3KO83GdmFl4kPJIaE/output.txt",
  "started_at": "2023-09-27T16:24:05.192218Z",
  "status": "succeeded",
  "urls": {
    "get": "https://api.replicate.com/v1/predictions/pzvg6udbb2bqbmxpbozi6tsi34",
    "cancel": "https://api.replicate.com/v1/predictions/pzvg6udbb2bqbmxpbozi6tsi34/cancel"
  },
  "version": "0e5c17e048aadc94800ba280eebced3b86c83f4679a723671a18d96f8f2d6fc5"
}
*/

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "nateraw/whisper-large-v3:e13f98aa561f28e01abc92a01a4d48d792bea2d8d1a4f9e858098d794f4fe63f",
  {
    input: {
      filepath: "https://replicate.delivery/pbxt/JqgoueglbGSq0ReVQXgzmiqzt0INVT3u5Z8qK4Ocr4mKeucA/Donald_Trump_voice.ogg",
      translate: false,
      return_timestamps: true
    }
  }
);

/*. JSON Response
{
  "completed_at": "2023-11-13T21:38:42.190919Z",
  "created_at": "2023-11-13T21:38:24.435445Z",
  "error": null,
  "id": "63xdz4tbehirfhrknude3zauya",
  "input": {
    "filepath": "https://replicate.delivery/pbxt/JqgoueglbGSq0ReVQXgzmiqzt0INVT3u5Z8qK4Ocr4mKeucA/Donald_Trump_voice.ogg",
    "translate": false,
    "return_timestamps": true
  },
  "logs": "/root/.pyenv/versions/3.8.18/lib/python3.8/site-packages/transformers/pipelines/base.py:1101: UserWarning: You seem to be using the pipelines sequentially on GPU. In order to maximize efficiency please use a dataset\nwarnings.warn(",
  "metrics": {
    "predict_time": 17.761175
  },
  "output": {
    "text": " The President of the United States, Mr. President, I thank you very much. Thank you. Good evening. I'd like to provide the American people with an update on our efforts to protect the integrity of our very important 2020 election. If you count the legal votes, I easily win. If you count the illegal votes, they can try to steal the election from us if you count the votes that came in late we're looking at them very strongly but a lot of votes came in late I've already decisively won many critical states including massive victories in Florida Iowa Indiana Ohio to name just a few we won these and many other victories despite historic election interference from big media, big money, and big tech, as everybody saw. We won by historic numbers. And the pollsters got it knowingly wrong. They got it knowingly wrong. We had polls that were so ridiculous, and everybody knew it at the time. There was no blue wave that they predicted they thought there was going to be a big blue wave that was false it was done for suppression reasons but instead there was a big red wave and it's been properly acknowledged actually by the media they were I think very impressed but that was after the fact that doesn't do us any good we kept the Senate despite having twice as many seats to defend as Democrats and in a really much more competitive states we've we did a fantastic job with the Senate I think we're very proud of what's happened there and many more seats to defend. They spent almost $200 million on Senate races in South Carolina and Kentucky alone, two races, and hundreds of millions of dollars overall against us. At the national level, our opponents' major donors were Wall Street bankers and special interests. Our major donors were police officers farmers everyday citizens yet for the first time ever we lost zero races in the house I was talking to Kevin McCarthy today he said he couldn't believe it zero race is very unusual thing zero and actually won many new seats with I think many more in the way this was also the year of the Republican woman. More Republican women were elected to Congress than ever before. That's a great achievement. I won the largest share of non-white voters of any Republican in 60 years, including historic numbers of Latino, African American, Asian American, and Native American voters, the largest ever in our history. We grew our party by 4 million voters, the greatest turnout in Republican Party history. Democrats are the party of the big donors, the big media, the big tech, it seems, and Republicans have become the party of the American worker, the big media, the big tech, it seems, and Republicans have become the party of the American worker, and that's what's happened. And we're also, I believe, the party of inclusion. As everyone now recognizes, media polling was election interference, in the truest sense of that word, by powerful special interests. These really phony polls, I have to call them phony polls, fake polls, were designed to keep our voters at home, create the illusion of momentum for Mr. Biden, and diminish Republicans' ability to raise funds. They were what's called suppression polls. Everyone knows that now. And it's never been used to the extent that it's been used on this last election to highlight just a few examples the day before election quinnipiac which was wrong on every occasion that i know of had joe biden up by five points in Florida and they were off by eight point four points. And I won Florida easily, easily. So they had me losing Florida by a lot and I ended up winning Florida by a lot. Other than that, they were very accurate. They had him up four points in Ohio and they were off by 12.2 points. And they also won Ohio, great state of Ohio, very easily. The Washington Post said Biden up 17 points in Wisconsin, and it was basically even. They were off by about 17 points. And they knew that. They're not stupid people. They knew that. Suppression. There are now only a few states yet to be decided in the presidential race. The voting apparatus of those states are run in all cases by Democrats. We were winning in all the key locations by a lot, actually. And then our numbers started miraculously getting whittled away in secret, and they wouldn't allow legally permissible observers. We went to court in a couple of instances, and we were able to get the observers put in. And when the observers got there, they wanted them 60, 70 feet away, 80 feet, 100 feet away, or outside the building to observe people inside the building. And we won a case, a big case, and we have others happening. There are lots of litigation, even beyond our litigation. There's tremendous amount of litigation generally because of how unfair this process was. And I predicted that. I've been talking about mail-in voting for a long time it's it's really destroyed our system it's a corrupt system and it makes people corrupt even if they aren't by nature but they become corrupt it's too easy they want to find out how many votes they need and then they seem to be able to find them they wait and wait and then they find them and you to find them. They wait and wait, and then they find them. And you see that on election night. We were ahead in vote in North Carolina by a lot. Tremendous number of votes. And we're still ahead by a lot, but not as many, because they're finding ballots all of a sudden. Oh, we have some mail-in ballots. It's amazing how those mail-in ballots are so one-sided, too. I know that it's supposed to be to the advantage of the Democrats, but in all cases, they're so one-sided. We were up by nearly 700,000 votes in Pennsylvania. I won Pennsylvania by a lot. And that gets whittled down to, I think they said, now we're up by 90,000 votes. And they'll keep coming and coming and coming. They find them all over. And they don't want us to have any observers. Although we want a court case. The judge said you have to have observers. Likewise in Georgia. And they're appealing. Actually, they're appealing. We want a case that we want people to watch, and we want observers. And they're actually appealing, which is sort of interesting. I wonder why they'd appeal, that all we want people to watch and we want observers. And they're actually appealing, which is sort of interesting. I wonder why that appeal, that all we want to do is have people watch as they do the vote tabulations. Likewise, in Georgia, I won by a lot, a lot, with a lead of over getting close to 300,000 votes on election night in Georgia. And, by the way, it got whittled down, and now it's getting to be to a point where I'll go from winning by a lot to perhaps being even down a little bit. In Georgia, a pipe burst in a faraway location, totally unrelated to the location of what was happening. And they stopped counting for four hours. And a lot of things happened. The election apparatus in Georgia is run by Democrats. We also had margins of 300,000 in Michigan. We're way up in Michigan, won the state. And in Wisconsin, we did likewise fantastically well. And that got whittled down. In every case, they got whittled down. Today, we're on track to win Arizona. We only need to carry, I guess, 55 percent of the remaining vote, 55 percent margins. And that's a margin that we've significantly exceeded. So we'll see what happens with that, but we're on track to do okay in Arizona. Our goal is to defend the integrity of the election. We'll not allow the corruption to steal such an important election or any election for that matter. And we can't allow silence, anybody to silence our voters and manufacture results. I've never had. I've been doing a lot of public things for a long time. I've never had anything that's been as inspirational by people calling, talking, sending things to us. I've never seen such love and such affection and such spirit as I've seen for this people know what's happening and they see what's happening and it's before their eyes and there are many instances which will be reported very shortly there's tremendous litigation going on and this is a case where they're trying to steal an election they're trying to rig an election and we can't let that happen Detroit and Philadelphia known as two of the most corrupt political places anywhere in our country, easily cannot be responsible for engineering the outcome of a presidential race, a very important presidential race. In Pennsylvania, Democrats have gone to the state Supreme Court to try and ban our election observers, and very strongly now we won the case but they're they're going forward they don't want anybody in there they don't want anybody watching them as they count the ballots and i can't imagine why there's absolutely no legitimate reason why they would not want to have people watching this process because if it's straight they would be they should be proud of it instead they're trying obviously to commit fraud there's no question about that in Philadelphia observers have been kept far away very far away so far that people are using binoculars to try and see. And there's been tremendous problems caused. They put paper on all of the windows so you can't see in, and the people that are banned are very unhappy and become somewhat violent. The Eleventh Circuit ruled that in Georgia the votes have been in by the election day that they should be in by election day and they weren't votes are coming in after election day and they had a ruling already that you have to have the votes in by election day to the best of my knowledge votes should be in by election day and they didn't do that Democrat officials never believed they could win this election, honestly. I really believe that. That's why they did the mail-in ballots, where there's tremendous corruption and fraud going on. That's why they mailed out tens of millions of unsolicited ballots without any verification measures whatsoever. And I've told everybody that these things would happen. Because I've seen it happen. I watched a lot of different elections before they decided to go with this big, massive election, with tens of millions of ballots going out to everybody. In many cases, totally unsolicited. This was unprecedented in American history. This was by design, despite years of claiming to care about the election security. They refused to include any requirement to verify signatures, identities, or even determine whether they're eligible or ineligible to vote. People are walking in there. They have no idea. They're just taking numbers. They're writing down things, the workers, and doing a lot of bad things. And we have a lot of information coming and litigation that you'll see that will shake even you people up. And you've seen it all. The officials overseeing the counting in Pennsylvania and other key states are all part of a corrupt Democrat machine that you've written about and for a long time you've been writing about the corrupt Democrat machine that you've written about and for a long time you've been writing about the corrupt democrat machine i went to school there and i know a lot about it hasn't changed a long time ago and hasn't changed it's gotten worse in pennsylvania partisan democrats have allowed ballots in the state to be received three days after the election and we think much more than that. And they are counting those without even postmarks or any identification whatsoever. So you don't have postmarks, you don't have identification. There have been a number of disturbing irregularities across the nation. Our campaign has been denied access to observe any counting in Detroit. Detroit is another place and I wouldn't say has the best reputation for election integrity. Poll workers in Michigan were duplicating ballots. But when our observers attempted to challenge the activity, those poll workers jumped in front of the volunteers to block their view so that they couldn't see what they were doing. And it became a little bit dangerous. One major hub for counting ballots in Detroit covered up the windows again with large pieces of cardboard. And so they wanted to protect and block the counting area. They didn't want anybody seeing the counting, even though these were observers who were legal observers that were supposed to be there. In Detroit, there were hours of unexplained delay in delivering many of the votes for counting. The final batch did not arrive until 4 in the morning, and even though the polls closed at 8 o'clock, so they brought it in and the batches came in, and nobody knew where they came from. we've also been denied access to observe in critical places in Georgia and multiple swing states counting was halted for hours and hours on election night with results withheld from major Democrat run locations only to appear later and they certainly appeared and they all had the name Biden on them or just about all I think almost all they all had the name Biden on them which is a little strange I challenge Joe and every Democrat to clarify that they only want legal votes because they talk about votes and I think they should use the word legal legal votes we want every legal vote counted and I think they should use the word legal, legal votes. We want every legal vote counted, and I want every legal vote counted. We want openness and transparency. No secret count rooms. No mystery ballots. No illegal votes being cast after Election Day. You have Election Day, and the laws are very strong on that. You have an Election Day, and they don't want votes cast after Election Day. And they want the process to be an honest one it's so important we want an honest election we want an honest count and we want honest people working back there because it's a very important job so that's the way this country is going to win that's the way the united states will win and we think we will win the election very easily. We think there's going to be a lot of litigation because we have so much evidence, so much proof. And it's going to end up perhaps at the highest court in the land. We'll see. But we think there'll be a lot of litigation because we can't have an election stolen like this. And I tell you, I have been talking about this for many months with all of you. stolen like this. And I tell you, I have been talking about this for many months with all of you. And I've said very strongly that mail-in ballots are going to end up being a disaster. Small elections were a disaster. Small, very easy-to-handle elections were disastrous. This is a large-scale version, and it's getting worse and worse every day. We're hearing stories that are horror stories, absolute horror stories. And we can't let that happen to the United States of America it's not a question of who wins Republican Democrat Joe myself we can't let that happen to our country we can't be disgraced by having something like this happen so it will be hopefully cleared up, maybe soon. I hope soon. But it'll probably go through a process, a legal process. And as you know, I've claimed certain states, and he's claiming states, and we can both claim the states. But ultimately, I have a feeling judges are going to have to rule. But there's been a lot of shenanigans, and we can't stand for that in our country. Thank you very much.",
    "chunks": [
      {
        "end": 2,
        "text": " The President of the United States,",
        "start": 0
      },
      {
        "end": 4,
        "text": " Mr. President, I thank you very much.",
        "start": 2
      },
      {
        "end": 6,
        "text": " Thank you.",
        "start": 4
      },
      {
        "end": 7.4,
        "text": " Good evening.",
        "start": 6
      },
      {
        "end": 10.14,
        "text": " I'd like to provide the American people with an",
        "start": 7.4
      },
      {
        "end": 13.74,
        "text": " update on our efforts to protect the integrity of",
        "start": 10.14
      },
      {
        "end": 16.68,
        "text": " our very important 2020 election.",
        "start": 13.74
      },
      {
        "end": 21.36,
        "text": " If you count the legal votes, I easily win.",
        "start": 16.68
      },
      {
        "end": 28.1,
        "text": " If you count the illegal votes, they can try to steal the election from us if",
        "start": 21.36
      },
      {
        "end": 32.32,
        "text": " you count the votes that came in late we're looking at them very strongly but",
        "start": 28.1
      },
      {
        "end": 37.9,
        "text": " a lot of votes came in late I've already decisively won many critical states",
        "start": 32.32
      },
      {
        "end": 44.3,
        "text": " including massive victories in Florida Iowa Indiana Ohio to name just a few we",
        "start": 37.9
      },
      {
        "end": 45.84,
        "text": " won these and many other",
        "start": 44.3
      },
      {
        "end": 49.44,
        "text": " victories despite historic election interference from",
        "start": 45.84
      },
      {
        "end": 52.82,
        "text": " big media, big money, and big tech, as everybody saw.",
        "start": 49.44
      },
      {
        "end": 56.78,
        "text": " We won by historic numbers.",
        "start": 52.82
      },
      {
        "end": 59.46,
        "text": " And the pollsters got it knowingly wrong.",
        "start": 56.78
      },
      {
        "end": 60.96,
        "text": " They got it knowingly wrong.",
        "start": 59.46
      },
      {
        "end": 63.52,
        "text": " We had polls that were so ridiculous, and everybody",
        "start": 60.96
      },
      {
        "end": 64.36,
        "text": " knew it at the time.",
        "start": 63.52
      },
      {
        "end": 67.44,
        "text": " There was no blue wave that they predicted they thought there was going",
        "start": 64.36
      },
      {
        "end": 72.78,
        "text": " to be a big blue wave that was false it was done for suppression reasons but",
        "start": 67.44
      },
      {
        "end": 78.84,
        "text": " instead there was a big red wave and it's been properly acknowledged actually",
        "start": 72.78
      },
      {
        "end": 83.28,
        "text": " by the media they were I think very impressed but that was after the fact",
        "start": 78.84
      },
      {
        "end": 89.04,
        "text": " that doesn't do us any good we kept the Senate despite having twice as many seats to defend as",
        "start": 83.28
      },
      {
        "end": 96.82,
        "text": " Democrats and in a really much more competitive states we've we did a",
        "start": 89.04
      },
      {
        "end": 100.62,
        "text": " fantastic job with the Senate I think we're very proud of what's happened",
        "start": 96.82
      },
      {
        "end": 105.64,
        "text": " there and many more seats to defend. They spent almost $200 million on",
        "start": 100.62
      },
      {
        "end": 112.52,
        "text": " Senate races in South Carolina and Kentucky alone, two races, and hundreds of millions",
        "start": 105.64
      },
      {
        "end": 118.46,
        "text": " of dollars overall against us. At the national level, our opponents' major donors were Wall",
        "start": 112.52
      },
      {
        "end": 130.8,
        "text": " Street bankers and special interests. Our major donors were police officers farmers everyday citizens yet for the first time ever we lost zero races in the house I was",
        "start": 118.46
      },
      {
        "end": 135.58,
        "text": " talking to Kevin McCarthy today he said he couldn't believe it zero race is very",
        "start": 130.8
      },
      {
        "end": 141.54,
        "text": " unusual thing zero and actually won many new seats with I think many more in the",
        "start": 135.58
      },
      {
        "end": 146.94,
        "text": " way this was also the year of the Republican woman.",
        "start": 141.54
      },
      {
        "end": 149.5,
        "text": " More Republican women were elected to Congress",
        "start": 146.94
      },
      {
        "end": 151.58,
        "text": " than ever before.",
        "start": 149.5
      },
      {
        "end": 153.44,
        "text": " That's a great achievement.",
        "start": 151.58
      },
      {
        "end": 156.08,
        "text": " I won the largest share of non-white voters",
        "start": 153.44
      },
      {
        "end": 157.86,
        "text": " of any Republican in 60 years,",
        "start": 156.08
      },
      {
        "end": 162.06,
        "text": " including historic numbers of Latino,",
        "start": 157.86
      },
      {
        "end": 164.2,
        "text": " African American, Asian American,",
        "start": 162.06
      },
      {
        "end": 166.98,
        "text": " and Native American voters,",
        "start": 164.2
      },
      {
        "end": 170.24,
        "text": " the largest ever in our history.",
        "start": 166.98
      },
      {
        "end": 173.28,
        "text": " We grew our party by 4 million voters,",
        "start": 170.24
      },
      {
        "end": 177.34,
        "text": " the greatest turnout in Republican Party history.",
        "start": 173.28
      },
      {
        "end": 181.8,
        "text": " Democrats are the party of the big donors,",
        "start": 178.32
      },
      {
        "end": 184.58,
        "text": " the big media, the big tech, it seems,",
        "start": 181.8
      },
      {
        "end": 186.54,
        "text": " and Republicans have become the party of the American worker, the big media, the big tech, it seems, and Republicans have become the party",
        "start": 184.58
      },
      {
        "end": 189.5,
        "text": " of the American worker, and that's what's happened.",
        "start": 186.54
      },
      {
        "end": 192.94,
        "text": " And we're also, I believe, the party of inclusion.",
        "start": 189.5
      },
      {
        "end": 196.48,
        "text": " As everyone now recognizes, media polling was",
        "start": 192.94
      },
      {
        "end": 200.72,
        "text": " election interference, in the truest sense of that word,",
        "start": 196.48
      },
      {
        "end": 203.32,
        "text": " by powerful special interests.",
        "start": 200.72
      },
      {
        "end": 206.58,
        "text": " These really phony polls, I have to call them phony",
        "start": 203.32
      },
      {
        "end": 208.78,
        "text": " polls, fake polls, were designed to keep our",
        "start": 206.58
      },
      {
        "end": 214.44,
        "text": " voters at home, create the illusion of momentum for",
        "start": 208.78
      },
      {
        "end": 217.78,
        "text": " Mr. Biden, and diminish Republicans' ability to",
        "start": 214.44
      },
      {
        "end": 219.36,
        "text": " raise funds.",
        "start": 217.78
      },
      {
        "end": 221.66,
        "text": " They were what's called suppression polls.",
        "start": 219.36
      },
      {
        "end": 223.62,
        "text": " Everyone knows that now.",
        "start": 221.66
      },
      {
        "end": 226.56,
        "text": " And it's never been used to the extent",
        "start": 223.62
      },
      {
        "end": 231.44,
        "text": " that it's been used on this last election to highlight just a few examples the day before",
        "start": 226.56
      },
      {
        "end": 247.2,
        "text": " election quinnipiac which was wrong on every occasion that i know of had joe biden up by five points in Florida and they were off by eight point four points.",
        "start": 232.08
      },
      {
        "end": 250.82,
        "text": " And I won Florida easily, easily.",
        "start": 247.2
      },
      {
        "end": 256.18,
        "text": " So they had me losing Florida by a lot and I ended",
        "start": 250.82
      },
      {
        "end": 257.72,
        "text": " up winning Florida by a lot.",
        "start": 256.18
      },
      {
        "end": 260.46,
        "text": " Other than that, they were very accurate.",
        "start": 257.72
      },
      {
        "end": 267.28,
        "text": " They had him up four points in Ohio and they were off by 12.2 points.",
        "start": 260.46
      },
      {
        "end": 271.88,
        "text": " And they also won Ohio, great state of Ohio, very easily.",
        "start": 268.14
      },
      {
        "end": 276.18,
        "text": " The Washington Post said Biden up 17 points in Wisconsin,",
        "start": 272.94
      },
      {
        "end": 278.32,
        "text": " and it was basically even.",
        "start": 276.72
      },
      {
        "end": 281.08,
        "text": " They were off by about 17 points.",
        "start": 279.12
      },
      {
        "end": 284.8,
        "text": " And they knew that. They're not stupid people.",
        "start": 282.06
      },
      {
        "end": 287.34,
        "text": " They knew that. Suppression.",
        "start": 284.8
      },
      {
        "end": 293.26,
        "text": " There are now only a few states yet to be decided in the presidential race. The voting",
        "start": 287.34
      },
      {
        "end": 300.32,
        "text": " apparatus of those states are run in all cases by Democrats. We were winning in all the key",
        "start": 293.26
      },
      {
        "end": 305.34,
        "text": " locations by a lot, actually. And then our numbers started miraculously getting",
        "start": 300.32
      },
      {
        "end": 310.74,
        "text": " whittled away in secret, and they wouldn't allow",
        "start": 305.34
      },
      {
        "end": 313.38,
        "text": " legally permissible observers.",
        "start": 310.74
      },
      {
        "end": 315.88,
        "text": " We went to court in a couple of instances, and",
        "start": 313.38
      },
      {
        "end": 317.62,
        "text": " we were able to get the observers put in.",
        "start": 315.88
      },
      {
        "end": 319.86,
        "text": " And when the observers got there, they wanted them",
        "start": 317.62
      },
      {
        "end": 323.16,
        "text": " 60, 70 feet away, 80 feet, 100 feet away, or outside",
        "start": 319.86
      },
      {
        "end": 325.58,
        "text": " the building to observe people inside",
        "start": 323.16
      },
      {
        "end": 331.86,
        "text": " the building. And we won a case, a big case, and we have others happening. There are lots",
        "start": 325.58
      },
      {
        "end": 337.34,
        "text": " of litigation, even beyond our litigation. There's tremendous amount of litigation generally",
        "start": 331.86
      },
      {
        "end": 341.74,
        "text": " because of how unfair this process was. And I predicted that. I've been talking about",
        "start": 337.34
      },
      {
        "end": 347.68,
        "text": " mail-in voting for a long time it's it's really destroyed our system",
        "start": 341.74
      },
      {
        "end": 354.64,
        "text": " it's a corrupt system and it makes people corrupt even if they aren't by nature but they become",
        "start": 347.68
      },
      {
        "end": 361.2,
        "text": " corrupt it's too easy they want to find out how many votes they need and then they seem to be able",
        "start": 354.64
      },
      {
        "end": 365.14,
        "text": " to find them they wait and wait and then they find them and you to find them. They wait and wait, and then they find them.",
        "start": 361.2
      },
      {
        "end": 367.34,
        "text": " And you see that on election night.",
        "start": 365.14
      },
      {
        "end": 371.92,
        "text": " We were ahead in vote in North Carolina by a lot.",
        "start": 367.34
      },
      {
        "end": 374.02,
        "text": " Tremendous number of votes.",
        "start": 371.92
      },
      {
        "end": 378.58,
        "text": " And we're still ahead by a lot, but not as many,",
        "start": 374.02
      },
      {
        "end": 381.46,
        "text": " because they're finding ballots all of a sudden.",
        "start": 378.58
      },
      {
        "end": 382.92,
        "text": " Oh, we have some mail-in ballots.",
        "start": 381.46
      },
      {
        "end": 385.8,
        "text": " It's amazing how those mail-in ballots are so one-sided, too.",
        "start": 382.92
      },
      {
        "end": 389.14,
        "text": " I know that it's supposed to be to the advantage of",
        "start": 385.8
      },
      {
        "end": 393.04,
        "text": " the Democrats, but in all cases, they're so one-sided.",
        "start": 389.14
      },
      {
        "end": 396.22,
        "text": " We were up by nearly 700,000 votes in",
        "start": 393.04
      },
      {
        "end": 396.92,
        "text": " Pennsylvania.",
        "start": 396.22
      },
      {
        "end": 399.22,
        "text": " I won Pennsylvania by a lot.",
        "start": 396.92
      },
      {
        "end": 402.82,
        "text": " And that gets whittled down to, I think they said,",
        "start": 399.22
      },
      {
        "end": 405.18,
        "text": " now we're up by 90,000 votes.",
        "start": 402.82
      },
      {
        "end": 407.24,
        "text": " And they'll keep coming and coming and coming.",
        "start": 405.18
      },
      {
        "end": 409.04,
        "text": " They find them all over.",
        "start": 407.24
      },
      {
        "end": 411.74,
        "text": " And they don't want us to have any observers.",
        "start": 409.04
      },
      {
        "end": 413.18,
        "text": " Although we want a court case.",
        "start": 411.74
      },
      {
        "end": 415.52,
        "text": " The judge said you have to have observers.",
        "start": 413.18
      },
      {
        "end": 417.68,
        "text": " Likewise in Georgia. And they're appealing.",
        "start": 415.52
      },
      {
        "end": 419.56,
        "text": " Actually, they're appealing.",
        "start": 417.68
      },
      {
        "end": 421.82,
        "text": " We want a case that we want people to watch,",
        "start": 419.56
      },
      {
        "end": 423.62,
        "text": " and we want observers.",
        "start": 421.82
      },
      {
        "end": 425.68,
        "text": " And they're actually appealing, which is sort of interesting. I wonder why they'd appeal, that all we want people to watch and we want observers. And they're actually appealing, which is sort",
        "start": 423.62
      },
      {
        "end": 426.34,
        "text": " of interesting.",
        "start": 425.68
      },
      {
        "end": 429.04,
        "text": " I wonder why that appeal, that all we want to do is",
        "start": 426.34
      },
      {
        "end": 434.22,
        "text": " have people watch as they do the vote tabulations.",
        "start": 429.04
      },
      {
        "end": 438.32,
        "text": " Likewise, in Georgia, I won by a lot, a lot, with a",
        "start": 434.22
      },
      {
        "end": 442.82,
        "text": " lead of over getting close to 300,000 votes on",
        "start": 438.32
      },
      {
        "end": 445.08,
        "text": " election night in Georgia.",
        "start": 442.82
      },
      {
        "end": 447.7,
        "text": " And, by the way, it got whittled down, and now",
        "start": 445.08
      },
      {
        "end": 450.74,
        "text": " it's getting to be to a point where I'll go from",
        "start": 447.7
      },
      {
        "end": 454.88,
        "text": " winning by a lot to perhaps being even down a",
        "start": 450.74
      },
      {
        "end": 455.98,
        "text": " little bit.",
        "start": 454.88
      },
      {
        "end": 458.92,
        "text": " In Georgia, a pipe burst in a faraway location,",
        "start": 455.98
      },
      {
        "end": 462.26,
        "text": " totally unrelated to the location of what was",
        "start": 458.92
      },
      {
        "end": 462.92,
        "text": " happening.",
        "start": 462.26
      },
      {
        "end": 466.54,
        "text": " And they stopped counting for four hours.",
        "start": 462.92
      },
      {
        "end": 469.04,
        "text": " And a lot of things happened.",
        "start": 466.54
      },
      {
        "end": 471.94,
        "text": " The election apparatus in Georgia is run by Democrats.",
        "start": 469.04
      },
      {
        "end": 476.76,
        "text": " We also had margins of 300,000 in Michigan.",
        "start": 471.94
      },
      {
        "end": 479.66,
        "text": " We're way up in Michigan, won the state.",
        "start": 476.76
      },
      {
        "end": 485,
        "text": " And in Wisconsin, we did likewise fantastically well.",
        "start": 479.66
      },
      {
        "end": 488,
        "text": " And that got whittled down.",
        "start": 486.14
      },
      {
        "end": 490.64,
        "text": " In every case, they got whittled down.",
        "start": 488
      },
      {
        "end": 493.12,
        "text": " Today, we're on track to win Arizona.",
        "start": 490.64
      },
      {
        "end": 496.92,
        "text": " We only need to carry, I guess, 55 percent",
        "start": 493.12
      },
      {
        "end": 500.38,
        "text": " of the remaining vote, 55 percent margins.",
        "start": 496.92
      },
      {
        "end": 504.32,
        "text": " And that's a margin that we've significantly exceeded.",
        "start": 500.38
      },
      {
        "end": 505.5,
        "text": " So we'll see what happens with that,",
        "start": 504.32
      },
      {
        "end": 508.84,
        "text": " but we're on track to do okay in Arizona.",
        "start": 505.5
      },
      {
        "end": 511.44,
        "text": " Our goal is to defend the integrity of the election.",
        "start": 508.84
      },
      {
        "end": 514.28,
        "text": " We'll not allow the corruption to steal",
        "start": 511.44
      },
      {
        "end": 517.66,
        "text": " such an important election or any election for that matter.",
        "start": 514.28
      },
      {
        "end": 522.92,
        "text": " And we can't allow silence, anybody to silence our voters",
        "start": 517.66
      },
      {
        "end": 524.66,
        "text": " and manufacture results.",
        "start": 522.92
      },
      {
        "end": 525.4,
        "text": " I've never had.",
        "start": 524.66
      },
      {
        "end": 528.18,
        "text": " I've been doing a lot of public things for a long time.",
        "start": 525.4
      },
      {
        "end": 531.18,
        "text": " I've never had anything that's been as inspirational",
        "start": 528.18
      },
      {
        "end": 536.42,
        "text": " by people calling, talking, sending things to us.",
        "start": 531.18
      },
      {
        "end": 542.28,
        "text": " I've never seen such love and such affection",
        "start": 536.42
      },
      {
        "end": 547.04,
        "text": " and such spirit as I've seen for this people know",
        "start": 542.28
      },
      {
        "end": 550.64,
        "text": " what's happening and they see what's happening and it's before their eyes and",
        "start": 547.04
      },
      {
        "end": 555.4,
        "text": " there are many instances which will be reported very shortly there's tremendous",
        "start": 550.64
      },
      {
        "end": 559.32,
        "text": " litigation going on and this is a case where they're trying to steal an",
        "start": 555.4
      },
      {
        "end": 563.48,
        "text": " election they're trying to rig an election and we can't let that happen",
        "start": 559.32
      },
      {
        "end": 568.84,
        "text": " Detroit and Philadelphia known as two of the most corrupt political places anywhere in our country,",
        "start": 563.48
      },
      {
        "end": 575.78,
        "text": " easily cannot be responsible for engineering the outcome of a presidential race,",
        "start": 568.84
      },
      {
        "end": 577.56,
        "text": " a very important presidential race.",
        "start": 575.78
      },
      {
        "end": 584.22,
        "text": " In Pennsylvania, Democrats have gone to the state Supreme Court to try and ban our election observers,",
        "start": 577.56
      },
      {
        "end": 586.96,
        "text": " and very strongly now we won",
        "start": 584.22
      },
      {
        "end": 591.84,
        "text": " the case but they're they're going forward they don't want anybody in there they don't want",
        "start": 586.96
      },
      {
        "end": 600.16,
        "text": " anybody watching them as they count the ballots and i can't imagine why there's absolutely no",
        "start": 591.84
      },
      {
        "end": 606.54,
        "text": " legitimate reason why they would not want to have people watching this",
        "start": 600.16
      },
      {
        "end": 611.4,
        "text": " process because if it's straight they would be they should be proud of it",
        "start": 606.54
      },
      {
        "end": 617.88,
        "text": " instead they're trying obviously to commit fraud there's no question about",
        "start": 611.4
      },
      {
        "end": 624.06,
        "text": " that in Philadelphia observers have been kept far away very far away so far that",
        "start": 617.88
      },
      {
        "end": 627.32,
        "text": " people are using binoculars to try and see.",
        "start": 624.06
      },
      {
        "end": 633.24,
        "text": " And there's been tremendous problems caused. They put paper on all of the windows so you",
        "start": 627.32
      },
      {
        "end": 639.78,
        "text": " can't see in, and the people that are banned are very unhappy and become somewhat violent.",
        "start": 633.24
      },
      {
        "end": 646.66,
        "text": " The Eleventh Circuit ruled that in Georgia the votes have been in by the election day that",
        "start": 639.78
      },
      {
        "end": 650.56,
        "text": " they should be in by election day and they weren't votes are coming in after",
        "start": 646.66
      },
      {
        "end": 655.72,
        "text": " election day and they had a ruling already that you have to have the votes",
        "start": 650.56
      },
      {
        "end": 659.32,
        "text": " in by election day to the best of my knowledge votes should be in by election",
        "start": 655.72
      },
      {
        "end": 664.56,
        "text": " day and they didn't do that Democrat officials never believed they could win",
        "start": 659.32
      },
      {
        "end": 665.88,
        "text": " this election, honestly.",
        "start": 664.56
      },
      {
        "end": 667.18,
        "text": " I really believe that.",
        "start": 665.88
      },
      {
        "end": 669.08,
        "text": " That's why they did the mail-in ballots,",
        "start": 667.18
      },
      {
        "end": 673.68,
        "text": " where there's tremendous corruption and fraud going on.",
        "start": 669.08
      },
      {
        "end": 677.56,
        "text": " That's why they mailed out tens of millions of unsolicited ballots",
        "start": 673.68
      },
      {
        "end": 681.08,
        "text": " without any verification measures whatsoever.",
        "start": 677.56
      },
      {
        "end": 685,
        "text": " And I've told everybody that these things would happen.",
        "start": 681.08
      },
      {
        "end": 687,
        "text": " Because I've seen it happen.",
        "start": 685
      },
      {
        "end": 694,
        "text": " I watched a lot of different elections before they decided to go with this big, massive election,",
        "start": 687
      },
      {
        "end": 699,
        "text": " with tens of millions of ballots going out to everybody.",
        "start": 694
      },
      {
        "end": 701,
        "text": " In many cases, totally unsolicited.",
        "start": 699
      },
      {
        "end": 704,
        "text": " This was unprecedented in American history.",
        "start": 701
      },
      {
        "end": 707.54,
        "text": " This was by design, despite years of claiming to care",
        "start": 704
      },
      {
        "end": 709.98,
        "text": " about the election security.",
        "start": 707.54
      },
      {
        "end": 712.88,
        "text": " They refused to include any requirement to verify",
        "start": 709.98
      },
      {
        "end": 716.68,
        "text": " signatures, identities, or even determine whether",
        "start": 712.88
      },
      {
        "end": 719.38,
        "text": " they're eligible or ineligible to vote.",
        "start": 716.68
      },
      {
        "end": 720.26,
        "text": " People are walking in there.",
        "start": 719.38
      },
      {
        "end": 721.28,
        "text": " They have no idea.",
        "start": 720.26
      },
      {
        "end": 723.62,
        "text": " They're just taking numbers.",
        "start": 721.28
      },
      {
        "end": 726.94,
        "text": " They're writing down things, the workers, and doing a lot of bad things.",
        "start": 723.62
      },
      {
        "end": 730,
        "text": " And we have a lot of information coming and litigation",
        "start": 726.94
      },
      {
        "end": 733.78,
        "text": " that you'll see that will shake even you people up.",
        "start": 730
      },
      {
        "end": 736.88,
        "text": " And you've seen it all. The officials overseeing the counting",
        "start": 733.78
      },
      {
        "end": 738.58,
        "text": " in Pennsylvania and other key states",
        "start": 736.88
      },
      {
        "end": 741.82,
        "text": " are all part of a corrupt Democrat machine",
        "start": 738.58
      },
      {
        "end": 743.86,
        "text": " that you've written about and for a long time",
        "start": 741.82
      },
      {
        "end": 745.2,
        "text": " you've been writing about the corrupt Democrat machine that you've written about and for a long time you've been writing about",
        "start": 743.86
      },
      {
        "end": 757.04,
        "text": " the corrupt democrat machine i went to school there and i know a lot about it hasn't changed a long time ago and hasn't changed it's gotten worse in pennsylvania partisan democrats have",
        "start": 751.52
      },
      {
        "end": 766.14,
        "text": " allowed ballots in the state to be received three days after the election and we think much more than that. And they are counting those without even",
        "start": 757.04
      },
      {
        "end": 771.44,
        "text": " postmarks or any identification whatsoever.",
        "start": 766.14
      },
      {
        "end": 773.14,
        "text": " So you don't have postmarks, you don't have",
        "start": 771.44
      },
      {
        "end": 775.14,
        "text": " identification.",
        "start": 773.14
      },
      {
        "end": 777.22,
        "text": " There have been a number of disturbing",
        "start": 775.14
      },
      {
        "end": 779.36,
        "text": " irregularities across the nation.",
        "start": 777.22
      },
      {
        "end": 783.96,
        "text": " Our campaign has been denied access to observe",
        "start": 779.36
      },
      {
        "end": 786.2,
        "text": " any counting in Detroit.",
        "start": 783.96
      },
      {
        "end": 790.88,
        "text": " Detroit is another place and I wouldn't say has the",
        "start": 786.2
      },
      {
        "end": 794.22,
        "text": " best reputation for election integrity.",
        "start": 790.88
      },
      {
        "end": 797.28,
        "text": " Poll workers in Michigan were duplicating ballots.",
        "start": 794.22
      },
      {
        "end": 799.52,
        "text": " But when our observers attempted to challenge",
        "start": 797.28
      },
      {
        "end": 802.48,
        "text": " the activity, those poll workers jumped in front of",
        "start": 799.52
      },
      {
        "end": 804.56,
        "text": " the volunteers to block their view so that they",
        "start": 802.48
      },
      {
        "end": 807.36,
        "text": " couldn't see what they were doing.",
        "start": 804.56
      },
      {
        "end": 810.92,
        "text": " And it became a little bit dangerous.",
        "start": 807.36
      },
      {
        "end": 816.62,
        "text": " One major hub for counting ballots in Detroit covered up the windows again with large pieces",
        "start": 810.92
      },
      {
        "end": 818.72,
        "text": " of cardboard.",
        "start": 816.62
      },
      {
        "end": 822.18,
        "text": " And so they wanted to protect and block the counting area.",
        "start": 818.72
      },
      {
        "end": 826.3,
        "text": " They didn't want anybody seeing the counting, even though these were observers who were legal observers",
        "start": 822.18
      },
      {
        "end": 828.08,
        "text": " that were supposed to be there.",
        "start": 826.3
      },
      {
        "end": 830.88,
        "text": " In Detroit, there were hours of unexplained delay",
        "start": 828.08
      },
      {
        "end": 833.92,
        "text": " in delivering many of the votes for counting.",
        "start": 830.88
      },
      {
        "end": 837.26,
        "text": " The final batch did not arrive until 4 in the morning,",
        "start": 833.92
      },
      {
        "end": 840.58,
        "text": " and even though the polls closed at 8 o'clock,",
        "start": 837.26
      },
      {
        "end": 842.98,
        "text": " so they brought it in and the batches came in,",
        "start": 840.58
      },
      {
        "end": 849.14,
        "text": " and nobody knew where they came from. we've also been denied access to observe in critical places in",
        "start": 842.98
      },
      {
        "end": 855.3,
        "text": " Georgia and multiple swing states counting was halted for hours and hours",
        "start": 849.14
      },
      {
        "end": 860.44,
        "text": " on election night with results withheld from major Democrat run locations only",
        "start": 855.3
      },
      {
        "end": 865.94,
        "text": " to appear later and they certainly appeared and they all had the name Biden",
        "start": 860.44
      },
      {
        "end": 870.38,
        "text": " on them or just about all I think almost all they all had the name Biden on them",
        "start": 865.94
      },
      {
        "end": 876.62,
        "text": " which is a little strange I challenge Joe and every Democrat to clarify that they",
        "start": 870.38
      },
      {
        "end": 881.62,
        "text": " only want legal votes because they talk about votes and I think they should use",
        "start": 876.62
      },
      {
        "end": 885.94,
        "text": " the word legal legal votes we want every legal vote counted and I think they should use the word legal, legal votes. We want every legal vote counted, and I want every",
        "start": 881.62
      },
      {
        "end": 886.94,
        "text": " legal vote counted.",
        "start": 885.94
      },
      {
        "end": 889.4,
        "text": " We want openness and transparency.",
        "start": 886.94
      },
      {
        "end": 891.34,
        "text": " No secret count rooms.",
        "start": 889.4
      },
      {
        "end": 892.78,
        "text": " No mystery ballots.",
        "start": 891.34
      },
      {
        "end": 897.02,
        "text": " No illegal votes being cast after Election Day.",
        "start": 892.78
      },
      {
        "end": 899.06,
        "text": " You have Election Day, and the laws are very strong",
        "start": 897.02
      },
      {
        "end": 899.72,
        "text": " on that.",
        "start": 899.06
      },
      {
        "end": 902.32,
        "text": " You have an Election Day, and they don't want votes",
        "start": 899.72
      },
      {
        "end": 903.8,
        "text": " cast after Election Day.",
        "start": 902.32
      },
      {
        "end": 905.84,
        "text": " And they want the process to be an honest",
        "start": 903.8
      },
      {
        "end": 912.88,
        "text": " one it's so important we want an honest election we want an honest count and we want honest people",
        "start": 905.84
      },
      {
        "end": 919.28,
        "text": " working back there because it's a very important job so that's the way this country is going to",
        "start": 912.88
      },
      {
        "end": 927.58,
        "text": " win that's the way the united states will win and we think we will win the election very easily. We think there's going to be a lot of litigation",
        "start": 919.28
      },
      {
        "end": 930.38,
        "text": " because we have so much evidence, so much proof.",
        "start": 927.58
      },
      {
        "end": 932.72,
        "text": " And it's going to end up perhaps",
        "start": 930.38
      },
      {
        "end": 935.04,
        "text": " at the highest court in the land.",
        "start": 932.72
      },
      {
        "end": 936.02,
        "text": " We'll see.",
        "start": 935.04
      },
      {
        "end": 937.86,
        "text": " But we think there'll be a lot of litigation",
        "start": 936.02
      },
      {
        "end": 942.02,
        "text": " because we can't have an election stolen like this.",
        "start": 937.86
      },
      {
        "end": 944.9,
        "text": " And I tell you, I have been talking about this",
        "start": 942.02
      },
      {
        "end": 945.38,
        "text": " for many months with all of you. stolen like this. And I tell you, I have been talking about this for",
        "start": 944.9
      },
      {
        "end": 947.24,
        "text": " many months with all of you.",
        "start": 945.38
      },
      {
        "end": 949.64,
        "text": " And I've said very strongly that mail-in",
        "start": 947.24
      },
      {
        "end": 951.72,
        "text": " ballots are going to end up being a disaster.",
        "start": 949.64
      },
      {
        "end": 953.44,
        "text": " Small elections were a disaster.",
        "start": 951.72
      },
      {
        "end": 957.98,
        "text": " Small, very easy-to-handle elections were disastrous.",
        "start": 953.44
      },
      {
        "end": 960.36,
        "text": " This is a large-scale version, and it's getting",
        "start": 957.98
      },
      {
        "end": 961.42,
        "text": " worse and worse every day.",
        "start": 960.36
      },
      {
        "end": 964.12,
        "text": " We're hearing stories that are horror stories,",
        "start": 961.42
      },
      {
        "end": 968.94,
        "text": " absolute horror stories. And we can't let that happen to the United States of",
        "start": 964.12
      },
      {
        "end": 974.88,
        "text": " America it's not a question of who wins Republican Democrat Joe myself we can't",
        "start": 968.94
      },
      {
        "end": 979.24,
        "text": " let that happen to our country we can't be disgraced by having something like",
        "start": 974.88
      },
      {
        "end": 985.48,
        "text": " this happen so it will be hopefully cleared up, maybe soon. I hope soon.",
        "start": 979.24
      },
      {
        "end": 988.58,
        "text": " But it'll probably go through a process, a legal process.",
        "start": 985.48
      },
      {
        "end": 991.22,
        "text": " And as you know, I've claimed certain states,",
        "start": 988.58
      },
      {
        "end": 994.02,
        "text": " and he's claiming states, and we can both claim the states.",
        "start": 991.22
      },
      {
        "end": 995.64,
        "text": " But ultimately, I have a feeling judges",
        "start": 994.02
      },
      {
        "end": 997.48,
        "text": " are going to have to rule.",
        "start": 995.64
      },
      {
        "end": 999.08,
        "text": " But there's been a lot of shenanigans,",
        "start": 997.48
      },
      {
        "end": 1001.82,
        "text": " and we can't stand for that in our country.",
        "start": 999.08
      },
      {
        "end": 1002.96,
        "text": " Thank you very much.",
        "start": 1001.82
      }
    ]
  },
  "started_at": "2023-11-13T21:38:24.429744Z",
  "status": "succeeded",
  "urls": {
    "get": "https://api.replicate.com/v1/predictions/63xdz4tbehirfhrknude3zauya",
    "cancel": "https://api.replicate.com/v1/predictions/63xdz4tbehirfhrknude3zauya/cancel"
  },
  "version": "07f09327d2e80ebc3b99056ed238bf4519505ebad13c5098718b0fff3cf2d012"
}

*/



