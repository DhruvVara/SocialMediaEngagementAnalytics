const sendBtn = document.getElementById("user-input");
sendBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let userMessage = inputField.value.trim();


    if (userMessage.trim() !== "") {
        let chatArea = document.getElementById("chat-area");

        let userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("flex", "justify-end", "space-x-2");

        let userBubble = document.createElement("div");
        userBubble.classList.add(
            "bg-green-500",
            "text-white",
            "p-3",
            "rounded-lg",
            "max-w-[75%]"
        );
        userBubble.innerText = userMessage;

        userMessageDiv.appendChild(userBubble);

        chatArea.appendChild(userMessageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;

        inputField.value = "";

        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("flex", "justify-start");
        loadingDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <img src="./chatbot.png" alt="AI" class="rounded-full w-10 h-10">
                    <div class="flex space-x-2">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            `;
        chatArea.appendChild(loadingDiv);

        try {
            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputValue: inputValue,
                    inputType: 'chat',
                    outputType: 'chat',
                    stream: false
                })
            });

            // const data2 = "Here's a summary of the data you provided:\n\n- The dataset covers social media engagement for three post types: Carousel, Static Image, and Reels, from October to December 2024.\n- Static Image posts received the highest number of likes, with a maximum of 291.\n- Reels posts generated the most comments, with a peak of 143.\n- The week of December 8th saw the highest engagement for Static Images.\n- Carousel posts had moderate engagement, with a maximum of 289 likes.\n\nThis data can be used to analyze trends and optimize social media strategies for different post types."

            const data = await response.json();
            console.log(data.message.text)
            if (response.ok && data.message) {
                loadingDiv.remove();
                let botMessageDiv = document.createElement("div");
                botMessageDiv.classList.add("flex", "justify-start", "space-x-2");
                let botBubble = document.createElement("div");
                botBubble.classList.add(
                    "bg-gray-200",
                    "text-gray-700",
                    "p-3",
                    "rounded-lg",
                    "max-w-[75%]",
                    "flex",
                    "flex-wrap",
                    "break-words"
                );
                botBubble.innerText = data.message.text;
                botMessageDiv.appendChild(botBubble);
                chatArea.appendChild(botMessageDiv);
                chatArea.scrollTop = chatArea.scrollHeight;
            }
            // else {
            //     responseDiv.innerHTML = `Error: ${data.error || 'An error occurred'}`;
            // }
        } catch (error) {
            // responseDiv.innerHTML = `Error: ${error.message}`;
            console.log(`Error: ${error.message}`)
        }

        // setTimeout(() => {
        //     loadingDiv.remove();
        //     let botMessageDiv = document.createElement("div");
        //     botMessageDiv.classList.add("flex", "justify-start", "space-x-2");

        //     let botBubble = document.createElement("div");
        //     botBubble.classList.add(
        //         "bg-gray-200",
        //         "text-gray-700",
        //         "p-3",
        //         "rounded-lg",
        //         "max-w-[75%]",
        //         "flex",
        //         "flex-wrap",
        //         "break-words"
        //     );
        //     botBubble.innerText = userMessage;

        //     botMessageDiv.appendChild(botBubble);

        //     chatArea.appendChild(botMessageDiv);
        //     chatArea.scrollTop = chatArea.scrollHeight;
        // }, 1000);
    }
}
