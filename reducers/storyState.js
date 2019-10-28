import Immutable from 'immutable';

const initialState = Immutable.Map({
    story:{
        branchInitial: [
            {
                type:"text",
                data: "Hi there! This is Stride and I am a conversation that live in an app."
            },
            {
                type:"input",
                multi: false,
                data: "What's your name?",
                action: "_this.addBlock('Welcome ' + input  + '! Thanks for checking us out.')"
            },
            {
                type: "options",
                data: "Doing well today?",
                title: "Choose an Option",
                options: [
                    {
                        data: "Been better",
                        type: "function",
                        action: "_this.addBlock('Maybe this will make you feel better.')",
                    },
                    {
                        data: "Meow",
                        type: "function",
                        action: "_this.addBlock('Glad to hear it!')"
                    }
                ]
            },
            {
                type: "image",
                data: "https://media0.giphy.com/media/Ze4XyGdimqEAo/giphy.gif"
            },
            {
                type: "text",
                data: "Let me tell you more about Stride."
            },
            {
                type: "text",
                data: "With Stride you can create interactive Apps and Landing Pages."
            },
            {
                type: "options",
                data: "It's easy as writing a story for your users.",
                title: "Choose an Option",
                options: [
                    {
                        data: "That sounds amazing!",
                        type: "function",
                        action: "_this.addBlock('I know right?')"
                    },
                    {
                        data: "Is it difficult to use?",
                        type: "function",
                        action: "_this.addBlock('No way! It is really quite simple.')"
                    }
                ]
            },
            {
                type: "text",
                data: "With basic JSON knowledge, you can easily write our own Stride Story."
            },
            {
                type: "text",
                data: "Ready to get started? Check out our Github Link."
            },
            {
                type: "link",
                data: "https://github.com/Technopathic/Stride.git",
                text: "Stride on Github"
            },
            {
                type: "text",
                data: "See you around!"
            }
        ],
    }
});

export default (state = initialState, action) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
}