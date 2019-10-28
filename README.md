<p align="center">
  <img width="200" height="200" src="https://storage.googleapis.com/castapp-fbe0d.appspot.com/cache/stridelogo512.png">
</p>

## Stride - Conversational Apps
Stride is a bot designed to give your apps a more interactive and attractive feel. With Stride you can make each app seem like a conversation between your service and your consumers. Stride is completely customizable from the style to story.

[Stride Web Demo](https://stride-1984c.web.app/)

## Screenshots
![Stride Demo](https://storage.googleapis.com/castapp-fbe0d.appspot.com/cache/StrideDemoVideo2.gif)

## Getting Started
To quickly get started, fork this repo or clone onto your local computer. Then run npm install to install all of the necessary libraries. You can run Stride on your Android or iOS device.

```
git clone https://github.com/Technopathic/Stride.git
cd stride
npm install
react-native run-android || react-native run-ios
```

From there you can then edit the storyState.js file inside of the reducers folder. Each JSON object within the array is a chat block. You have a set of available types of chat blocks to display using Stride.

* Text
* Image
* Options
* Link
* Input
* Image Input
* Lists
* Date / Time

You also have the ability to attach functions to each of these interactions and additionally create diverging branches based on your story line.