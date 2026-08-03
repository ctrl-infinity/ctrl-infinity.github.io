---
title: "Semantics-Driven Information Retrieval System"
description: "Built a semantics-driven information retrieval system in Python that preprocesses search queries and document corpora, ranking relevance based on GloVe semantic embeddings rather than keyword matching."
role: "ML Engineer"
category: "open-source"
tags: ["Python", "NLP", "GloVe Embeddings", "Vector Similarity"]
client: "Open Source Research"
duration: "2022"
order: 7
metrics:
  - label: "Vector Space"
    value: "GloVe Embeddings"
  - label: "Domain"
    value: "Information Retrieval"
---

## Technical Concept

Traditional keyword search fails when queries use synonyms or alternative phrasing. This project implements a semantic vector space model for document retrieval:

1. **Preprocessing Pipeline:** Tokenization, stop-word filtering, and lemmatization of incoming queries and document text.
2. **Dense Vector Mapping:** Embedded tokens into continuous vector space using pre-trained GloVe embeddings.
3. **Similarity Scoring:** Calculated cosine similarity and semantic overlap scores to retrieve and rank relevant documents.
