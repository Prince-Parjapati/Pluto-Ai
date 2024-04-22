async function chatbot(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1 ",
        {
            headers: {
                Authorization: 'Bearer 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',
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();
	return result[0]?.generated_text?.trim() || '';
}

async function imgGen(tdata) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
            {
                headers: { Authorization: `Bearer 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` },
                method: "POST",
                body: JSON.stringify({"inputs": tdata}),
            }
        );
        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw new Error('Failed to fetch image');
    }
}

sendBtn.addEventListener("click", async () => {
    const questionInput = document.getElementById("questionInput").value;
    document.getElementById("questionInput").value = "";
    document.querySelector(".chatHome").style.display = "none";
    document.querySelector(".chatBox").style.display = "block";
    document.querySelector("#solution").innerHTML = "Loading...";

    question.innerHTML = questionInput;

    const chatContainer = document.querySelector(".left");

    // Create a new <div> element for the chat message
    const divElement = document.createElement("div");
    divElement.classList.add("chats", "flex", "flex-col", "justify-start", "items-center", "space-y-2", "py-3");

    const innerDivElement = document.createElement("div");
    innerDivElement.classList.add("chat", "space-x-2", "opacity-80", "w-[90%]", "px-5", "py-2", "rounded-md", "hover:bg-gray-600", "cursor-pointer", "flex", "justify-start", "items-center");
    innerDivElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        </svg>
        <span class="overflow-hidden">${questionInput}</span>
    `;
    divElement.appendChild(innerDivElement);

    // Append the new chat <div> to the chat container
    chatContainer.appendChild(divElement);

    try {
        // Call the chatbot function and wait for response
        const response = await chatbot({ "inputs": questionInput });
        const formattedResponse = response.replace(/\n/g, "<br>");
        document.querySelector("#solution").innerHTML = formattedResponse;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        document.querySelector("#solution").innerHTML = "Error occurred while fetching response.";
    }
});

newChat.addEventListener("click", ()=>{
    document.querySelector(".chatHome").style.display = "block";
    document.querySelector(".chatBox").style.display = "none";
})

newButton.addEventListener("click", async ()=>{
    const questionInput = document.getElementById("questionInput").value;
    document.getElementById("questionInput").value = "";
    document.querySelector(".chatHome").style.display = 'none';
    document.querySelector(".box").style.display = 'none';
    document.querySelector(".chatBox").style.display = 'block';
    document.querySelector(".image").style.display = 'block';

    question.innerHTML = questionInput;

    const chatContainer = document.querySelector(".left");

    // Create a new <div> element for the chat message
    const divElement = document.createElement("div");
    divElement.classList.add("chats", "flex", "flex-col", "justify-start", "items-center", "space-y-2", "py-3");

    const innerDivElement = document.createElement("div");
    innerDivElement.classList.add("chat", "space-x-2", "opacity-80", "w-[90%]", "px-5", "py-2", "rounded-md", "hover:bg-gray-600", "cursor-pointer", "flex", "justify-start", "items-center");
    innerDivElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        </svg>
        <span class="overflow-hidden">${questionInput}</span>
    `;
    divElement.appendChild(innerDivElement);

    // Append the new chat <div> to the chat container
    chatContainer.appendChild(divElement);

    const response = await imgGen(questionInput);
    const objUrl = URL.createObjectURL(response);
    document.querySelector('#genImg').src = objUrl;

})