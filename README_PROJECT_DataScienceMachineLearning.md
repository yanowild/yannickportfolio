# DSML Group Project — Library Recommendation System (UNIL / University of Bern)

## Context
This project was completed as part of a **Data Science and Machine Learning (DSML)** course during my Master’s in **Information Systems and Digital Innovation** (UNIL / University of Bern).

The project is a **fictional but realistic case study** simulating the design of a recommendation system for a **university library platform**. The goal was to apply machine learning techniques to improve **personalization and user engagement** by recommending relevant books to users based on interaction data and item metadata.

---

## Project Objective
Design, implement, and evaluate a **book recommendation system** capable of predicting relevant items for users, with a focus on **top-K recommendation quality**.

Primary objectives:
- Apply data science and machine learning concepts in a realistic end-to-end scenario
- Build and compare **collaborative filtering** and **content-based** approaches
- Integrate **metadata embeddings** to improve recommendation quality
- Optimize model performance using **Precision@10** as the main evaluation metric

---

## My Role
**Data Scientist / Machine Learning Engineer (Group Project)**

Responsibilities included:
- Data analysis, cleaning, and augmentation
- Feature engineering and consideration of multiple modeling approaches
- Implementation of collaborative filtering and embedding-based models
- Model evaluation, comparison, and iteration
- Contribution to documentation, results analysis, and final presentation

---

## Data & Methodology

### 1. Data Analysis & Preparation

#### Datasets
- `interactions_train.csv`: user–book interaction data
- `items.csv`: book metadata (title, author, publisher, subjects, ISBN)

Key statistics:
- **Users:** 7,838
- **Items (books):** 15,291
- **Time range:** Jan 2023 – Oct 2024

#### Data Cleaning
- Removed duplicate interactions
- Checked and handled missing values
- Sorted interactions chronologically
- Analyzed interaction distributions (highly skewed users and items)

Exploratory analysis included:
- Histogram of interactions per user (log scale)
- Histogram of rentals per book (log scale)

These analyses revealed strong sparsity and popularity bias, typical of real-world recommendation datasets.

---

### 2. Data Augmentation & Feature Engineering

#### Metadata Completion
- Identified missing metadata fields (Author, ISBN, Publisher, Subjects)
- Filled missing values using the **Google Books API**
- Implemented batch processing to optimize API usage

#### Feature Engineering
- Converted `Subjects` into a comma-separated text field
- Created a `summary` field combining:
  - Title
  - Author
  - Subjects
- Applied **TF-IDF vectorization** (top 100 features) for text-based representations

#### Data Merging
- Merged interaction data and item metadata on item ID
- Exported cleaned datasets for downstream modeling:
  - `cleaned_merged_data.csv`
  - `cleaned_items.csv`

---

## Modeling Approach

### Base Models — Collaborative Filtering (Model_1)

#### Item-to-Item Collaborative Filtering
- Computed cosine similarity between items based on user interactions
- Predicted user–item scores using weighted similarities

#### User-to-User Collaborative Filtering
- Computed cosine similarity between users based on interaction patterns
- Predicted preferences from similar users

#### Model Combination
- Combined item-based and user-based predictions
- Equal weighting (0.5 / 0.5)

**Result:**
- Precision@10 = **0.1637**

---

### Metadata-Augmented Model — Word2Vec (Model_3)

To improve performance, metadata embeddings were introduced.

#### Word2Vec Embeddings
- Trained Word2Vec on book metadata:
  - Title
  - Subjects
  - Summary
- Embedding size: 100
- Minimum word frequency: 2

Each book was represented by an averaged embedding vector derived from its metadata.

#### Hybrid Similarity
- Combined:
  - Item–item similarity based on metadata embeddings
  - Item–item similarity based on interaction data
- Equal weighting (0.5 / 0.5)

**Result:**
- Precision@10 = **0.1644**

---

## Best Model — Hybrid Word2Vec + Collaborative Filtering (Model_2)

### How the Model Works

#### 1. Metadata-Based Embeddings
- Generated Word2Vec embeddings using **Subjects** and **Title**
- Averaged word vectors to create one vector per book
- Simpler metadata performed better than longer summaries

#### 2. Item-to-Item Collaborative Filtering
Two similarity matrices were computed:
- **Metadata similarity** (cosine similarity of Word2Vec embeddings)
- **Interaction similarity** (cosine similarity of user interaction vectors)

These were combined using tuned weights:
- **81% interaction-based similarity**
- **19% metadata-based similarity**

This produced an item–item prediction matrix.

#### 3. User-to-User Collaborative Filtering
- Computed user similarity based on interaction overlap
- Predicted preferences using nearest users

#### 4. Final Prediction
- Combined item-based and user-based predictions
- Generated top-10 recommendations per user

---

## Results & Performance

- **Baseline Precision@10:** 0.1452
- **Best Model Precision@10:** **0.1647**
- **Relative improvement:** +13% over baseline
- Evaluated via **Kaggle leaderboard**

---

## What Worked Well

- **Hybrid approach:** Combining interaction data with metadata embeddings significantly improved results
- **Metadata usefulness:** Word2Vec embeddings helped mitigate sparse interaction data
- **Flexibility:** Weight tuning allowed adaptation to different data sparsity conditions
- **Simplicity:** Using Subjects and Title outperformed more complex metadata

---

## Limitations & Challenges

- **Cold start problem:** New users and new items remained difficult to recommend accurately
- **Sparse user behavior:** Limited overlap between users reduced user-based model effectiveness
- **Semantic limits of Word2Vec:** More complex text (summaries) introduced noise rather than signal
- **Mismatch between similarity and prediction:** High metadata similarity did not always translate into strong user-item predictions

---

## Key Learnings

- Hybrid recommender systems outperform single-method approaches
- Simple, well-chosen features often outperform complex ones
- Metadata is crucial when interaction data is sparse
- User behavior is noisy and does not always align with semantic similarity
- Recommendation systems require careful balance between personalization and generalization

---

## Deliverables
- End-to-end recommendation system pipeline
- Kaggle-evaluated model with measurable improvement
- GitHub repository with code and experiments
- Streamlit demo app showcasing recommendations
- YouTube video explaining the methodology and results

---

## Team
- **Yannick Wild**
- Oscar Paravicini
- Ben Donakpe Soro

Master’s students in **Information Systems and Digital Innovation**

