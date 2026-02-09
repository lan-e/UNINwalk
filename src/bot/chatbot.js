// Store the chain instance and retriever

let initializationStatus = {
  isInitializing: false,
  isInitialized: false,
  status: "idle",
  error: null,
};

// Chat history management
const CHAT_HISTORY_KEY = "unin_chat_history";

export function saveChatHistory(messages) {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat history:", error);
  }
}

export function loadChatHistory() {
  try {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return [];
  }
}

export function clearChatHistory() {
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear chat history:", error);
  }
}

export async function getChatbotAnswer(message, options = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const response_json = await response.json();
    const answer = response_json.message;

    // If evaluation is requested, call the evaluate endpoint
    if (options.evaluate) {
      try {
        const evaluation = await evaluateChat([
          { question: message, ground_truth: options.groundTruth },
        ]);
        return { answer, evaluation: evaluation.aggregate_scores };
      } catch (evalError) {
        console.error("Evaluation failed:", evalError);
        return { answer };
      }
    }

    return { answer };
  } catch (error) {
    console.error("Error getting answer:", error);
    throw error;
  }
}

export async function getChatbotAnswerStream(message, onToken, options = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  let fullAnswer = "";

  try {
    const response = await fetch(`${apiUrl}/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Stream request failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const token = line.slice(6);
          if (token === "[DONE]") break;
          fullAnswer += token;
          onToken(token, fullAnswer);
        }
      }
    }

    // If evaluation is requested, call the evaluate endpoint after streaming completes
    if (options.evaluate) {
      try {
        if (options.onEvaluationStart) {
          options.onEvaluationStart();
        }
        const evaluation = await evaluateChat([
          { question: message, ground_truth: options.groundTruth },
        ]);
        return { answer: fullAnswer, evaluation: evaluation.aggregate_scores };
      } catch (evalError) {
        console.error("Evaluation failed:", evalError);
        return { answer: fullAnswer };
      }
    }

    return { answer: fullAnswer };
  } catch (error) {
    console.error("Error getting streamed answer:", error);
    throw error;
  }
}

export async function evaluateChat(samples) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/chat/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ samples }),
    });

    if (!response.ok) {
      throw new Error(`Evaluation failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error evaluating chat:", error);
    throw error;
  }
}

// Get current initialization status
export function getInitializationStatus() {
  return initializationStatus;
}
