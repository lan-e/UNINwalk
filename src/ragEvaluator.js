// evaluators/ragEvaluator.js
import { ChatGroq } from "@langchain/groq";

class RAGEvaluator {
  constructor(apiKey) {
    this.llm = new ChatGroq({
      apiKey: apiKey,
      model: "llama-3.3-70b-versatile",
      temperature: 0,
    });
  }

  /**
   * Faithfulness: Mjeri koliko je odgovor konzistentan s danim kontekstom
   */
  async evaluateFaithfulness(question, answer, context) {
    const prompt = `Evaluiraj koliko je odgovor vjeran danom kontekstu. Ocijeni od 0 do 1 gdje:
0.0 = Potpuno proturječi kontekstu
0.25 = Uglavnom proturječi kontekstu  
0.5 = Neutralno/djelomično podržano
0.75 = Uglavnom podržano kontekstom
1.0 = Potpuno podržano kontekstom

Pitanje: ${question}
Kontekst: ${context}
Odgovor: ${answer}

Odgovori u JSON formatu:
{
  "score": <broj 0-1 s dvije decimale>,
  "reasoning": "<objašnjenje na hrvatskom>",
  "supported_claims": ["<tvrdnje podržane kontekstom>"],
  "unsupported_claims": ["<tvrdnje koje nisu podržane kontekstom>"]
}`;

    try {
      const response = await this.llm.invoke(prompt);
      const content =
        typeof response === "string" ? response : response.content;
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        // Normalize score to 0-1 range if it's in 1-5 range
        if (result.score > 1) {
          result.score = (result.score - 1) / 4; // Convert 1-5 to 0-1
        }
        // Ensure score is between 0 and 1
        result.score = Math.max(0, Math.min(1, result.score));
        return result;
      }
      throw new Error("Invalid JSON response");
    } catch (error) {
      console.error("Error evaluating faithfulness:", error);
      return {
        score: 0,
        reasoning: "Greška u evaluaciji: " + error.message,
        supported_claims: [],
        unsupported_claims: [],
      };
    }
  }

  /**
   * Answer Relevancy: Mjeri koliko je odgovor relevantan za pitanje
   */
  async evaluateAnswerRelevancy(question, answer) {
    const prompt = `Evaluiraj koliko je odgovor relevantan za pitanje. Ocijeni od 0 do 1 gdje:
0.0 = Potpuno irelevantan
0.25 = Malo relevantan
0.5 = Umjereno relevantan  
0.75 = Vrlo relevantan
1.0 = Savršeno relevantan

Pitanje: ${question}
Odgovor: ${answer}

Odgovori u JSON formatu:
{
  "score": <broj 0-1 s dvije decimale>,
  "reasoning": "<objašnjenje na hrvatskom>",
  "relevant_parts": ["<dijelovi odgovora koji su relevantni>"],
  "irrelevant_parts": ["<dijelovi odgovora koji su irelevantni>"]
}`;

    try {
      const response = await this.llm.invoke(prompt);
      const content =
        typeof response === "string" ? response : response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        // Normalize score to 0-1 range if it's in 1-5 range
        if (result.score > 1) {
          result.score = (result.score - 1) / 4; // Convert 1-5 to 0-1
        }
        // Ensure score is between 0 and 1
        result.score = Math.max(0, Math.min(1, result.score));
        return result;
      }
      throw new Error("Invalid JSON response");
    } catch (error) {
      console.error("Error evaluating answer relevancy:", error);
      return {
        score: 0,
        reasoning: "Greška u evaluaciji: " + error.message,
        relevant_parts: [],
        irrelevant_parts: [],
      };
    }
  }

  /**
   * Context Precision: Mjeri koliko je retrieval kontekst precizan za pitanje
   */
  async evaluateContextPrecision(question, retrievedDocs) {
    const context = retrievedDocs.join("\n---\n");

    const prompt = `Evaluiraj koliko je dohvaćeni kontekst precizan za odgovaranje na pitanje. Ocijeni od 0 do 1 gdje:
0.0 = Nema relevantnih informacija
0.25 = Malo relevantnih informacija
0.5 = Neke relevantne informacije
0.75 = Uglavnom relevantne informacije  
1.0 = Visoko relevantne i precizne informacije

Pitanje: ${question}
Dohvaćeni kontekst: ${context}

Odgovori u JSON formatu:
{
  "score": <broj 0-1 s dvije decimale>,
  "reasoning": "<objašnjenje na hrvatskom>",
  "relevant_docs": [<indeksi relevantnih dokumenata>],
  "irrelevant_docs": [<indeksi irelevantnih dokumenata>],
  "missing_info": "<koje informacije nedostaju za potpun odgovor>"
}`;

    try {
      const response = await this.llm.invoke(prompt);
      const content =
        typeof response === "string" ? response : response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        // Normalize score to 0-1 range if it's in 1-5 range
        if (result.score > 1) {
          result.score = (result.score - 1) / 4; // Convert 1-5 to 0-1
        }
        // Ensure score is between 0 and 1
        result.score = Math.max(0, Math.min(1, result.score));
        return result;
      }
      throw new Error("Invalid JSON response");
    } catch (error) {
      console.error("Error evaluating context precision:", error);
      return {
        score: 0,
        reasoning: "Greška u evaluaciji: " + error.message,
        relevant_docs: [],
        irrelevant_docs: [],
        missing_info: "",
      };
    }
  }

  /**
   * Context Recall: Mjeri koliko kontekst pokriva potrebne informacije
   */
  async evaluateContextRecall(question, groundTruthAnswer, retrievedDocs) {
    const context = retrievedDocs.join("\n---\n");

    const prompt = `Evaluiraj sadrži li dohvaćeni kontekst dovoljno informacija za generiranje ispravnog odgovora. Ocijeni od 0 do 1 gdje:
0.0 = Nema informacija potrebnih za ispravni odgovor
0.25 = Malo informacija potrebnih za ispravni odgovor
0.5 = Neke informacije potrebne za ispravni odgovor
0.75 = Većina informacija potrebnih za ispravni odgovor
1.0 = Sve informacije potrebne za ispravni odgovor

Pitanje: ${question}
Ispravni odgovor: ${groundTruthAnswer}
Dohvaćeni kontekst: ${context}

Odgovori u JSON formatu:
{
  "score": <broj 0-1 s dvije decimale>,
  "reasoning": "<objašnjenje na hrvatskom>",
  "covered_facts": ["<činjenice iz ispravnog odgovora pokrivene kontekstom>"],
  "missing_facts": ["<činjenice iz ispravnog odgovora koje nedostaju u kontekstu>"]
}`;

    try {
      const response = await this.llm.invoke(prompt);
      const content =
        typeof response === "string" ? response : response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        // Normalize score to 0-1 range if it's in 1-5 range
        if (result.score > 1) {
          result.score = (result.score - 1) / 4; // Convert 1-5 to 0-1
        }
        // Ensure score is between 0 and 1
        result.score = Math.max(0, Math.min(1, result.score));
        return result;
      }
      throw new Error("Invalid JSON response");
    } catch (error) {
      console.error("Error evaluating context recall:", error);
      return {
        score: 0,
        reasoning: "Greška u evaluaciji: " + error.message,
        covered_facts: [],
        missing_facts: [],
      };
    }
  }

  /**
   * Overall RAG Evaluation - kombinira sve metrike
   */
  async evaluateRAGPipeline({
    question,
    answer,
    context,
    retrievedDocs,
    groundTruthAnswer = null,
  }) {
    const results = {
      timestamp: new Date().toISOString(),
      question,
      answer,
      metrics: {},
    };

    // Faithfulness
    results.metrics.faithfulness = await this.evaluateFaithfulness(
      question,
      answer,
      context,
    );

    // Answer Relevancy
    results.metrics.answerRelevancy = await this.evaluateAnswerRelevancy(
      question,
      answer,
    );

    // Context Precision
    if (retrievedDocs && retrievedDocs.length > 0) {
      results.metrics.contextPrecision = await this.evaluateContextPrecision(
        question,
        retrievedDocs,
      );
    }

    // Context Recall (samo ako imamo ground truth)
    if (groundTruthAnswer && retrievedDocs) {
      results.metrics.contextRecall = await this.evaluateContextRecall(
        question,
        groundTruthAnswer,
        retrievedDocs,
      );
    }

    // Calculate overall score
    const scores = Object.values(results.metrics)
      .map((m) => m.score)
      .filter((s) => s > 0);
    results.overallScore =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    return results;
  }
}

export default RAGEvaluator;
