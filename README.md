# LikeMeetings

![Logo](https://i.ibb.co/0FJYfwb/Capture.png)

## Problem: When you're in a group meeting, oftentimes people want to give quick feedback on something someone said. But it's awkward to unmute just to say "plus one to that." Meanwhile, the speaker / presenter is wondering the entire time "what do people think?" 

## Solution: A Chrome extension that adds the **like** functionality for Google Hangouts and Google Meets. 

## How it Works: 

The extension allows you to broadcast thumbs-up emojis to people in your meeting by pressing CTRL + L. 

Everyone who's in your current Hangouts / Meet meeting (per the ID in the URL) will get a thumbs-up emoji across their screen. 

You can also set your name, so that the thumbs-up emoji is labeled with your name for everyone else on the call.

## Privacy and Security 
To simplify development, this Chrome extension does not require authentication, so all data is publicly accessible. However, the development team believes that this is okay from a security standpoint, because no sensitive info is processed / stored. 


Specifically, this Chrome extension looks at and stores the following data: 
* the timestamp for each time you press "CTRL+L" 
* the meeting ID of your meeting 
* any label "your name, etc" that you choose to broadcast to the meeting 

The chrome extension does not look at or store any other data, including your google account, or contents of the chat, etc. 

## Future Features 
Future development may include: 
* Additional emoji 
* Support for other platforms 
* Authentication 

## Contribution 
Any contribution is welcome. 



